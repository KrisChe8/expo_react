import { View, FlatList, ActivityIndicator, Text } from "react-native";
// import orders from "@/assets/data/orders";
import OrderListItem from "@/src/components/OrderListItem";
import { useAdminOrderList } from "@/src/api/orders";
import { useEffect } from "react";
import { supabase } from "@/src/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { useInsertOrderSubscription } from "@/src/api/orders/subscriptions";

export default function OrderListScreen() {
  const { data: orders, isLoading, error } = useAdminOrderList({
    archived: false,
  });

  useInsertOrderSubscription();

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch data</Text>;
  }
  return (
    <View>
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderListItem order={item} />}
        numColumns={1}
        contentContainerStyle={{ gap: 10, padding: 10 }}
      />
    </View>
  );
}
