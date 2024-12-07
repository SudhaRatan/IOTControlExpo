import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Divider, Icon, Text, useTheme } from "react-native-paper";

interface DeviceMenuProps {
  edit: () => void;
  deleteDevice: () => void;
}

const DeviceMenu = ({ edit, deleteDevice }: DeviceMenuProps) => {
  const theme = useTheme();

  return (
    <View>
      <TouchableOpacity style={styles.itemContainer} onPress={edit}>
        <Icon source={"pencil-outline"} size={24} />
        <Text style={{ fontSize: 16, fontFamily: "monospace" }}>Edit</Text>
      </TouchableOpacity>
      <Divider />
      <TouchableOpacity style={styles.itemContainer} onPress={deleteDevice}>
        <Icon
          source={"trash-can-outline"}
          size={24}
          color={theme.colors.tertiary}
        />
        <Text
          style={{
            fontSize: 16,
            color: theme.colors.tertiary,
            fontFamily: "monospace",
          }}
        >
          Delete
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DeviceMenu;

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    paddingVertical: 15,
  },
});
