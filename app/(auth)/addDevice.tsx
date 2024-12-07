import { device, devices } from "@/src/atoms/devicesAtoms";
import CustomHeader from "@/src/components/CustomHeader";
import LogoSelectorItem from "@/src/components/LogoSelectorItem";
import SaveDevice from "@/src/components/SaveDevice";
import ThemedBackground from "@/src/components/ThemedBackground";
import { devicesData } from "@/src/utils/logoData";
import { useNavigationState } from "@react-navigation/native";
import { router, useRootNavigationState } from "expo-router";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { FlatList, StatusBar, View } from "react-native";
import { Button, Icon, Text, TextInput, useTheme } from "react-native-paper";

const add = () => {
  const theme = useTheme();
  const [dev, setDevice] = useAtom(device);
  const [devs, setDevices] = useAtom(devices);

  const handleDeviceChange = (value: string, name: string) => {
    setDevice((prev) => ({ ...prev, [name]: value }));
  };

  const state = useRootNavigationState();
  const [deviceId, setDeviceId] = useState<string | null>(null);

  useEffect(() => {
    const devId =
      state.routes[state.routes.length - 1].state.routes.slice(-1)[0].params
        .deviceId;
    if (devId) {
      const d = devs?.find((i) => i._id == devId);
      if (d) setDevice(d);
      setDeviceId(devId);
    }
  }, []);

  return (
    <ThemedBackground style={{ padding: 20, gap: 20 }}>
      <View
        style={{
          paddingTop: StatusBar.currentHeight,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Button onPress={() => router.back()}>Cancel</Button>
        <Text variant="titleLarge" style={{ flex: 1, textAlign: "center" }}>
          {deviceId ? "Update device" : "Add a device"}
        </Text>
        <SaveDevice deviceId={deviceId} />
      </View>
      <View
        style={{
          alignSelf: "center",
          padding: 30,
          borderWidth: 1,
          borderColor: theme.colors.primary,
          borderRadius: 5,
          backgroundColor: theme.colors.secondaryContainer,
        }}
      >
        <Icon size={50} source={dev.icon} />
      </View>
      <TextInput
        value={dev.name}
        mode="outlined"
        placeholder="e.g. Bedroom"
        label={"Name"}
        onChangeText={(val) => {
          handleDeviceChange(val, "name");
        }}
      />
      <FlatList
        style={{ flex: 1 }}
        data={devicesData}
        keyExtractor={(i) => i.name}
        numColumns={3}
        columnWrapperStyle={{ gap: 20 }}
        contentContainerStyle={{ gap: 20 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <LogoSelectorItem logo={item} setSelector={handleDeviceChange} />
          );
        }}
      />
    </ThemedBackground>
  );
};

export default add;
