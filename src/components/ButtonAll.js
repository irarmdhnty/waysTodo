import { Text, Button, Spinner } from "native-base";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

export const ButtonAll = ({ btnName, color, onPress, isLoading }) => {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: color === "pink" ? "#FF5555" : "#0000004F",
      textAlign: "center",
      padding: 15,
      borderRadius: 10,
    },
  });
  return (
    <Button style={styles.button} marginBottom={"2.5"} onPress={onPress}>
      {isLoading ? (
        <Spinner accessibilityLabel="Loading post" size="lg" color="blue.300" />
      ) : (
        <Text bold fontSize={20} color="white">
          {btnName}
        </Text>
      )}
    </Button>
  );
};
