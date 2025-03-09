import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
// import orders from "@/assets/data/orders";
import OrderItemListItem from "@/src/components/OrderItemListItem";
import OrderListItem from "@/src/components/OrderListItem";
import { useOrderDetails } from "@/src/api/orders";
import { useUpdateOrderSubscription } from "@/src/api/orders/subscriptions";

const orderDetailScreen = () => {
  // to get dynamic id we use:
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);

  const { data: order, isLoading, error } = useOrderDetails(id);

  useUpdateOrderSubscription(id);

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to load data</Text>;
  }

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
      />
    </View>
  );
};

export default orderDetailScreen;
