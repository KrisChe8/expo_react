import Button from "@/src/components/Button";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import Colors from "@/src/constants/Colors";
import { useEffect, useState } from "react";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, StyleSheet, TextInput, Image, Alert } from "react-native";

import * as ImagePicker from "expo-image-picker";
import {
  useDeleteProduct,
  useInsertProduct,
  useProduct,
  useUpdateProduct,
} from "@/src/api/products";

const CreateProductScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const [errors, setErrors] = useState("");

  const { id: idString } = useLocalSearchParams();

  const idNum = parseFloat(
    typeof idString === "string" ? idString : idString?.[0]
  );
  const isUpdating = !!idNum;

  const { mutate: insertProduct } = useInsertProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { mutate: deleteProduct } = useDeleteProduct();

  const { data: beingpdatedProduct } = useProduct(idNum);

  const router = useRouter();

  // controling updating product
  useEffect(() => {
    if (beingpdatedProduct) {
      setName(beingpdatedProduct.name);
      setPrice(beingpdatedProduct.price.toString());
      setImage(beingpdatedProduct.image);
    }
  }, [beingpdatedProduct]);

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

  // onSubmit func check what we are doing - updating(editing) product or creating new
  const onSubmit = () => {
    if (isUpdating) {
      // update
      onUpdate();
    } else {
      // create
      onCreate();
    }
  };

  // CREATING
  const onCreate = () => {
    if (!validateInput()) {
      return;
    }

    insertProduct(
      { name, price: parseFloat(price), image },
      {
        onSuccess: () => {
          resetFields();
          router.back();
        },
      }
    );
  };

  // UPDATING

  const onUpdate = () => {
    if (!validateInput()) {
      return;
    }
    updateProduct(
      { idNum, name, price: parseFloat(price), image },
      {
        onSuccess: () => {
          router.back();
        },
      }
    );
  };

  // DELETING
  const onDelete = () => {
    deleteProduct(idNum, {
      onSuccess: () => {
        resetFields();
        router.replace("/(admin)");
      },
    });
  };

  const confirmDelete = () => {
    Alert.alert("Confirm", "Are you sure you want to delete this product?", [
      {
        text: "Cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: onDelete,
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: isUpdating ? "Update Product" : "Create Product" }}
      />
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
      <Button onPress={onSubmit} text={isUpdating ? "Update" : "Create"} />
      {isUpdating && (
        <Text onPress={confirmDelete} style={styles.textButton}>
          Delete
        </Text>
      )}
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
