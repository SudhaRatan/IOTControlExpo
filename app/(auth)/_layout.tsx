import CustomHeader from "@/src/components/CustomHeader";
import { Stack } from "expo-router";
import { useTheme } from "react-native-paper";

export default function Layout() {
  const theme = useTheme();
  return (
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="add"
          options={{
            headerShown: true,
            header: (props) => (
              <CustomHeader
                {...props}
                title={"Add a device"}
                back={props.back}
              />
            ),
            presentation:"containedTransparentModal",
            animation:"simple_push"
          }}
        />
      </Stack>
  );
}
