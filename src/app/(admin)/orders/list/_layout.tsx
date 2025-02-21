import { Tabs, withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

// to fix bug, when headerShown: false - disappered our TopTabs
import { SafeAreaView } from "react-native-safe-area-context";

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);

export default function OrderListNavigator() {
  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: "white" }}>
      <TopTabs>
        <TopTabs.Screen name="index" options={{ title: "ACTIVE" }} />
        <TopTabs.Screen name="archived" options={{ title: "ARCHIVED" }} />
      </TopTabs>
    </SafeAreaView>
  );
}
