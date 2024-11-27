import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GoogleInputProps } from "@/types/type";

const GoogleTextInput = ({
  icon,
  handlePress,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
}: GoogleInputProps) => {
  return (
    <View className="border flex flex-row items-center relative z-50 rounded-xl">
      <Text className="rounded-xl p-3 bg-white w-full">search</Text>
    </View>
  );
};

export default GoogleTextInput;

const styles = StyleSheet.create({});
