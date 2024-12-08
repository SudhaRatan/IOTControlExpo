import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import {
  Pressable,
  StatusBar,
  TouchableOpacity,
  View,
  useWindowDimensions,
  TextInput as NativeTextInput,
} from "react-native";
import {
  ActivityIndicator,
  Button,
  Icon,
  IconButton,
  Menu,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { Switch, Thing } from "../types/types";
import { switchesData } from "../utils/logoData";
import { FlatList } from "react-native-gesture-handler";
import axios from "../utils/axios";
import { API_URL, switchIds } from "../constants/Consts";
import { useAtom } from "jotai";
import { devices } from "../atoms/devicesAtoms";

interface AddSwitchProps {
  close: () => void;
  deviceId: string;
  sw: Switch;
  setSwitch: Dispatch<SetStateAction<Switch | null>>;
  initialFormData: Switch;
  device: Thing;
  selectedSwitch: Switch | null;
  deleteSwitch: () => void;
}

const AddSwitch = ({
  close,
  deviceId,
  setSwitch,
  sw,
  initialFormData,
  device,
  selectedSwitch,
  deleteSwitch,
}: AddSwitchProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const width = useWindowDimensions().width - 40;
  const theme = useTheme();
  const NameRef = useRef<NativeTextInput>(null);

  const [loading, setLoading] = useState(false);

  const [devs, setDevices] = useAtom(devices);

  const selectSwitchPort = (id: string) => {
    setSwitch((prev) => {
      return { ...prev, switchId: id } as Switch;
    });
    setShowMenu(false);
  };

  const handleTextInput = (n: string) => {
    setSwitch((prev) => {
      return { ...prev, name: n } as Switch;
    });
  };

  const resetForm = () => {
    NameRef.current?.setNativeProps({ text: "" });
    setSwitch(initialFormData);
  };

  useEffect(() => {
    if (selectedSwitch) setSwitch(selectedSwitch);
    else {
      setSwitch(initialFormData);
      NameRef.current?.setNativeProps({ text: "" });
    }
  }, [selectedSwitch]);

  const addSwitch = async () => {
    try {
      if (sw.name != "" && sw.switchId != "") {
        setLoading(true);
        if (!selectedSwitch) {
          const res = await axios.post(API_URL + "/switches", { ...sw });
          setDevices((prev) => {
            const newDevices = (prev as Thing[]).map((i) => {
              if (i._id != deviceId) return i;
              else {
                return { ...i, switches: [...i.switches!, res.data] };
              }
            });
            return newDevices;
          });
        } else {
          const res = await axios.put(
            API_URL + `/switches/${selectedSwitch._id}`,
            { ...sw }
          );
          setDevices((prev) => {
            const newDevices = (prev as Thing[]).map((i) => {
              if (i._id != deviceId) return i;
              else {
                const ind = i.switches?.findIndex((x) => x._id == res.data._id);
                if (ind != -1) {
                  i.switches![ind!] = res.data;
                }
                return { ...i, switches: [...i.switches!] };
              }
            });
            return newDevices;
          });
        }
        setLoading(false);
        resetForm();
        close();
      }
    } catch (error: any) {
      console.log(error?.response);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sw) NameRef.current?.setNativeProps({ text: sw.name });
  }, [sw]);

  return (
    <View style={{ gap: 20 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{}} variant="titleLarge">
          {selectedSwitch ? "Edit" : "Add a Switch"}
        </Text>
        {selectedSwitch && (
          <IconButton
            onPress={deleteSwitch}
            icon={"trash-can-outline"}
            size={22}
            iconColor={theme.colors.tertiary}
          />
        )}
      </View>
      <Menu
        style={{ width: width }}
        visible={showMenu}
        onDismiss={() => setShowMenu(false)}
        statusBarHeight={StatusBar.currentHeight}
        anchorPosition="bottom"
        anchor={
          <Pressable
            style={{ position: "relative", flexDirection: "row" }}
            onPress={() => setShowMenu(true)}
          >
            <TextInput
              mode="outlined"
              readOnly
              label="Device switch"
              style={{ flex: 1 }}
              value={sw.switchId}
            />
            <View
              style={{
                position: "absolute",
                right: 5,
                margin: "auto",
                alignSelf: "center",
              }}
            >
              <Icon source={"chevron-down"} size={24} />
            </View>
          </Pressable>
        }
      >
        {switchIds
          ?.filter((i) => {
            if (
              !device?.switches?.map((x) => x.switchId)?.includes(i) ||
              (selectedSwitch && i == selectedSwitch.switchId)
            ) {
              return true;
            }
          })
          .map((switchId) => {
            return (
              <Menu.Item
                key={switchId}
                title={switchId}
                onPress={() => selectSwitchPort(switchId)}
              />
            );
          })}
      </Menu>
      <TextInput
        mode="outlined"
        placeholder="e.g. light"
        // label="Name"
        onChangeText={handleTextInput}
        defaultValue={sw.name}
        ref={NameRef}
        left={
          <TextInput.Icon
            icon={sw?.icon as string}
            color={theme.colors.primary}
            size={18}
          />
        }
      />

      <FlatList
        data={switchesData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(i) => i.name}
        style={{ height: (width / 5) * 3 }}
        numColumns={5}
        contentContainerStyle={{ gap: 10 }}
        columnWrapperStyle={{ gap: 10 }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setSwitch((prev) => {
                  return { ...prev, icon: item.name } as Switch;
                });
              }}
              style={{
                width: width / 5 - 10 + 2,
                height: width / 5 - 10 + 2,
                borderWidth: 1,
                borderColor:
                  sw?.icon == item.name
                    ? theme.colors.primary
                    : theme.colors.surfaceDisabled,
                backgroundColor:
                  sw?.icon == item.name
                    ? theme.colors.primaryContainer
                    : theme.colors.surfaceDisabled,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                borderRadius: 10,
              }}
            >
              <View style={{ alignSelf: "center" }}>
                <Icon source={item.name} size={25} />
              </View>
            </TouchableOpacity>
          );
        }}
      />

      <View style={{ flexDirection: "row", alignSelf: "flex-end", gap: 10 }}>
        <Button onPress={close}>CANCEL</Button>
        <Button
          disabled={loading}
          mode="contained-tonal"
          loading={loading}
          onPress={addSwitch}
        >
          {!loading
            ? selectedSwitch
              ? "UPDATE"
              : "ADD"
            : selectedSwitch
            ? "UPDATING"
            : "ADDING"}
        </Button>
      </View>
    </View>
  );
};

export default AddSwitch;
