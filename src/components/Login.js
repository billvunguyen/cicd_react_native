import React, { useState, useContext } from "react";
import { Text, Button, Input } from "react-native-elements";
import { View, StyleSheet, ActivityIndicator } from "react-native";

import { login } from "../api/todoApi";
import { TokenContext, UsernameContext } from "../context/Context";

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(true);

  const [token, setToken] = useContext(TokenContext);
  const [username, setUsername] = useContext(UsernameContext);

  const getLogin = (setToken, setUsername) => {
    setError("");
    if (user == "" || password == "") return;
    setVisible(false);
    login(user, password)
      .then((token) => {
        setUsername(user);
        setToken(token);
      })
      .catch((err) => {
        setError(err.message);
      });
    setVisible(true);
  };

  return (
    <View>
      {visible ? (
        <>
          <View style={styles.container}>
            <Text h2 style={styles.title}>
              Login
            </Text>
            <Input
              label="Username"
              value={user}
              onChangeText={setUser}
              autoCapitalize="none"
              autoCorrect={false}
              onSubmitEditing={() => getLogin(setToken, setUsername)}
            />
            <Input
              label="Password"
              value={password}
              secureTextEntry={true}
              onChangeText={setPassword}
              autoCapitalize="none"
              autoCorrect={false}
              onSubmitEditing={() => getLogin(setToken, setUsername)}
            />
            {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
            <Button
              title="Login"
              onPress={() => getLogin(setToken, setUsername)}
              buttonStyle={{
                backgroundColor: "#ec85b1",
                borderRadius: 30,
                paddingVertical: 12,
              }}
              titleStyle={{
                fontWeight: "bold",
              }}
              containerStyle={{
                padding: 10,
              }}
            />
          </View>
        </>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 25,
  },
  title: {
    margin: 10,
    marginBottom: 30,
    fontWeight: "bold",
  },
  errorMessage: {
    fontSize: 16,
    color: "red",
    padding: 10,
  },
});

export default Login;
