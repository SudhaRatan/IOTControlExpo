import CustomHeader from "@/src/components/CustomHeader";
import SaveDevice from "@/src/components/SaveDevice";
import { Stack } from "expo-router";
import { Text, useTheme } from "react-native-paper";

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
        name="addDevice"
        options={{
          // headerShown: false,
          // header: (props) => (
          //   <CustomHeader
          //     headerCenter
          //     {...props}
          //     title={"Add a device"}
          //     back={props.back}
          //     Right={() => <SaveDevice />}
          //     Back={() => (
          //       <Text style={{ color: theme.colors.tertiary }}>CANCEL</Text>
          //     )}
          //   />
          // ),
          presentation: "containedTransparentModal",
          animation: "simple_push",
        }}
      />
    </Stack>
  );
}
