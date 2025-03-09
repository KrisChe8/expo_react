import Colors from "@/src/constants/Colors";
import { StyleSheet, Text, View, Image } from "react-native";
import { defaultPizzaImage } from "./ProductListItem";
// import products from "@/assets/data/products";
import { Tables } from "../database.types";
import RemoteImage from "./RemoteImage";

// as we receiving an array of OrderItem
// type OrderItemListItemProps = {
//     orderItems: OrderItem[]; // Expecting an array of OrderItem objects
//   };

type OrderItemListItemProps = {
  orderItems: { products: Tables<"products"> } & Tables<"order_items">;
};

const OrderItemListItem = ({ orderItems }: OrderItemListItemProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftsideWrapper}>
        {/* in types.ts Product image: string | null; so we need to put default img */}
        <RemoteImage
          path={orderItems.products.image}
          fallback={defaultPizzaImage}
          style={styles.img}
          resizeMode="contain"
        />

        <View style={styles.details}>
          <Text style={styles.pizzaTitle}>{orderItems.products.name}</Text>
          <View style={styles.pizzaDetails}>
            <Text style={styles.price}>${orderItems.products.price}</Text>
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
