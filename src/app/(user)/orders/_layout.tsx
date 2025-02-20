import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        // name = exact the same as file name
        name="index"
        options={{ title: "Orders", headerTitleAlign: "center" }}
      />
    </Stack>
  );
}
