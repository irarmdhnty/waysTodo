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
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Login = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };
  const handlePressLogin = async () => {
    try {
      // console.log(form);
      setIsLoading(true);
      const response = await axios.post(
        "https://api.v2.kontenbase.com/query/api/v1/c16c5e30-3d0c-4b22-87d8-5f098afbfae3/auth/login",
        form
      );
      await AsyncStorage.setItem("token", response.data.token);
      await AsyncStorage.setItem("user_id", response.data.user._id);

      setIsLoading(false);
      setForm({
        ...form,
        email: "",
        password: "",
      });
      alert("Berhasil Login");
      navigation.navigate("ListTodo");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      alert("Email/Password Salah");
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
              Login
            </Text>
          </Box>
        </Center>
        <Box>
          <Input
            placeholder="Email"
            marginBottom={5}
            padding={"3"}
            value={form.email}
            onChangeText={(e) => handleChange("email", e)}
          />
          <Input
            placeholder="Password"
            marginBottom={5}
            padding={"3"}
            value={form.password}
            onChangeText={(e) => handleChange("password", e)}
            secureTextEntry
          />

          <ButtonAll
            btnName={"Login"}
            color="pink"
            isLoading={isLoading}
            onPress={() => handlePressLogin()}
          />
        </Box>
        <HStack alignSelf={"center"}>
          <Text>New users ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={{ color: "#B82020" }}> Register</Text>
          </TouchableOpacity>
        </HStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  btn: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    padding: 15,
  },
});
