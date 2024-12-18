import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Ride } from "@/types/type";
import { icons } from "@/constants";
import { formatDate, formatTime } from "@/lib/utils";

const RideCard = ({ item }: { item: Ride }) => {
  return (
    <View className="flex flex-row items-center justify-center bg-white rounded-lg mb-3">
      <View className="flex flex-col items-center justify-center p-3">
        <View className="flex flex-row items-center justify-between">
          <Image
            source={{
              uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${item.destination_longitude}%2C${item.destination_latitude}&zoom=14&marker=lonlat:${item.destination_longitude},${item.destination_latitude}&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_APY_KEY}`,
            }}
            className="w-[80px] h-[90px] rounded-lg border border-gray-300"
          />

          <View className="flex flex-col mx-5 gap-y-5 flex-1">
            <View className="flex flex-row items-center gap-x-2">
              <Image source={icons.to} className="w-5 h-5" />
              <Text className="text-md font-JakartaMedium" numberOfLines={1}>
                {item.origin_address}
              </Text>
            </View>
            <View className="flex flex-row items-center gap-x-2">
              <Image source={icons.point} className="w-5 h-5" />
              <Text className="text-md font-JakartaMedium" numberOfLines={1}>
                {item.destination_address}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex flex-col w-full mt-5 bg-general-500 rounded-lg p-3 items-start justify-center">
          <View className="flex flex-row items-center w-full justify-between mb-5 border-b border-gray-200">
            <Text className="text-md font-JakartaMedium text-gray-500 ">
              Date & Time
            </Text>
            <Text className="text-md font-JakartaMedium text-gray-500">
              {formatDate(item.created_at)},{formatTime(item.ride_time)}
            </Text>
          </View>
          <View className="flex flex-row items-center w-full justify-between mb-5 border-b border-gray-200">
            <Text className="text-md font-JakartaMedium text-gray-500">
              Driver
            </Text>
            <Text className="text-md font-JakartaMedium text-gray-500">
              {item.driver.first_name} {item.driver.last_name}
            </Text>
          </View>
          <View className="flex flex-row items-center w-full justify-between mb-5 border-b border-gray-200">
            <Text className="text-md font-JakartaMedium text-gray-500">
              Car Seats
            </Text>
            <Text className="text-md font-JakartaMedium text-gray-500">
              {item.driver.car_seats}
            </Text>
          </View>
          <View className="flex flex-row items-center w-full justify-between mb-5 border-b border-gray-200">
            <Text className={`text-md font-JakartaMedium  text-gray-500`}>
              Payment Status
            </Text>
            <Text
              className={`text-md font-JakartaMedium capitalize text-gray-500 ${item.payment_status === "paid" ? "text-green-500" : "text-red-500"}`}
            >
              {item.payment_status}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RideCard;

const styles = StyleSheet.create({});
