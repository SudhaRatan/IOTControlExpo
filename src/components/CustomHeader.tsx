import { router } from "expo-router";
import {
  GestureResponderEvent,
} from "react-native";
import { Appbar } from "react-native-paper";
import { NativeStackHeaderProps } from "@react-navigation/native-stack/src/types";

interface CustomStackHeaderProps extends NativeStackHeaderProps {
  title?: string;
  right?: string;
  rightOnPress?: (event?: GestureResponderEvent) => void;
}

const CustomHeader = ({
  title,
  back,
  right,
  rightOnPress,
}: CustomStackHeaderProps) => {
  return (
    <Appbar.Header>
      {back && <Appbar.BackAction onPress={() => router.back()} />}
      <Appbar.Content title={title} />
      {right && <Appbar.Action icon={right} onPress={rightOnPress} />}
    </Appbar.Header>
  );
};

export default CustomHeader;