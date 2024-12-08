import { Pressable, View, useWindowDimensions } from "react-native";
import { Icon, Switch as SwitchOG, Text, useTheme } from "react-native-paper";
import { Switch } from "../types/types";
import { useState } from "react";

interface switchProps {
  switch: Switch;
  onPress: () => void;
}

const SwitchComp = (props: switchProps) => {
  const theme = useTheme();
  const gap = 15;
  const width = useWindowDimensions().width;
  const [switcH, setSwitch] = useState(false);

  return (
    <Pressable
      onPress={props.onPress}
      style={{
        borderRadius: 20,
        backgroundColor: theme.colors.surfaceDisabled,
        width: width / 2 - 40 - gap / 2,
        height: width / 2 - 40 - gap / 2,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Icon source={props.switch.icon} size={34} />
      <Text variant="titleMedium" style={{}}>
        {props.switch.name}
      </Text>
      <SwitchOG value={switcH} onValueChange={setSwitch} />
    </Pressable>
  );
};

export default SwitchComp;
