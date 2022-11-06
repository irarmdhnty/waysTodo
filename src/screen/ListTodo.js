import DateTimePicker from "@react-native-community/datetimepicker";
import {
  Box,
  CheckIcon,
  HStack,
  Input,
  Select,
  VStack,
  Text,
  ScrollView,
  View,
  FlatList,
} from "native-base";
import React from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";

import profile from "../components/assets/profile.png";
import { ButtonAll } from "../components/ButtonAll";

const ListTodo = ({ navigation }) => {
  const [date, setDate] = React.useState(new Date());
  const [mode, setMode] = React.useState("date");
  const [show, setShow] = React.useState(false);
  const [text, setText] = React.useState("Empty");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
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

  const todos = [
    {
      title: "Study - Golang",
      category: "Study",
    },
    {
      title: "Home Work - Mathematics",
      category: "Home Work",
    },
    {
      title: "Study - HTML",
      category: "Study",
    },
    {
      title: "Study - Javascript",
      category: "Study",
    },
  ];

  return (
    <Box
      style={{
        padding: 30,
      }}
    >
      <HStack style={{ justifyContent: "space-between", marginBottom: 20 }}>
        <VStack>
          <View>
            <Text style={styles.title}>Hi Ra</Text>
            <Text> 200 List</Text>
          </View>
        </VStack>
        <VStack>
          <Image source={profile} resizeMode="contain" />
        </VStack>
      </HStack>
      <Input placeholder="Search List..." marginBottom={5} padding={3} />
      <HStack style={{ justifyContent: "space-between", marginBottom: 20 }}>
        <ButtonAll btnName={"DatePicker"} onPress={() => showMode("date")} />

        <Select
          minWidth="100"
          size="md"
          placeholder="Category"
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size={5} />,
          }}
          mt="1"
        >
          <Select.Item label="Study" value="study" />
          <Select.Item label="Home Work" value="homework" />
          <Select.Item label="Workout" value="workout" />
        </Select>

        <Select
          minWidth="100"
          size="md"
          placeholder="Status"
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size={5} />,
          }}
          mt="1"
        >
          <Select.Item label="Finish" value="finish" />
          <Select.Item label="Pending" value="pending" />
        </Select>
      </HStack>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <Box>
        <ScrollView>
          <VStack>
            <FlatList
              data={todos}
              key={(item) => item.index}
              renderItem={({ item }) => (
                <HStack
                  mb={6}
                  backgroundColor="#DAEFFF"
                  borderRadius={10}
                  padding="3"
                  justifyContent={"space-between"}
                >
                  <TouchableOpacity>
                    <View className="flex-row mb-5 justify-between bg-[#DAEFFF] py-3 px-3 rounded">
                      <View>
                        <Text className="font-bold mb-2">{item.title}</Text>
                        <Text className="w-[235px] text-[#9B9B9B] mb-5">
                          Learn Golang to improve fundamentals and familiarize
                          with coding.
                        </Text>
                        <Text className="text-[#9B9B9B]">19 July 2021</Text>
                      </View>
                      <View className="items-end">
                        <Text className="bg-blue-300 text-white rounded px-2 py-1 mb-5 break-words">
                          {item.category}
                        </Text>
                        <Image
                          mt={2}
                          source="finish"
                          resizeMode="contain"
                          alignItems="center"
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </HStack>
              )}
            />
          </VStack>
        </ScrollView>
      </Box>
    </Box>
  );
};

export default ListTodo;

const styles = StyleSheet.create({
  title: {
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 20,
  },
  btn: {
    textAlign: "center",
    borderRadius: 10,
    backgroundColor: "#FF5555",
  },
  textBtn: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  btnCat: {
    padding: 15,
    marginEnd: 8,
  },
});
