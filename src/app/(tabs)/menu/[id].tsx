import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Stack } from "expo-router";

const ProductDetailsScreen = () => {
  // to get dynamic id we use:
  const { id } = useLocalSearchParams();

  return (
    <View>
      {/* also we can add/change the displayed name of the screen directly from here */}
      {/* + of using Stack.Screen inside the file -> using variables like: */}
      {/* options={{ title: "Details" + id }} */}
      <Stack.Screen
        options={{ title: "Details", headerTitleAlign: "center" }}
      />
      <Text>You have chosen Pizza: {id}</Text>
    </View>
  );
};

export default ProductDetailsScreen;
