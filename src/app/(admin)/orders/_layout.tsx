import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      {/* <Stack.Screen
        // name = exact the same as file name
        name="index"
        options={{ title: "Orders Admin", headerTitleAlign: "center" }} */}
      {/* /> */}
      <Stack.Screen name="list" options={{ headerShown: false }} />
    </Stack>
  );
}
