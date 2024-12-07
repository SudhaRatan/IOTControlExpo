import { authAtom } from "@/src/atoms/initAtoms";
import { Redirect, Tabs, router } from "expo-router";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import axios from "../../../src/utils/axios";
import { Icon, IconButton, Text, useTheme } from "react-native-paper";
import { device, devices, loadingDevices } from "@/src/atoms/devicesAtoms";
import { getDevices } from "@/src/utils/rest/devices";

export default function Layout() {
  const auth = useAtomValue(authAtom);
  const theme = useTheme();
  const setDevices = useSetAtom(devices)
  const setLoadingDevices = useSetAtom(loadingDevices)

  useEffect(() => {
    (async() => {
      if (auth) {
        axios.defaults.headers.common["x-access-token"] = auth.token;
        await getDevices(setDevices, setLoadingDevices);
      }
    })();
  }, [auth]);

  const setDevice = useSetAtom(device);

  if (!auth) {
    return <Redirect href={"/sign-in"} />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: theme.colors.background },
        headerStyle: { backgroundColor: theme.colors.background, elevation: 0 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: (props) => {
            return <Text variant="titleLarge">Home</Text>;
          },
          tabBarShowLabel: false,
          headerRight: () => (
            <IconButton
              icon={"plus"}
              onPress={() => {
                setDevice({ icon: "home", name: "" });
                router.navigate("/addDevice");
              }}
            />
          ),
          tabBarIcon: (props) => {
            return (
              <Icon
                size={props.size}
                source={
                  props.focused ? "view-dashboard" : "view-dashboard-outline"
                }
                color={props.focused ? theme.colors.primary : props.color}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          headerTitle: (props) => {
            return <Text variant="titleLarge">Account</Text>;
          },
          tabBarShowLabel: false,
          tabBarIcon: (props) => {
            return (
              <Icon
                size={props.size}
                source={props.focused ? "account" : "account-outline"}
                color={props.focused ? theme.colors.primary : props.color}
              />
            );
          },
        }}
      />
    </Tabs>
  );
}
