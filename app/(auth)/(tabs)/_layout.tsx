import { authAtom } from "@/src/atoms/initAtoms";
import { Redirect, Tabs, router } from "expo-router";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import axios from "../../../src/utils/axios";
import { Icon, IconButton, Text, useTheme } from "react-native-paper";
import { Pressable } from "react-native";
import { device } from "@/src/atoms/devicesAtoms";

export default function Layout() {
  const auth = useAtomValue(authAtom);
  const theme = useTheme();

  useEffect(() => {
    if (auth) axios.defaults.headers.common["x-access-token"] = auth.token;
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
