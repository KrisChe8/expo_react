import Button from "@/src/components/Button";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import Colors from "@/src/constants/Colors";
import { useState } from "react";
import { Link, Stack } from "expo-router";
import { View, Text, StyleSheet, TextInput, Image } from "react-native";

import * as ImagePicker from "expo-image-picker";

const CreateProductScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const [errors, setErrors] = useState("");

  // for images:
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // funct to reset fields:
  const resetFields = () => {
    setName("");
    setPrice("");
    setImage(null);
  };

  //   validtion of inputs:
  const validateInput = () => {
    setErrors("");
    if (!name) {
      setErrors("Name is required");
      return false;
    }
    if (!price) {
      setErrors("Price is required");
      return false;
    }
    if (isNaN(parseFloat(price))) {
      setErrors("Price must be numeric");
      return false;
    }
    return true;
  };

  const onCreate = () => {
    if (!validateInput()) {
      return;
    }
    console.warn("Creating a product", name, price);

    resetFields();
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Create Product" }} />
      <Image
        source={{ uri: image || defaultPizzaImage }}
        style={styles.image}
      />
      <Text onPress={pickImage} style={styles.textButton}>
        Select image
      </Text>
      <Text style={styles.label}>Name</Text>
      <TextInput
        placeholder="Name"
        style={styles.input}
        placeholderTextColor={"rgba(191, 191, 191, 0.8)"}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Price ($):</Text>
      <TextInput
        placeholder="9.99"
        placeholderTextColor={"rgba(191, 191, 191, 0.8)"}
        style={styles.input}
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      <Text style={{ color: "red" }}>{errors}</Text>
      <Button onPress={onCreate} text="Create" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  label: {
    color: "gray",
    fontSize: 16,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "600",
    color: Colors.light.tint,
    marginVertical: 10,
  },
});

export default CreateProductScreen;
