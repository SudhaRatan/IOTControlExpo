import { Stack } from "expo-router";
import { Platform } from "react-native";
import { useTheme } from "react-native-paper";

export default function Layout() {
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "simple_push",
        presentation:
          Platform.OS === "ios" ? "modal" : "containedTransparentModal",
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="addDevice" />
      <Stack.Screen name="switches/[deviceId]" options={{
        presentation: Platform.OS === "ios" ? "card" : "containedTransparentModal"
      }} />
    </Stack>
  );
}
