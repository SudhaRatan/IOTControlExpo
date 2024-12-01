import { View, Text } from "react-native";
import React from "react";
import { Snackbar } from "react-native-paper";
import { createStore, useAtom } from "jotai";
import { snackBarAtom } from "../atoms/snackBar";

const SnackBar = () => {
  const [snackbar, setSnackBar] = useAtom(snackBarAtom);

  const onDismissSnackBar = () => setSnackBar(prev => ({message: "", visible: false}));

  return (
    <Snackbar
      visible={snackbar.visible}
      onDismiss={onDismissSnackBar}
      action={{
        label: "Ok",
        onPress: () => {
          onDismissSnackBar()
        },
      }}
    >
      {snackbar.message}
    </Snackbar>
  );
};

export const snackBarStore = createStore();

export const showSnackBar = (message: string, time: number = 1000) => {
  snackBarStore.set(snackBarAtom, {message, visible: true});
  setTimeout(() => {
    snackBarStore.set(snackBarAtom, {message: "", visible: false})
  },time)
};

export default SnackBar;
