import { Link, Redirect, router } from "expo-router";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { useAtom } from "jotai";
import { authAtom } from "@/src/atoms/initAtoms";
import ThemedBackground from "@/src/components/ThemedBackground";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "@/src/constants/env";
import { login } from "@/src/types";
import { showSnackBar } from "@/src/components/SnackBar";

const SignIn = () => {
  const [auth, setAuth] = useAtom(authAtom);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const [login, setLogin] = useState<login>({
    email: "",
    password: "",
  });

  const theme = useTheme();

  const handleChange = (val: string, type: "email" | "password") => {
    setLogin((prev) => {
      return { ...prev, [type]: val };
    });
  };

  if (auth) {
    return <Redirect href={"/(auth)/(tabs)"} />;
  }

  const signIn = async () => {
    try {
      if (login.email != "" && login.password != "") {
        setLoading(true);
        const res = await axios.post(API_URL + "/auth", login);
        setAuth(res.data);
        setLoading(false);
      }else{
        showSnackBar("Enter all details", 1000);
      }
    } catch (error: any) {
      setLoading(false);
      showSnackBar(error.response.data.message, 2000);
    }
  };

  return (
    <ThemedBackground
      style={{ padding: 20, gap: 20, justifyContent: "center" }}
    >
      <TextInput
        placeholder="e.g. ratan@gmail.com"
        label={"Email"}
        value={login.email}
        onChangeText={(val) => handleChange(val, "email")}
      />
      <TextInput
        secureTextEntry={!showPassword}
        placeholder="Your password"
        label={"Password"}
        value={login.password}
        onChangeText={(val) => handleChange(val, "password")}
        right={
          <TextInput.Icon
            icon={showPassword ? "eye-off" : "eye"}
            onPress={togglePassword}
          />
        }
      />
      <Button
        mode="contained-tonal"
        loading={loading}
        disabled={loading}
        onPress={signIn}
      >
        {loading ? "Sigining in" : "Sign in"}
      </Button>
      <Text style={{ textAlign: "center" }}>
        New user?{" "}
        <Link
          style={{ fontWeight: "bold", color: theme.colors.primary }}
          href={"/register"}
        >
          Register
        </Link>
      </Text>
    </ThemedBackground>
  );
};

export default SignIn;
