import { View, Text, FlatList } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import orders from "@/assets/data/orders";
import OrderItemListItem from "@/src/components/OrderItemListItem";
import OrderListItem from "@/src/components/OrderListItem";

const orderDetailScreen = () => {
  // to get dynamic id we use:
  const { id } = useLocalSearchParams();
  // to get order by id of order:
  const order = orders.find((o) => o.id === Number(id));

  if (!order) {
    return <Text>Order not found!</Text>;
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
