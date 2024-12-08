import { Stack } from "expo-router";
import { useTheme } from "react-native-paper";

export default function Layout() {
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        presentation: "containedTransparentModal",
        animation: "simple_push",
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="addDevice" />
      <Stack.Screen name="switches/[deviceId]" />
    </Stack>
  );
}
