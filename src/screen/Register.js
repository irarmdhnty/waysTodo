import React, { useState } from "react";
import vector from "../components/assets/formLogin.png";
import { Box, Center, HStack, Input, Text } from "native-base";

import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ButtonAll } from "../components/ButtonAll";
import axios from "axios";

const Register = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    email: "",
    password: "",
  });

  const handleChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handlePressRegist = async () => {
    try {
      console.log(form);
      setIsLoading(true);
      const response = await axios.post(
        "https://api.v2.kontenbase.com/query/api/v1/c16c5e30-3d0c-4b22-87d8-5f098afbfae3/auth/register",
        form
      );
      setIsLoading(false);
      alert("Berhasil Regist");
      navigation.navigate("Login");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      alert("Email already");
    }
  };

  return (
    <KeyboardAvoidingView
      h={{
        base: "400px",
        lg: "auto",
      }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ paddingHorizontal: 20, marginTop: 80 }}
    >
      <ScrollView>
        <Center>
          <Image source={vector} />
          <Box>
            <Text marginTop={8} marginBottom={5} fontSize={"4xl"} bold>
              Register
            </Text>
          </Box>
        </Center>
        <Box>
          <Input
            placeholder="Email"
            marginBottom={5}
            padding={"3"}
            onChangeText={(value) => handleChange("email", value)}
            value={form.email}
          />
          <Input
            placeholder="Name"
            marginBottom={5}
            padding={"3"}
            onChangeText={(value) => handleChange("firstName", value)}
            value={form.firstName}
          />
          <Input
            placeholder="Password"
            marginBottom={5}
            padding={"3"}
            onChangeText={(value) => handleChange("password", value)}
            value={form.password}
          />

          <ButtonAll
            btnName={"Register"}
            color="pink"
            isLoading={isLoading}
            onPress={() => handlePressRegist()}
          />
        </Box>
        <HStack alignSelf={"center"}>
          <Text>Joined us before?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: "#B82020" }}> Login</Text>
          </TouchableOpacity>
        </HStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
  btn: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    padding: 15,
  },
});
