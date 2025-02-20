import Colors from "@/src/constants/Colors";
import { Order, OrderItem } from "@/src/types";

import { StyleSheet, Text, View, Image } from "react-native";
import { Link, useSegments } from "expo-router";
import { defaultPizzaImage } from "./ProductListItem";
import products from "@/assets/data/products";

// as we receiving an array of OrderItem
// type OrderItemListItemProps = {
//     orderItems: OrderItem[]; // Expecting an array of OrderItem objects
//   };

type OrderItemListItemProps = {
  orderItems: OrderItem;
};

const OrderItemListItem = ({ orderItems }: OrderItemListItemProps) => {
  const pizza = products.find((p) => p.id === Number(orderItems.product_id));
  const pizzaImg = pizza?.image;
  const pizzaName = pizza?.name;
  const pizzaPrice = pizza?.price;
  return (
    <View style={styles.container}>
      <View style={styles.leftsideWrapper}>
        {/* in types.ts Product image: string | null; so we need to put default img */}
        <Image
          source={{ uri: pizzaImg || defaultPizzaImage }}
          style={styles.img}
          resizeMode="contain"
        />
        <View style={styles.details}>
          <Text style={styles.pizzaTitle}>{pizzaName}</Text>
          <View style={styles.pizzaDetails}>
            <Text style={styles.price}>${pizzaPrice}</Text>
            <Text>Size: {orderItems.size}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.quantity}>{orderItems.quantity}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    // width: "100%",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    paddingBlock: 15,
    borderRadius: 6,
  },
  leftsideWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  img: {
    width: 60,
    aspectRatio: 1,
    marginRight: 10,
  },
  details: {
    flexDirection: "column",
  },
  price: {
    color: Colors.light.tint,
    fontWeight: "600",
  },
  pizzaTitle: {
    fontWeight: "600",
    fontSize: 20,
  },
  pizzaDetails: {
    flexDirection: "row",
    gap: "10",
    marginTop: 5,
  },
  quantity: {
    fontWeight: "600",
    fontSize: 18,
  },
});

export default OrderItemListItem;
