import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import {
  MD3DarkTheme,
  PaperProvider,
  Snackbar,
  useTheme,
} from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { StatusBar as SB, View, useColorScheme } from "react-native";
import ThemedBackground from "@/src/components/ThemedBackground";
import { Provider as JotaiProvider } from "jotai";
import SnackBar, { snackBarStore } from "@/src/components/SnackBar";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const theme = useTheme()
  const colorScheme = useColorScheme();
  return (
    <JotaiProvider store={snackBarStore}>
      <PaperProvider>
        <ThemedBackground style={{ paddingTop: SB.currentHeight }}>
          <StatusBar style={colorScheme == "dark" ? "light" : "light"} />
          <Stack screenOptions={{ headerShown: false, navigationBarColor:theme.colors.onBackground}}>
            <Stack.Screen
              name="sign-in"
              options={{
                animationMatchesGesture: true,
                animationTypeForReplace: "push",
              }}
            />
            <Stack.Screen name="(auth)" />
            <Stack.Screen
              name="register"
              options={{ animation: "fade_from_bottom" }}
            />
          </Stack>
        </ThemedBackground>
        <SnackBar />
      </PaperProvider>
    </JotaiProvider>
  );
}
