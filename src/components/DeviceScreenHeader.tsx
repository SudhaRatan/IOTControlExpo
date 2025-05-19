import { router } from "expo-router";
import { Platform, View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { Thing } from "../types/types";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface DeviceScreenHeaderProps {
  deviceId: string;
  dev: Thing | null;
  showAddForm: () => void;
}

const DeviceScreenHeader = ({
  deviceId,
  dev,
  showAddForm,
}: DeviceScreenHeaderProps) => {
  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top;
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingTop: Platform.OS === "ios" ? statusBarHeight : 0,
      }}
    >
      <View style={{ flex: 1 }}>
        <IconButton icon="arrow-left" size={24} onPress={() => router.back()} />
      </View>
      <Text variant="titleLarge">{deviceId && dev?.name}</Text>
      <View style={{ flex: 1, alignItems: "flex-end" }}>
        <IconButton icon="plus" size={24} onPress={showAddForm} />
      </View>
    </View>
  );
};

export default DeviceScreenHeader;
