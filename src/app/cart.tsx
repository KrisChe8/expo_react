import { StatusBar } from "expo-status-bar";
import { View, Text, Platform, FlatList } from "react-native";

import { useCart } from "../providers/CartProvider";

import CartListItem from "../components/CartListItem";
import Button from "../components/Button";
import { Stack } from "expo-router";

const CartScreen = () => {
  const { items, total, checkout } = useCart();
  return (
    <View style={{ padding: 10 }}>
      <Stack.Screen options={{ title: "Cart", headerTitleAlign: "center" }} />
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ gap: 10 }}
      />
      <Text style={{ marginTop: 20, fontSize: 20, fontWeight: 600 }}>
        Total: ${total}
      </Text>
      <Button onPress={checkout} text="Checkout" />
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};
export default CartScreen;
