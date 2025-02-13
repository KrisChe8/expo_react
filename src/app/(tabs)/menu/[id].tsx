import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Stack } from "expo-router";
import products from "@/assets/data/products";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import Button from "@/src/components/Button";

import { useState } from "react";

const ProductDetailsScreen = () => {
  // to get dynamic id we use:
  const { id } = useLocalSearchParams();

  const sizes = ["S", "M", "L", "XL"];
  const [selectedSize, setSelectedSize] = useState("M");

  const product = products.find((p) => p.id === Number(id));

  const addtoCart = () => {
    console.warn("Adding to cart");
  };

  if (!product) {
    return <Text> Product not found</Text>;
  }

  return (
    <View style={styles.container}>
      {/* also we can add/change the displayed name of the screen directly from here */}
      {/* + of using Stack.Screen inside the file -> using variables like: */}
      {/* options={{ title: "Details" + id }} */}
      <Stack.Screen
        options={{ title: product?.name, headerTitleAlign: "center" }}
      />
      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        style={styles.image}
      />
      <Text>Select Size:</Text>
      <View style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable
            onPress={() => {
              setSelectedSize(size);
            }}
            style={[
              styles.size,
              {
                backgroundColor: selectedSize === size ? "gainsboro" : "white",
              },
            ]}
            key={size}
          >
            <Text
              style={[
                styles.sizeText,
                { color: selectedSize === size ? "black" : "grey" },
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.price}>Price: ${product.price}</Text>
      <Button onPress={addtoCart} text="Add to cart" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
    // justifyContent: "center",
    // alignItems: "center",
  },
  image: {
    width: "96%",
    aspectRatio: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    // to move price to the bottom:
    marginTop: "auto",
  },
  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  size: {
    backgroundColor: "gainsboro",
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  sizeText: {
    fontSize: 20,
    fontWeight: "500",
    color: "grey",
  },
});

export default ProductDetailsScreen;
