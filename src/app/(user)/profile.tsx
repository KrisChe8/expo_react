import { supabase } from "@/src/lib/supabase";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const ProfileScreen = () => {
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    if (loading) return; // Prevent multiple sign-out calls
    setLoading(true);

    try {
      await supabase.auth.signOut();
      console.log("User signed out");
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Text> Profile</Text>
      <Button title="Sign out" onPress={handleSignOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  signOutBtn: {
    marginBlock: 10,
  },
});

export default ProfileScreen;
