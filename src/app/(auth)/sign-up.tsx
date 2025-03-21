import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/src/constants/Colors";
import Feather from "@expo/vector-icons/Feather";
import Button from "@/src/components/Button";
import { Link, Stack } from "expo-router";
import { supabase } from "@/src/lib/supabase";

function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = () => {
    setError("");
    if (checkFields()) {
      console.warn("Creating account");
      setEmail("");
      setPassword("");
    }
  };

  const checkFields = () => {
    if (!email) {
      setError("Please enter your email");
      return false;
    }
    if (!password) {
      setError("Please enter your password");
      return false;
    }
    if (password.length < 4) {
      setError("Password must be at least 5 characters in length");
      return false;
    }
    return true;
  };

  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) Alert.alert(error.message);
    setLoading(false);
    setEmail("");
    setPassword("");
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: "Create an account", headerTitleAlign: "center" }}
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="john@gmail.com"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor={"rgba(191, 191, 191, 0.8)"}
      ></TextInput>

      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, styles.passwordInput]}
          textContentType="password" // Set secureTextEntry prop to hide
          //password when showPassword is false
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        ></TextInput>
        <Feather
          name={showPassword ? "eye-off" : "eye"}
          size={24}
          color="black"
          onPress={toggleShowPassword}
          style={styles.icon}
        />
      </View>
      <Text style={{ color: "red" }}>{error}</Text>
      <Button
        onPress={signUpWithEmail}
        text={loading ? "Creating account..." : "Create account"}
        disabled={loading}
      />
      <Link href={"/(auth)/sign-in"} asChild>
        <Text style={styles.textButton}>Sign in</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 7,
    marginBottom: 20,
  },
  label: {
    color: "grey",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  icon: {
    marginLeft: 10,
    paddingBottom: 7,
  },
  passwordInput: {
    flex: 1,
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "600",
    color: Colors.light.tint,
    marginVertical: 10,
  },
});

export default SignUpScreen;
