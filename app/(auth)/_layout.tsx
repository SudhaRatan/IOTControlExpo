import { authAtom } from "@/src/atoms/initAtoms";
import { Redirect, Stack } from "expo-router";
import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";
import axios from "../../src/utils/axios";

export default function Layout() {
  const auth = useAtomValue(authAtom);
  if (!auth) {
    return <Redirect href={"/sign-in"} />;
  }
  useEffect(() => {
    if (auth) axios.defaults.headers.common["x-access-token"] = auth.token;
  }, [auth]);
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
