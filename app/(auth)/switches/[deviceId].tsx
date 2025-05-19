import { device, devices } from "@/src/atoms/devicesAtoms";
import AddSwitch from "@/src/components/AddSwitch";
import BottomSheet from "@/src/components/BottomSheet";
import DeviceScreenHeader from "@/src/components/DeviceScreenHeader";
import { showSnackBar } from "@/src/components/SnackBar";
import SwitchComp from "@/src/components/SwitchComp";
import ThemedBackground from "@/src/components/ThemedBackground";
import { API_URL, switchIds } from "@/src/constants/Consts";
import { Switch, Thing } from "@/src/types/types";
import { router, useLocalSearchParams } from "expo-router";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useRef, useState } from "react";
import {
  BackHandler,
  FlatList,
  StatusBar,
  View,
  useWindowDimensions,
} from "react-native";
import {
  Button,
  Dialog,
  Icon,
  IconButton,
  Portal,
  Text,
  useTheme,
} from "react-native-paper";
import axios from "../../../src/utils/axios";

const Switches = () => {
  const { deviceId } = useLocalSearchParams();
  const [devs, setDevices] = useAtom(devices);
  const switches = devs?.find((i) => i._id == deviceId)?.switches as Switch[];
  const dev = devs?.find((i) => i._id == deviceId) as Thing;

  const [selectedSwitch, setSelectedSwitch] = useState<Switch | null>(null);
  const [visible, setVisible] = useState(false);

  const hideDialog = () => setVisible(false);
  const showDialog = () => setVisible(true);

  const BSRef = useRef<any>();

  const initialFormData: Switch = {
    name: "",
    thingId: deviceId as string,
    icon: "lightbulb",
    switchId: "",
  };

  const [sw, setSwitch] = useState<Switch | null>(initialFormData);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        router.back();
        return true;
      }
    );

    return () => backHandler.remove();
  }, []);

  const showAddForm = () => {
    if (
      switchIds?.filter(
        (i) => !dev?.switches?.map((x) => x.switchId)?.includes(i)
      ).length === 0
    ) {
      showSnackBar("Cannot add more switches!", 2000);
      return;
    }
    setSelectedSwitch(null);
    BSRef.current.open();
  };

  const showedit = (s: Switch) => {
    setSelectedSwitch(s);
    BSRef.current.open();
  };

  const deleteThing = async () => {
    try {
      axios.delete(API_URL + `/switches/${selectedSwitch?._id}`);
      hideDialog()
      setDevices((prev) => {
        const newDevices = (prev as Thing[]).map((i) => {
          if (i._id != deviceId) return i;
          else {
            const s = i.switches?.filter(
              (v: Switch) => v._id != selectedSwitch?._id
            );
            return { ...i, switches: s };
          }
        });
        return newDevices;
      });
    } catch (error) {
      console.log(error);
    }
  };
  const gap = 15;

  return (
    <ThemedBackground
      style={{
        paddingTop: StatusBar.currentHeight,
      }}
    >
      <DeviceScreenHeader
        deviceId={deviceId as string}
        dev={dev}
        showAddForm={showAddForm}
      />
      <FlatList
        data={switches}
        keyExtractor={(i) => i._id!}
        // contentContainerStyle={{ paddingHorizontal: 10 }}
        numColumns={2}
        contentContainerStyle={{
          gap: gap,
          flex: 1,
          paddingHorizontal: 40,
          paddingVertical: 20,
        }}
        columnWrapperStyle={{ gap: gap }}
        style={{ flex: 1 }}
        ListEmptyComponent={() => (
          <Text style={{ textAlign: "center", fontWeight: 700, fontSize: 16 }}>
            Add switches to display here
          </Text>
        )}
        renderItem={({ item }) => {
          return <SwitchComp onPress={() => showedit(item)} switch={item} />;
        }}
      />
      <Portal>
        <BottomSheet
          style={{
            margin: 0,
            borderRadius: 0,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
          ref={BSRef}
          onClose={() => setSwitch(initialFormData)}
        >
          <AddSwitch
            selectedSwitch={selectedSwitch}
            sw={sw!}
            initialFormData={initialFormData}
            setSwitch={setSwitch}
            close={() => BSRef.current?.close()}
            deviceId={deviceId as string}
            device={dev}
            deleteSwitch={() => {
              BSRef.current.close();
              showDialog();
            }}
          />
        </BottomSheet>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>
            <Text variant="titleMedium">Are you sure?</Text>
          </Dialog.Title>
          <Dialog.Actions>
            <Button
              onPress={() => {
                hideDialog();
              }}
            >
              Cancel
            </Button>
            <Button onPress={deleteThing}>Yes</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ThemedBackground>
  );
};

export default Switches;
