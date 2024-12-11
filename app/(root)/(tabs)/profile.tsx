import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";

const profile = () => {
  const { user } = useUser();
  const { signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    router.replace("/(auth)/sign-in");
  };
  return (
    <SafeAreaView>
      <Text className="text-2xl font-JakartaExtraBold text-center">
        Profile
      </Text>
      {/* Profile Header */}
      <View className="items-center">
        <Text className="text-xl font-semibold mt-4">
          Name: {user?.fullName}
        </Text>
        <Text className="text-xl font-semibold mt-4">
          Email: {user?.primaryEmailAddress?.emailAddress}
        </Text>
      </View>
      <View className="flex-row justify-evenly mt-6">
        <TouchableOpacity
          onPress={handleSignOut}
          className="bg-red-500 py-2 px-4 rounded-lg"
        >
          <Text className="text-white">Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default profile;

const styles = StyleSheet.create({});
