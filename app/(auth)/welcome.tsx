import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import { router } from "expo-router";
import { onboarding } from "@/constants";
import CustomButton from "@/components/CustomButton";

const welcome = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isLastIndex = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView className="h-full border border-blue-400 flex items-center justify-between">
      <TouchableOpacity
        className="w-full items-end justify-end p-5 border"
        onPress={() => router.replace("/(auth)/sign-up")}
      >
        <Text className="text-black text-md font-JakartaBold">Skip</Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="w-[32px] h-[8px] mx-1 bg-[#E2E8F0] rounded-full border border-black" />
        }
        activeDot={
          <View className="w-[32px] h-[8px] mx-1 bg-[#E2E8F0] rounded-full border border-red-400" />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View
            className="border border-danger-500 flex items-center justify-center p-5"
            key={item.id}
          >
            <Image
              source={item.image}
              resizeMode="contain"
              className="h-[300px] w-full"
            />
            <View className="flex flex-row items-center justify-center border w-full mt-10">
              <Text className="text-black text-3xl font-bold mx-10 text-center">
                {item.title}
              </Text>
            </View>
            <Text className="text-lg font-JakartaSemiBold text-center mx-10 mt-3 text-[#858585]">
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>
      <CustomButton
        className="w-11/12 mt-10"
        title={isLastIndex ? "Get started" : "Next"}
        onPress={() =>
          isLastIndex
            ? router.replace("/(auth)/sign-up")
            : swiperRef.current?.scrollBy(1)
        }
      />
    </SafeAreaView>
  );
};

export default welcome;

const styles = StyleSheet.create({});
