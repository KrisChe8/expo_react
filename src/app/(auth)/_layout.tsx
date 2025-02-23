import { useAuth } from "@/src/providers/AuthProvider";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const { session } = useAuth();
  // not to allow signed in user to get to the sign in page from url(if web app):
  if (session) {
    return <Redirect href={"/"} />;
  }

  return <Stack />;
}
