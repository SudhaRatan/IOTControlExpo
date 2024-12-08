import { TouchableOpacity, View } from "react-native";
import { Icon, Text, useTheme } from "react-native-paper";
import { Thing } from "../types/types";
import { router } from "expo-router";

interface DeviceItemType {
  device: Thing;
  openMenu: () => void;
}

const DeviceItem = ({ device, openMenu }: DeviceItemType) => {
  const theme = useTheme();
  return (
    <TouchableOpacity onPress={() => router.push(`/(auth)/switches/${device._id}`)}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 20,
          paddingVertical: 10,
        }}
      >
        <View
          style={{
            backgroundColor: theme.colors.surfaceDisabled,
            padding: 20,
            borderRadius: 10,
          }}
        >
          <Icon size={40} source={device.icon} />
        </View>
        <Text style={{ fontSize: 18, flex: 1 }}>{device.name}</Text>
        <TouchableOpacity onPress={openMenu} style={{ padding: 10 }}>
          <Icon size={20} source={"dots-vertical"} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default DeviceItem;
