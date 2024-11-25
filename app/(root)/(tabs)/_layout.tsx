import { Stack, Tabs } from "expo-router";
import { View, Text } from "react-native";

import "react-native-reanimated";

const TabIcon = () => (
  <View>
    <Text>Icon</Text>
  </View>
);
export default function TabLayout() {
  <Tabs
    initialRouteName="index"
    screenOptions={{
      tabBarActiveTintColor: "white",
    }}
  >
    <Tabs.Screen
      name="home"
      options={{
        title: "Home",
        tabBarIcon: () => <TabIcon />,
      }}
    />
  </Tabs>;
}
