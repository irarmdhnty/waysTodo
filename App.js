import React from "react";
import { NativeBaseProvider } from "native-base";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";

import { Main } from "./src/screen/Main";
import Login from "./src/screen/Login";
import Register from "./src/screen/Register";
import ListTodo from "./src/screen/ListTodo";
import AddList from "./src/screen/AddList";
import AddCategory from "./src/screen/AddCategory";
import DetailList from "./src/screen/DetailList";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabel: () => {
          return null;
        },
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name == "ListTodo") {
            iconName = focused ? "bookmarks" : "bookmarks-outline";
            return <Ionicons name={iconName} size={25} color="pink" />;
          } else if (route.name == "AddCategory") {
            iconName = focused ? "document-text" : "document-text-outline";
            return <Ionicons name={iconName} size={25} color="pink" />;
          } else if (route.name == "AddList") {
            iconName = focused ? "list" : "list-outline";
            return <Ionicons name={iconName} size={25} color="pink" />;
          }
        },
      })}
    >
      <Stack.Screen name="ListTodo" component={ListTodo} />
      <Stack.Screen name="AddCategory" component={AddCategory} />
      <Stack.Screen name="AddList" component={AddList} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={Main}
            options={{
              title: "Main",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: "Login",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              title: "Register",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ListTodo"
            component={MainTab}
            options={{
              title: "ListToDo",
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
