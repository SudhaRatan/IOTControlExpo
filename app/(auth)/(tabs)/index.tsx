import { Button, Dialog, Portal, Text, useTheme } from "react-native-paper";
import ThemedBackground from "@/src/components/ThemedBackground";
import { FlatList, RefreshControl, View } from "react-native";
import { devices as devicees, loadingDevices } from "@/src/atoms/devicesAtoms";
import { useAtom } from "jotai";
import DeviceItem from "@/src/components/DeviceItem";
import { getDevices } from "@/src/utils/rest/devices";
import BottomSheet from "@/src/components/BottomSheet";
import { useRef, useState } from "react";
import DeviceMenu from "@/src/components/DeviceMenu";
import { router } from "expo-router";
import axios from "@/src/utils/axios";
import { API_URL } from "@/src/constants/Consts";
import { showSnackBar } from "@/src/components/SnackBar";
import { Thing } from "@/src/types/types";

const Index = () => {
  const [devices, setDevices] = useAtom(devicees);
  const [loadingDevicesState, setLoadingDevices] = useAtom(loadingDevices);
  const theme = useTheme();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  const hideDialog = () => setVisible(false);
  const showDialog = () => setVisible(true);

  const BSRef = useRef<any>();

  const edit = () => {
    BSRef.current.close();
    router.push({
      pathname: "/(auth)/addDevice",
      params: {
        deviceId: selectedItem,
      },
    });
  };

  const deleteDevice = () => {
    BSRef.current.close();
    showDialog();
  };

  const removeDevice = async () => {
    try {
      const res = await axios.delete(API_URL + `/things/${selectedItem}`);
      showSnackBar(res.data.message, 2000);
      setDevices((prev) =>
        (prev as Thing[]).filter((i) => i._id != selectedItem)
      );
      hideDialog();
    } catch (error) {
      console.log(error);
      hideDialog();
    }
  };

  return (
    <ThemedBackground>
      <FlatList
        contentContainerStyle={{ padding: 20, paddingTop: 0 }}
        ListEmptyComponent={() => (
          <Text style={{ textAlign: "center", fontWeight: 700, fontSize: 16 }}>
            Add devices to display here
          </Text>
        )}
        ItemSeparatorComponent={() => (
          <View
            style={{
              backgroundColor: theme.colors.surfaceDisabled,
              height: 1,
              marginVertical: 0,
            }}
          ></View>
        )}
        refreshControl={
          <RefreshControl
            colors={[theme.colors.primaryContainer]}
            refreshing={loadingDevicesState}
            onRefresh={() => getDevices(setDevices, setLoadingDevices)}
          />
        }
        data={devices}
        keyExtractor={(i) => i._id!}
        renderItem={({ item }) => {
          return (
            <DeviceItem
              device={item}
              openMenu={() => {
                setSelectedItem(item._id!);
                BSRef.current.open();
              }}
            />
          );
        }}
      />
      <Portal>
        <BottomSheet
          ref={BSRef}
          style={{
            margin: 0,
            borderRadius: 0,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
          onClose={() => {}}
        >
          <DeviceMenu edit={edit} deleteDevice={deleteDevice} />
        </BottomSheet>
      </Portal>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Are you sure?</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">This action is irreversible!</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={removeDevice}>Yes</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ThemedBackground>
  );
};

export default Index;
