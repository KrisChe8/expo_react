import { View, Text, FlatList, Pressable } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import orders from "@/assets/data/orders";
import OrderItemListItem from "@/src/components/OrderItemListItem";
import OrderListItem from "@/src/components/OrderListItem";
import Colors from "@/src/constants/Colors";
import { OrderStatusList } from "@/src/types";

const orderDetailScreen = () => {
  // to get dynamic id we use:
  const { id } = useLocalSearchParams();
  // to get order by id of order:
  const order = orders.find((o) => o.id === Number(id));

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
                  onPress={() => console.warn("Update status")}
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
