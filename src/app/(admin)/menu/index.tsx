import { View, FlatList } from "react-native";
import products from "@/assets/data/products";
import ProductListItem from "@/src/components/ProductListItem";

export default function MenuScreen() {
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
