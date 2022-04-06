import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { TokenContext } from "../context/Context";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import IndexScreen from "../screens/IndexScreen";
import DetailsScreen from "../screens/DetailsScreen";
import EditScreen from "../screens/EditScreen";
import AccountScreen from "../screens/AccountScreen";

import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const AuthStack = createNativeStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      options={{ headerShown: false }}
      name="Login"
      component={LoginScreen}
    />
    <AuthStack.Screen
      options={{ headerShown: false }}
      name="Register"
      component={RegisterScreen}
    />
  </AuthStack.Navigator>
);

const TodoListStack = createNativeStackNavigator();
const TodoListStackScreen = () => {
  return (
    <TodoListStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <TodoListStack.Screen name="Index" component={IndexScreen} />
      <TodoListStack.Screen name="Details" component={DetailsScreen} />
      <TodoListStack.Screen name="Edit" component={EditScreen} />
    </TodoListStack.Navigator>
  );
};

const BottomTab = createBottomTabNavigator();
const BottomTabScreen = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#ec85b1",
      }}
    >
      <BottomTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Entypo name="list" color={color} size={size} />
          ),
        }}
        name="Todo List"
        component={TodoListStackScreen}
      />
      <BottomTab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-circle"
              color={color}
              size={size}
            />
          ),
        }}
        name="Account"
        component={AccountScreen}
      />
    </BottomTab.Navigator>
  );
};

export default function Navigation() {
  return (
    <TokenContext.Consumer>
      {([token, setToken]) => (
        <NavigationContainer>
          {token === null ? <AuthStackScreen /> : <BottomTabScreen />}
        </NavigationContainer>
      )}
    </TokenContext.Consumer>
  );
}
