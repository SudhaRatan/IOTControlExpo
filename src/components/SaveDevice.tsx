import { TouchableOpacity } from "react-native";
import { ActivityIndicator, Text, useTheme } from "react-native-paper";

import axios from "../utils/axios";
import { API_URL } from "../constants/Consts";
import { useAtom } from "jotai";
import { device, devices } from "../atoms/devicesAtoms";
import { useEffect, useState } from "react";
import { router, useRootNavigationState } from "expo-router";
import { showSnackBar } from "./SnackBar";
import { Thing } from "../types/types";

interface SaveDeviceType {
  deviceId: string | null;
}

const SaveDevice = ({ deviceId }: SaveDeviceType) => {
  const theme = useTheme();
  const [dev, setDev] = useAtom(device);
  const [loading, setLoading] = useState(false);
  const [devs, setDevices] = useAtom(devices);

  const addDevice = async () => {
    if (dev.name != "" && dev.icon != "") {
      try {
        setLoading(true);
        if (deviceId) {
          const res = await axios.put(API_URL + `/things/${deviceId}`, {
            name: dev.name,
            icon: dev.icon,
          });
          setDevices((prevDevs) => {
            const updatedDevs = [...(prevDevs as Thing[])];
            const ind = updatedDevs.findIndex((i) => i._id === deviceId);
            if (ind !== -1) updatedDevs[ind] = res.data;
            return updatedDevs;
          });
        } else {
          const res = await axios.post(API_URL + "/things", {
            name: dev.name,
            icon: dev.icon,
          });
          setDevices((prev) => [...(prev as Thing[]), res.data]);
        }
        setLoading(false);
        setDev({ icon: "home", name: "" });
        showSnackBar(
          deviceId ? "Updated successfully!" : "Added successfully!",
          2000
        );
        router.back();
      } catch (error: any) {
        setLoading(false);
        console.log(error?.reponse);
      }
    }
  };

  return (
    <TouchableOpacity
      style={{
        paddingVertical: 6,
        backgroundColor: theme.colors.primary,
        paddingHorizontal: 14,
        borderRadius: 50,
      }}
      onPress={addDevice}
      disabled={loading}
    >
      {!loading ? (
        <Text style={{ color: theme.colors.primaryContainer }}>
          {deviceId ? "UPDATE" : "SAVE"}
        </Text>
      ) : (
        <ActivityIndicator
          color={theme.colors.primaryContainer}
          size={"small"}
        />
      )}
    </TouchableOpacity>
  );
};

export default SaveDevice;
