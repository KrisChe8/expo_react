import { Stack } from "expo-router";

export default function MenuStack() {
  return (
    <Stack>
      <Stack.Screen
        // name = exact the same as file name
        name="index"
        options={{ title: "Menu", headerTitleAlign: "center" }}
      />
    </Stack>
  );
}
