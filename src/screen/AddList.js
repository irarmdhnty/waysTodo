import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import {
  Box,
  Button,
  CheckIcon,
  FormControl,
  Input,
  KeyboardAvoidingView,
  Select,
  TextArea,
  WarningOutlineIcon,
} from "native-base";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView, View, Text } from "react-native";

const AddList = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = React.useState(new Date());
  const [mode, setMode] = React.useState("date");
  const [show, setShow] = React.useState(false);
  const [text, setText] = React.useState("Empty");

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS == "ios");
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    setText(fDate);
    console.log(fDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const [dataCategory, setDataCategory] = React.useState([]);

  const getCategory = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const user_id = await AsyncStorage.getItem("user_id");
      setList({
        user_id,
        status: "pending",
        date: new Date(),
      });
      if (token === null) {
        navigation.navigate("Login");
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const response = await axios.get(
        `https://api.v2.kontenbase.com/query/api/v1/c16c5e30-3d0c-4b22-87d8-5f098afbfae3/category?user_id=${user_id}`,
        config
      );
      setDataCategory(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [list, setList] = React.useState({ user_id: null, status: null });
  console.log(list);

  function handleChange(name, value) {
    setList({
      ...list,
      [name]: value,
    });
  }

  const handleOnPress = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token === null) {
        navigation.navigate("Login");
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };

      setIsLoading(true);
      const response = await axios.post(
        "https://api.v2.kontenbase.com/query/api/v1/c16c5e30-3d0c-4b22-87d8-5f098afbfae3/List",
        list,
        config
      );
      console.log(response);

      setIsLoading(false);
      navigation.navigate("ListTodo");
      alert("Success add List");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getCategory();
    // console.log(setList);
  }, []);

  return (
    <KeyboardAvoidingView
      h={{
        base: "400px",
        lg: "auto",
      }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Box
        mt={"16"}
        style={{
          paddingHorizontal: 20,
        }}
      >
        <Text style={styles.title}>Add List</Text>
        <Box>
          <Input
            placeholder="Name"
            marginBottom={5}
            padding={3}
            value={list.name}
            onChangeText={(value) => handleChange("name", value)}
          />
          <FormControl maxW="full" marginBottom={5}>
            <Select
              name="category"
              onValueChange={(value) => handleChange("category", value)}
              minWidth="300"
              accessibilityLabel="Category"
              placeholder="Category"
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size={5} />,
              }}
              mt="1"
              padding={3}
            >
              {dataCategory?.map((item) => (
                <Select.Item label={item?.name} value={item.name} />
              ))}
            </Select>
          </FormControl>
          <TouchableOpacity
            style={{
              marginBottom: 25,
              borderWidth: 1,
              padding: 3,
              textAlign: "center",
              borderRadius: 6,
              borderColor: "gray",
            }}
            title="DatePicker"
            onPress={() => showMode("date")}
          >
            <Text style={{ color: "#999999" }}>
              <Ionicons name="calendar-outline" size={20} />
              Choose Date
            </Text>
          </TouchableOpacity>
          <TextArea
            placeholder="Description"
            value={list.desc}
            name="desc"
            onChangeText={(value) => handleChange("desc", value)}
          />
        </Box>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChangeDate}
          />
        )}
        <Box style={{ paddingHorizontal: 10 }}>
          <Button style={styles.btn} borderRadius={5} onPress={handleOnPress}>
            <Text style={styles.textBtn}>Add List</Text>
          </Button>
        </Box>
      </Box>
    </KeyboardAvoidingView>
  );
};

export default AddList;

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 20,
  },
  btn: {
    textAlign: "center",
    padding: 15,
    marginTop: 50,
    borderRadius: 10,
    backgroundColor: "#FF5555",
  },
  textBtn: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});
