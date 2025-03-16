import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import OrderItemListItem from "@/src/components/OrderItemListItem";
import OrderListItem from "@/src/components/OrderListItem";
import Colors from "@/src/constants/Colors";
import { OrderStatusList } from "@/src/types";
import { useOrderDetails, useUpdateOrder } from "@/src/api/orders";
import { notifyUserAboutOrderUpdate } from "@/src/lib/notifications";

const orderDetailScreen = () => {
  // to get dynamic id we use:
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);

  const { mutate: updateOrder } = useUpdateOrder();

  const { data: order, isLoading, error } = useOrderDetails(id);
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to load data</Text>;
  }

  // to get order by id of order:
  // const order = orders.find((o) => o.id === Number(id));

  const updateStatus = async (status: string) => {
    await updateOrder({ id: id, updatedField: { status } });
    if (order) {
      await notifyUserAboutOrderUpdate({ ...order, status });
    }
  };

  return (
    <View>
      <Stack.Screen
        options={{ title: `Order #${order?.id}`, headerTitleAlign: "center" }}
      />
      {/* If no matching order is found, order will be undefined. But your OrderListItem component expects a valid Order object, not undefined. */}
      {order && (
        <View style={{ padding: 10 }}>
          <OrderListItem order={order} />
        </View>
      )}
      <FlatList
        data={order?.order_items}
        renderItem={({ item }) => <OrderItemListItem orderItems={item} />}
        numColumns={1}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        ListFooterComponent={() => (
          <>
            <Text style={{ fontWeight: "bold" }}>Status</Text>
            <View style={{ flexDirection: "row", gap: 5 }}>
              {OrderStatusList.map((status) => (
                <Pressable
                  key={status}
                  onPress={() => updateStatus(status)}
                  style={{
                    borderColor: Colors.light.tint,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5,
                    marginVertical: 10,
                    backgroundColor:
                      order?.status === status
                        ? Colors.light.tint
                        : "transparent",
                  }}
                >
                  <Text
                    style={{
                      color:
                        order?.status === status ? "white" : Colors.light.tint,
                    }}
                  >
                    {status}
                  </Text>
                </Pressable>
              ))}
            </View>
          </>
        )}
      />
    </View>
  );
};

export default orderDetailScreen;
