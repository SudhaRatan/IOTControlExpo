import { device } from "@/src/atoms/devicesAtoms";
import LogoSelectorItem from "@/src/components/LogoSelectorItem";
import ThemedBackground from "@/src/components/ThemedBackground";
import { logo } from "@/src/types";
import { devicesData } from "@/src/utils/logoData";
import { useAtom, useSetAtom } from "jotai";
import { useState } from "react";
import { FlatList, View } from "react-native";
import { Icon, TextInput, useTheme } from "react-native-paper";

const add = () => {
  const [logo, setLogo] = useState("home");
  const theme = useTheme();
  const [dev, setDevice] = useAtom(device);

  const handleDeviceChange = (value: string, name: string) => {
    setDevice((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <ThemedBackground style={{ padding: 20, gap: 20 }}>
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
            <LogoSelectorItem
              logo={item}
              setSelector={handleDeviceChange}
            />
          );
        }}
      />
    </ThemedBackground>
  );
};

export default add;
