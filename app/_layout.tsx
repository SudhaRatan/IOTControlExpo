import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { PaperProvider, useTheme } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { StatusBar as SB, View, useColorScheme } from "react-native";
import ThemedBackground from "@/src/components/ThemedBackground";
import { Provider as JotaiProvider } from "jotai";
import SnackBar, { snackBarStore } from "@/src/components/SnackBar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

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
  const theme = useTheme();
  const colorScheme = useColorScheme();
  return (
    <GestureHandlerRootView>
      <JotaiProvider store={snackBarStore}>
        <PaperProvider>
          <ThemedBackground>
            <StatusBar style={colorScheme == "dark" ? "light" : "dark"}/>
            <Stack
              screenOptions={{
                headerShown: false,
                navigationBarColor:
                  colorScheme == "light"
                    ? theme.colors.background
                    : theme.colors.onBackground,
                    presentation: "containedTransparentModal",
                    animation: "simple_push",
              }}
            >
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
    </GestureHandlerRootView>
  );
}
