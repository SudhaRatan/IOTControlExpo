import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Appbar } from "react-native-paper";
import { NativeStackHeaderProps } from "@react-navigation/native-stack/src/types";
import { FC } from "react";

interface CustomStackHeaderProps extends NativeStackHeaderProps {
  title?: string;
  Right?: FC;
  headerCenter?: boolean;
  Back?: FC;
}

const CustomHeader = ({
  title,
  back,
  Right,
  headerCenter,
  Back,
}: CustomStackHeaderProps) => {
  return (
    <Appbar.Header
      mode={headerCenter ? "center-aligned" : "small"}
      style={{ paddingHorizontal: 10 }}
    >
      {back && !Back ? (
        <Appbar.BackAction onPress={router.back} />
      ) : (
        <TouchableOpacity onPress={router.back}>
          {Back && <Back />}
        </TouchableOpacity>
      )}
      <Appbar.Content title={title} />
      {Right && <Right />}
    </Appbar.Header>
  );
};

export default CustomHeader;
