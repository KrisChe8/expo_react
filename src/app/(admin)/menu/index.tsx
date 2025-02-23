import { View, FlatList, ActivityIndicator, Text } from "react-native";
import ProductListItem from "@/src/components/ProductListItem";
import { useProductList } from "@/src/api/products";

export default function MenuScreen() {
  const { data: products, error, isLoading } = useProductList();

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text> Failed to fetch data</Text>;
  }
  return (
    <View>
      {/* FlatList FOR SCROLLABLE LIST has 2 obligatory props: data={an array} renderItem ={func how to render a single item from array} */}
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
      />
    </View>
  );
}
