import { Link, Redirect, router } from "expo-router";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { useAtom } from "jotai";
import { authAtom } from "@/src/atoms/initAtoms";
import ThemedBackground from "@/src/components/ThemedBackground";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "@/src/constants/env";
import { register } from "@/src/types";
import { showSnackBar } from "@/src/components/SnackBar";

const Register = () => {
  const [auth, setAtom] = useAtom(authAtom);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const [registerData, setRegisterData] = useState<register>({
    name: "",
    email: "",
    password: "",
  });

  const theme = useTheme();

  const handleChange = (val: string, type: "name" | "email" | "password") => {
    setRegisterData((prev: register) => {
      return { ...prev, [type]: val };
    });
  };

  if (auth) {
    return <Redirect href={"/(auth)"} />;
  }

  const registerUser = async () => {
    try {
      setLoading(true);
      const res = await axios.post(API_URL + "/auth/register", registerData);
      console.log(res);
      showSnackBar("Registered successfully")
      setLoading(false);
      // Optionally navigate to sign-in after successful registration
      router.push("/sign-in"); 
    } catch (error: any) {
      setLoading(false);
      showSnackBar(error?.response?.data?.message || "Registration failed", 2000);
    }
  };
  return (
    <ThemedBackground
      style={{ padding: 20, gap: 20, justifyContent: "center" }}
    >
       <TextInput
        placeholder="e.g. Ratan"
        label={"Name"}
        value={registerData.name}
        onChangeText={(val) => handleChange(val, "name")}
      />
      <TextInput
        placeholder="e.g. ratan@gmail.com"
        label={"Email"}
        value={registerData.email}
        onChangeText={(val) => handleChange(val, "email")}
      />
      <TextInput
        secureTextEntry={!showPassword}
        placeholder="Your password"
        label={"Password"}
        value={registerData.password}
        onChangeText={(val) => handleChange(val, "password")}
        right={<TextInput.Icon icon={showPassword ? "eye-off" : "eye"} onPress={togglePassword} />}

      />
      <Button
        mode="contained-tonal"
        loading={loading}
        disabled={loading}
        onPress={registerUser}
      >
        {loading ? "Registering" : "Register"}
      </Button>
      <Text style={{ textAlign: "center" }}>
        Already have an account?{" "}
        <Link
          style={{ fontWeight: "bold", color: theme.colors.primary }}
          href={"/sign-in"}
          replace
        >
          Sign In
        </Link>
      </Text>
    </ThemedBackground>
  );
};
export default Register;
