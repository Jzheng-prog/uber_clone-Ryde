import GoogleTextInput from "@/components/GoogleTextInput";
import Map from "@/components/Map";
import RideCard from "@/components/RideCard";
import { icons, images } from "@/constants";
import { useLocationStore } from "@/store";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFetch } from "@/lib/fetch";
import { Ride } from "@/types/type";
export default function TabHome() {
  const { user } = useUser();
  const { data: recentRides, loading } = useFetch<Ride[]>(
    `/(api)/ride/${user?.id}`
  );
  const { setUserLocation, setDestinationLocation } = useLocationStore();
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const { signOut } = useAuth();

  // const [loading, setLoading] = useState<boolean>(true);

  const handleDestinationPress = (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    setDestinationLocation(location);

    router.push("/(root)/find-ride");
  };
  const handleSignOut = () => {
    signOut();
    router.replace("/(auth)/sign-in");
  };

  useEffect(() => {
    const requestLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setHasPermission(false);
        return;
      }
      setHasPermission(true);

      let location = await Location.getCurrentPositionAsync();

      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords?.latitude!,
        longitude: location.coords?.longitude!,
      });

      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        address: `${address[0].name}, ${address[0].region}`,
      });
    };
    requestLocation();
    console.log({ hasPermission });
  }, []);

  return (
    <SafeAreaView className="h-full w-full flex items-center justify-center z-0">
      <FlatList
        data={recentRides}
        // data={[]}
        renderItem={({ item }) => <RideCard item={item} />}
        className="px-5"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListEmptyComponent={() => (
          <View className="flex flex-col items-center justify-center">
            {!loading ? (
              <>
                <Image
                  source={images.noResult}
                  resizeMode="contain"
                  className="w-40 h-40"
                />
                <Text className="text-sm">No rides founded</Text>
              </>
            ) : (
              <ActivityIndicator size="small" color="#000" />
            )}
          </View>
        )}
        ListHeaderComponent={() => (
          <>
            <View className="flex flex-row items-center justify-between">
              <Text className="text-xl font-JakartaExtraBold">
                Welcome{" "}
                {user?.firstName || user?.emailAddresses[0].emailAddress}
              </Text>
              <TouchableOpacity
                className="justify-center items-center w-10 h-10 border border-gray-400 rounded-full p-3"
                onPress={handleSignOut}
              >
                <Image source={icons.out} className="w-4 h-4" />
              </TouchableOpacity>
            </View>
            <GoogleTextInput
              icon={icons.search}
              handlePress={handleDestinationPress}
              containerStyle="bg-white shadow-md shadow-neutral-300 mt-3"
            />
            <>
              <Text className="text-xl font-JakartaBold mt-5 mb-3">
                Your current Location
              </Text>
              <View className="border border-gray-400 flex flex-row items-center bg-transparent h-[300px]">
                <Map />
              </View>
            </>
            <Text className="text-xl font-JakartaBold mt-5 mb-3">
              Recent Rides
            </Text>
          </>
        )}
      />
    </SafeAreaView>
  );
}
