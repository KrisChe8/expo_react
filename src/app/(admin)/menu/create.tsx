import Button from "@/src/components/Button";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import Colors from "@/src/constants/Colors";
import { useEffect, useState } from "react";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, StyleSheet, TextInput, Image, Alert } from "react-native";

import * as FileSystem from "expo-file-system";

import * as ImagePicker from "expo-image-picker";
import {
  useDeleteProduct,
  useInsertProduct,
  useProduct,
  useUpdateProduct,
} from "@/src/api/products";
import { randomUUID } from "expo-crypto";
import { supabase } from "@/src/lib/supabase";
import { decode } from "base64-arraybuffer";

const CreateProductScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);

  const { id: idString = "0" } = useLocalSearchParams();

  const idNum = parseFloat(Array.isArray(idString) ? idString[0] : idString);
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
      mediaTypes: "images",
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
  const onSubmit = async () => {
    if (isUpdating) {
      // update
      setLoading(true);
      await onUpdate();
    } else {
      // create
      setLoading(true);
      await onCreate();
    }
  };

  // CREATING
  const onCreate = async () => {
    if (!validateInput()) {
      return;
    }

    const imagePath = await uploadImage();

    insertProduct(
      { name, price: parseFloat(price), image: imagePath },
      {
        onSuccess: () => {
          resetFields();
          setLoading(false);
          router.back();
        },
      }
    );
  };

  // UPDATING

  const onUpdate = async () => {
    if (!validateInput()) {
      return;
    }

    const imagePath = await uploadImage();
    updateProduct(
      { idNum, name, price: parseFloat(price), image: imagePath },
      {
        onSuccess: () => {
          setLoading(false);
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

  // uploads image in bucket in supabase and returns a file name of image
  const uploadImage = async () => {
    if (!image?.startsWith("file://")) {
      return;
    }

    const base64 = await FileSystem.readAsStringAsync(image, {
      encoding: "base64",
    });
    const filePath = `${randomUUID()}.png`;
    const contentType = "image/png";
    const { data, error } = await supabase.storage
      .from("product-images")
      .upload(filePath, decode(base64), { contentType });

    if (data) {
      return data.path;
    }
    if (error) {
      console.log("Upload error", error);
    }
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
      <Button
        disabled={loading}
        onPress={onSubmit}
        text={
          isUpdating
            ? loading
              ? "Updating..."
              : "Update"
            : loading
            ? "Creating..."
            : "Create"
        }
        style={loading ? styles.loadingBtn : null}
      />
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
  loadingBtn: {
    backgroundColor: "#abd4f1",
  },
});

export default CreateProductScreen;
