import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import HeaderStyle from "../components/HeaderStyle";
import { TokenContext } from "../context/Context";
import { Button } from "react-native-elements";
import { UsernameContext } from "../context/Context";

const AccountScreen = ({ navigation }) => {
  const [username, setUsername] = useContext(UsernameContext);
  const [token, setToken] = useContext(TokenContext);

  return (
    <View style={styles.container}>
      <HeaderStyle title="Account" />
      <Text style={styles.username}>Hello {username}!</Text>

      <Button
        title="Log out"
        onPress={() => setToken(null)}
        buttonStyle={{
          backgroundColor: "#fff",
          borderRadius: 50,
          paddingVertical: 12,
          backgroundColor: "#9d85ec",
        }}
        titleStyle={{
          fontWeight: "bold",
        }}
        containerStyle={{
          paddingHorizontal: 30,
        }}
      />
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  username: {
    fontWeight: "bold",
    fontSize: 28,
    margin: 30,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
