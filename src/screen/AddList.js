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
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView, View, Text } from "react-native";

const AddList = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    category_id: "",
    desc: "",
  });

  const handleOnChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnPress = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token === null) {
        navigation.navigate("Login");
      }

      setIsLoading(true);
      const response = await axios.post(
        "https://api.kontenbase.com/query/api/v1/0b5806cc-db6b-4088-bbfc-f6368c72c166/Todos",
        form
      );
      console.log(response);

      setIsLoading(false);
      navigation.navigate("ListTodo");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
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
        <Text style={styles.title}>Add List</Text>
        <Box>
          <Input
            placeholder="Name"
            marginBottom={5}
            padding={3}
            value={form.name}
            onChangeText={(value) => handleOnChange("name", value)}
          />
          <FormControl maxW="full" marginBottom={5}>
            <Select
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
              <Select.Item label="Study" value="study" />
              <Select.Item label="Home Work" value="homework" />
              <Select.Item label="Workout" value="workout" />
            </Select>
          </FormControl>
          <Input placeholder="Choose Date" marginBottom={5} padding={3} />
          <TextArea placeholder="Description" />
        </Box>
        <Box style={{ paddingHorizontal: 10 }}>
          <Button style={styles.btn} borderRadius={5}>
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
