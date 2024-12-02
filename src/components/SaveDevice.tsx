import { TouchableOpacity } from "react-native";
import { ActivityIndicator, Text, useTheme } from "react-native-paper";

import axios from "../utils/axios";
import { API_URL } from "../constants/Consts";
import { useAtom } from "jotai";
import { device } from "../atoms/devicesAtoms";
import { useState } from "react";
import { router } from "expo-router";
import { showSnackBar } from "./SnackBar";

const SaveDevice = () => {
  const theme = useTheme();
  const [dev, setDev] = useAtom(device);
  const [loading, setLoading] = useState(false);

  const addDevice = async () => {
    if (dev.name != "" && dev.icon != "") {
      console.log(dev, "==>>");
      try {
        setLoading(true);
        const res = await axios.post(API_URL + "/things", {
          name: dev.name,
          icon: dev.icon,
        });
        console.log(res.data);
        setLoading(false);
        setDev({ icon: "home", name: "" });
        showSnackBar("Added successfully!", 2000)
        router.back()
      } catch (error) {
        setLoading(false);
        console.log(error);
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
        <Text style={{ color: theme.colors.primaryContainer }}>SAVE</Text>
      ) : (
        <ActivityIndicator size={"small"} />
      )}
    </TouchableOpacity>
  );
};

export default SaveDevice;
