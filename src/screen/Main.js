import { Box, Button, Center, HStack, Image } from "native-base";
import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import gambar from "../components/assets/home.png";
import { ButtonAll } from "../components/ButtonAll";

export const Main = ({ navigation }) => {
  return (
    <Box mt={"24"} style={{ paddingHorizontal: 20 }}>
      <Center>
        <Image resizeMode="cover" source={gambar} alt={"Login.png"} />

        <HStack alignItems="center">
          <Text style={{ color: "black", marginEnd: 10, fontSize: 35 }}>
            Ways <Text style={{ color: "#B82020" }}>To</Text>
            <Text style={{ color: "#FF5555" }}>Do</Text>
          </Text>
        </HStack>

        <Text style={{ marginTop: 40, textAlign: "center" }}>
          Write your activity and finish your activity. Fast, Simple and Easy to
          Use
        </Text>
      </Center>
      <Box style={{ marginTop: 25 }}>
        <ButtonAll
          btnName={"Login"}
          color="pink"
          onPress={() => navigation.navigate("Login")}
        />
        <ButtonAll
          btnName={"Register"}
          onPress={() => navigation.navigate("Register")}
        />
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  btn: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    padding: 15,
  },
});
