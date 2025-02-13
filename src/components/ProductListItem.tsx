import Colors from "@/src/constants/Colors";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { Product } from "../types";
import { Link } from "expo-router";

export const defaultPizzaImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

type ProductListItemProps = {
  product: Product;
};

// typescript specification of props: example {props}: string
const ProductListItem = ({ product }: ProductListItemProps) => {
  return (
    <Link href={`/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        {/* in types.ts Product image: string | null; so we need to put default img */}
        <Image
          source={{ uri: product.image || defaultPizzaImage }}
          style={styles.img}
          resizeMode="contain"
        />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </Pressable>
    </Link>
  );
};

export default ProductListItem;

// styling here and using above like obj: styles.container etc
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 20,
    flex: 1,
    maxWidth: "50%",
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
    marginVertical: 10,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: 600,
  },
  img: {
    width: "100%",
    aspectRatio: 1,
  },
});
