import { StyleSheet, Text, Image, TouchableOpacity, View } from "react-native";
import React, { useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { icons } from "@/constants";
import Map from "./Map";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
const RideLayout = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  return (
    <GestureHandlerRootView>
      <View className="border flex-1 bg-white">
        <View className="border border-white flex flex-col bg-blue-500 h-screen">
          <View className="border border-red-400 flex flex-row absolute z-10 top-16 items-center justify-start px-5">
            <TouchableOpacity onPress={router.back}>
              <View className="w-10 h-10 bg-white rounded-full items-center justify-center border">
                <Image
                  source={icons.backArrow}
                  resizeMode="contain"
                  className="w-6 h-6"
                />
              </View>
            </TouchableOpacity>
            <Text className="text-xl font-JakartaSemiBold ml-5">{title}</Text>
          </View>

          <Map />
        </View>

        <BottomSheet ref={bottomSheetRef} snapPoints={["40%", "85%"]} index={0}>
          <BottomSheetView style={{ flex: 1, padding: 20 }}>
            {children}
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default RideLayout;
