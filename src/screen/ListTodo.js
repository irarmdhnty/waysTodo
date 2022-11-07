import * as React from "react";
import {
  View,
  Text,
  StatusBar,
  VStack,
  Image,
  HStack,
  FlatList,
  Box,
  ScrollView,
  Input,
  Stack,
  Pressable,
  Select,
  CheckIcon,
} from "native-base";
import { StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";

import profile from "../components/assets/profile.png";
import finish from "../components/assets/finish.png";
import pending from "../components/assets/pending.png";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function List(props) {
  const [date, setDate] = React.useState(new Date());
  const [mode, setMode] = React.useState("date");
  const [show, setShow] = React.useState(false);
  const [text, setText] = React.useState("Choose Date");

  const onChangeDate = (event, selectedDate) => {
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
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const [userName, setUserName] = React.useState({ user_name: null });

  const handleOnChange = (name, value) => {
    setList({
      ...list,
      [name]: value,
    });
  };

  const getUserName = async () => {
    try {
      const user_name = await AsyncStorage.getItem("user_name");
      setUserName({
        user_name,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const [category, setCategory] = React.useState({ user_id: null });
  const [dataCategory, setDataCategory] = React.useState([]);

  const findUserCategories = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const user_id = await AsyncStorage.getItem("user_id");
      setCategory({
        user_id,
      });

      if (token === null) {
        props.navigation.navigate("Login");
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
    } catch (err) {
      console.log(err);
    }
  };

  const [dataList, setDataList] = React.useState([]);
  const getLists = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const user_id = await AsyncStorage.getItem("user_id");

      if (!token) {
        props.navigation.navigate("Login");
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const response = await axios.get(
        `https://api.v2.kontenbase.com/query/api/v1/c16c5e30-3d0c-4b22-87d8-5f098afbfae3/List?user_id=${user_id}`,
        config
      );
      setDataList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getUserName();
    findUserCategories();
    getLists();
  }, []);

  return (
    <>
      <View p={7} className="top" style={{ flex: 1 }}>
        <HStack mb={3} justifyContent="space-between">
          <VStack>
            <Text bold fontSize="2xl">
              Hi Ra
            </Text>
            <Text color="#FF5555">10 Lists</Text>
          </VStack>
          <Image
            alt="profile"
            source={profile}
            width={20}
            height={20}
            borderRadius={50}
            borderWidth={3}
            borderColor="#FF5555"
          />
        </HStack>
        <Stack>
          <Input
            borderRadius={8}
            borderWidth={2}
            mb={2}
            placeholder="Search List..."
          />
          <HStack justifyContent="space-between">
            <Pressable
              p={1}
              title="DatePicker"
              onPress={() => showMode("date")}
              borderRadius={8}
              borderWidth={2}
              borderColor="gray.300"
              mb="3"
              w="120px"
            >
              <HStack justifyContent="space-between">
                <Text fontSize="xs" color="blueGray.400">
                  <Ionicons name="calendar-outline" />
                  {text}
                </Text>
              </HStack>
            </Pressable>
            <Select
              borderRadius={8}
              borderWidth={2}
              mb="5px"
              w="120px"
              placeholder="Category"
              accessibilityLabel="Categories"
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size={5} />,
              }}
            >
              {dataCategory?.map((item, index) => (
                <Select.Item key={index} label={item?.name} value={item.name} />
              ))}
            </Select>
            <Select
              w="100px"
              borderRadius={8}
              borderWidth={2}
              mb="5px"
              placeholder="Status"
              accessibilityLabel="Status"
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size={5} />,
              }}
            >
              <Select.Item label="finish" value="finish" />
              <Select.Item label="pending" value="pending" />
            </Select>
          </HStack>
        </Stack>
      </View>
      <View p={6} className="bottom" style={{ flex: 3 }}>
        <FlatList
          data={dataList}
          renderItem={(itemData) => {
            return (
              <Pressable
                onPress={() =>
                  props.navigation.navigate("Detail", { itemData })
                }
              >
                <Box borderRadius={5} bg="lightBlue.100" m={2} p={3}>
                  <HStack justifyContent="space-between">
                    <View>
                      <HStack>
                        {itemData.item.status === "done" ? (
                          <>
                            <Text
                              style={{
                                textDecorationLine: "line-through",
                                textDecorationStyle: "solid",
                              }}
                              bold
                            >
                              {itemData.item.category}
                            </Text>
                            <Text
                              style={{
                                textDecorationLine: "line-through",
                                textDecorationStyle: "solid",
                              }}
                              bold
                            >
                              {" "}
                              -{" "}
                            </Text>
                            <Text
                              style={{
                                textDecorationLine: "line-through",
                                textDecorationStyle: "solid",
                              }}
                              bold
                            >
                              {itemData.item.name}
                            </Text>
                          </>
                        ) : (
                          <>
                            <Text bold>{itemData.item.category}</Text>
                            <Text bold> - </Text>
                            <Text bold>{itemData.item.name}</Text>
                          </>
                        )}
                      </HStack>
                      {itemData.item.status === "done" ? (
                        <Text
                          w={200}
                          mb={5}
                          style={{
                            textDecorationLine: "line-through",
                            textDecorationStyle: "solid",
                          }}
                          color="coolGray.400"
                        >
                          {itemData.item.desc}
                        </Text>
                      ) : (
                        <Text w={200} mb={5} color="coolGray.400">
                          {itemData.item.desc}
                        </Text>
                      )}

                      <Text color="coolGray.400">
                        <Ionicons name="calendar-outline" />{" "}
                        {itemData.item.date}
                      </Text>
                    </View>
                    <View alignItems="center">
                      <Pressable>
                        <Text
                          bg="danger.100"
                          w="100px"
                          fontSize="xs"
                          borderRadius={8}
                          color="#fff"
                          bold
                          textAlign="center"
                          mb={2}
                          p={1}
                        >
                          {itemData.item.category}
                        </Text>
                      </Pressable>
                      {itemData.item.status === "done" ? (
                        <Image
                          alt="status"
                          source={finish}
                          width="60px"
                          height="60px"
                        />
                      ) : (
                        <Image
                          alt="status"
                          source={pending}
                          width="60px"
                          height="60px"
                        />
                      )}
                    </View>
                  </HStack>
                </Box>
              </Pressable>
            );
          }}
          keyExtractor={(item, index) => {
            return item._id;
          }}
        />
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hours={true}
            display="default"
            onChange={onChangeDate}
          />
        )}
      </View>
    </>
  );
}
