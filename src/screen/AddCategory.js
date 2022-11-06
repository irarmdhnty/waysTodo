import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  Box,
  FlatList,
  HStack,
  Input,
  KeyboardAvoidingView,
  Spinner,
} from "native-base";
import React, { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { ButtonAll } from "../components/ButtonAll";

const AddCategory = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [categoryLoading, setCategoryLoading] = React.useState(false);

  const [categories, setCategories] = React.useState([]);

  const [form, setForm] = React.useState({
    name: "",
    user_id: "",
  });

  const getCategory = async () => {
    try {
      setCategoryLoading(true);
      const response = await axios.get(
        "https://api.v2.kontenbase.com/query/api/v1/c16c5e30-3d0c-4b22-87d8-5f098afbfae3/category"
      );
      setCategoryLoading(false);
      setCategories(response.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    getCategory();
    console.log("categories", categories);
  }, []);

  const handleAddCategory = async () => {
    const token = await AsyncStorage.getItem("token");
    const id = await AsyncStorage.getItem("id");
    console.log(id);
    try {
      setForm({ ...form, user_id: id });
      console.log(form);
      setIsLoading(true);
      const response = await axios.post(
        `https://api.v2.kontenbase.com/query/api/v1/c16c5e30-3d0c-4b22-87d8-5f098afbfae3/category`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getCategory();
      console.log(response);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  };

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
        <Text style={styles.title}>Add Category</Text>
        <Box>
          <Input
            placeholder="Name"
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
        </Box>
        <Box style={{ paddingHorizontal: 5 }} mt={3}>
          <ButtonAll
            btnName={"AddCategory"}
            color="pink"
            isLoading={isLoading}
            onPress={handleAddCategory}
          />
        </Box>
      </Box>
      <Box
        mt={"16"}
        style={{
          paddingHorizontal: 20,
        }}
      >
        <Text style={styles.title}>List Category</Text>
        <HStack
          alignItems={categoryLoading ? "center" : "flex-start"}
          space={3}
        >
          {categoryLoading ? (
            <HStack
              justifyContent="center"
              style={{ width: 310 }}
              space={3}
              mt={5}
            >
              <Spinner accessibilityLabel="Loading posts" size="lg" />
              <Text fontSize={"2xl"}>Loading Category..</Text>
            </HStack>
          ) : (
            <FlatList
              horizontal
              data={categories}
              width={300}
              renderItem={({ item }) => {
                return (
                  <Box
                    key={item.id}
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      borderRadius: 10,
                      width: "auto",
                      marginRight: 10,
                    }}
                  >
                    <Text>{item.name}</Text>
                  </Box>
                );
              }}
              keyExtractor={(item) => item.id}
            />
          )}
        </HStack>
      </Box>
    </KeyboardAvoidingView>
  );
};

export default AddCategory;

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 20,
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
