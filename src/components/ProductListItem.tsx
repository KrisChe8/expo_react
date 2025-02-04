import Colors from "@/src/constants/Colors";
import { StyleSheet, Text, View, Image } from "react-native";

const ProductListItem = ({ product }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.img} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
};

export default ProductListItem;

// styling here and using above like obj: styles.container etc
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 20,
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
