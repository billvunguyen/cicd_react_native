import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import React from "react";
import Register from "../components/Register";

const RegisterScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Register />

      <TouchableOpacity onPress={() => navigation.push("Login")}>
        <Text style={styles.link}>Already have an account?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: 100,
    backgroundColor: "#fff",
  },
  link: {
    marginLeft: 35,
  },
});
