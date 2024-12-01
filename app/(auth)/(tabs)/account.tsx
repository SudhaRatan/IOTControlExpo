import { authAtom } from "@/src/atoms/initAtoms";
import ThemedBackground from "@/src/components/ThemedBackground";
import { useSetAtom } from "jotai";
import { Button } from "react-native-paper";

const account = () => {
  const setAuth = useSetAtom(authAtom)
  const logout = () => {
    setAuth(null)
  }
  return (
    <ThemedBackground style={{ justifyContent: "flex-end", padding: 20 }}>
      <Button mode="contained" onPress={logout}>Logout</Button>
    </ThemedBackground>
  );
};

export default account;
