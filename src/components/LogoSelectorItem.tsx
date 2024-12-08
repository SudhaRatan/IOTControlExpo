import { TouchableOpacity, View, useWindowDimensions } from "react-native";
import { Icon, useTheme } from "react-native-paper";
import { logo } from "../types";
import { useAtomValue } from "jotai";
import { device } from "../atoms/devicesAtoms";

interface LSInt {
  logo: logo;
  setSelector: (val: string, name: string) => void;
}

const LogoSelectorItem = ({ logo, setSelector }: LSInt) => {
  const width = useWindowDimensions().width;
  const theme = useTheme();
  const dev = useAtomValue(device);

  return (
    <TouchableOpacity
      onPress={() => setSelector(logo.name, "icon")}
      style={{
        width: width / 3 - 30 + 10 / 3,
        height: width / 3 - 30 + 10 / 3,
        borderWidth: 1,
        borderColor:
          dev.icon == logo.name ? theme.colors.primary : theme.colors.backdrop,
        backgroundColor:
          dev.icon == logo.name
            ? theme.colors.primaryContainer
            : theme.colors.surfaceDisabled,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Icon
        size={40}
        source={logo.name}
        color={theme.colors.onSecondaryContainer}
      />
    </TouchableOpacity>
  );
};

export default LogoSelectorItem;
