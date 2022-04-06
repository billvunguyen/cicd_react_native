import { StyleSheet, View } from "react-native";
import React from "react";
import { Header } from "react-native-elements";
import Export from "../components/Export";

const HeaderStyle = ({ title, print, task, list }) => {
  return (
    <View>
      <Header
        backgroundColor="#fff"
        placement="left"
        centerComponent={{
          text: title,
          style: { color: "#000", fontSize: 28, fontWeight: "bold" },
        }}
        rightComponent={print ? <Export task={task} list={list} /> : null}
      />
    </View>
  );
};

export default HeaderStyle;

const styles = StyleSheet.create({});
