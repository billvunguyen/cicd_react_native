import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import React from "react";
import Login from "../components/Login";

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Login />

      <TouchableOpacity onPress={() => navigation.push("Register")}>
        <Text style={styles.link}>Don't have an account? Register instead</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: 180,
    backgroundColor: "#fff",
  },
  link: {
    marginLeft: 35,
  },
});
