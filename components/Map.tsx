import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { useLocationStore, useDriverStore } from "@/store";
import {
  calculateRegion,
  generateMarkersFromData,
  calculateDriverTimes,
} from "@/lib/map";
import { Driver, MarkerData } from "@/types/type";
import { icons } from "@/constants";
import { useFetch } from "@/lib/fetch";
import MapViewDirections from "react-native-maps-directions";
const Map = () => {
  const {
    data: driversData,
    loading,
    error,
  } = useFetch<Driver[]>("/(api)/driver");

  // console.log("from map:", { driversData });
  const {
    userLongitude,
    userLatitude,
    destinationLatitude,
    destinationLongitude,
  } = useLocationStore();
  const { selectedDriver, setDrivers } = useDriverStore();

  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const region = calculateRegion({
    userLongitude,
    userLatitude,
    destinationLatitude,
    destinationLongitude,
  });

  useEffect(() => {
    if (driversData) {
      // console.log("there is drivers!!!!!!!!!!!!!!!!!!!");
      if (
        markers.length > 0 &&
        destinationLatitude !== undefined &&
        destinationLongitude !== undefined
      ) {
        calculateDriverTimes({
          markers,
          userLatitude,
          userLongitude,
          destinationLatitude,
          destinationLongitude,
        });
      }
      setDrivers(driversData as MarkerData[]);
    }
  }, [driversData]);

  useEffect(() => {
    if (Array.isArray(driversData)) {
      if (!userLatitude || !userLongitude) return;

      const newMarker = generateMarkersFromData({
        data: driversData,
        userLatitude,
        userLongitude,
      });
      setMarkers(newMarker);
    }
  }, [driversData, userLatitude, userLongitude]);
  // useEffect(() => {
  //   console.log("Updated drivers:", drivers);
  // }, [drivers]);

  useEffect(() => {
    if (
      markers.length > 0 &&
      destinationLatitude !== undefined &&
      destinationLongitude !== undefined
    ) {
      calculateDriverTimes({
        markers,
        userLatitude,
        userLongitude,
        destinationLatitude,
        destinationLongitude,
      }).then((drivers) => {
        setDrivers(drivers as MarkerData[]);
      });
    }
  }, [markers, destinationLatitude, destinationLongitude]);
  if (loading || !userLatitude || !userLongitude) {
    return (
      <View className="flex justify-between items-center w-full">
        <ActivityIndicator size="small" color="#000" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex justify-between items-center w-full">
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      className="w-full h-full rounded-2xl"
      tintColor="black"
      mapType="mutedStandard"
      showsPointsOfInterest={false}
      showsUserLocation={true}
      userInterfaceStyle="light"
      initialRegion={region}
    >
      {/* not sure why the dimensions wont work unless its hard coded */}
      {/* <View className="w-[391px] h-full border border-blue-400"></View> */}
      <View className="w-[391px] h-full">
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            image={
              selectedDriver === marker.id ? icons.selectedMarker : icons.marker
            }
            title={marker.title}
          />
        ))}

        {destinationLatitude && destinationLongitude && (
          <>
            <Marker
              key="destination"
              coordinate={{
                latitude: destinationLatitude,
                longitude: destinationLongitude,
              }}
              title="Destination"
              image={icons.pin}
            />
            <MapViewDirections
              origin={{
                latitude: userLatitude!,
                longitude: userLongitude!,
              }}
              destination={{
                latitude: destinationLatitude,
                longitude: destinationLongitude,
              }}
              apikey={process.env.EXPO_PUBLIC_GOOGLE_API_KEY!}
              strokeColor="#0286FF"
              strokeWidth={2}
            />
          </>
        )}
      </View>
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});
