import { useEffect, useState } from "react";
import { Dimensions, View, useWindowDimensions } from "react-native";
import { Icon, Surface, Switch, Text, useTheme } from "react-native-paper";

export type type = "D0" | "D1" | "D2" | "D3";

interface SwitchCardType {
  name: string;
  status: boolean;
  type: type;
  setStatus: (type: type, val: boolean) => void;
  icon: string;
}

const SwitchCard = ({
  icon,
  name,
  setStatus,
  status,
  type,
}: SwitchCardType) => {
  const [s, setS] = useState(status);
  const theme = useTheme();
  const { width } = useWindowDimensions();
  useEffect(() => {
    setS(status);
  }, [status]);
  return (
    <Surface
      style={{
        padding: 20,
        alignItems: "center",
        borderRadius: 10,
        gap: 20,
        width: width / 2 - 30,
      }}
    >
      <Icon size={32} source={icon} color={theme.colors.primary} />
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{name}</Text>
      <Switch
        value={s}
        onValueChange={(val) => {
          setS(val);
          setStatus(type, val);
        }}
      />
    </Surface>
  );
};

export default SwitchCard;
