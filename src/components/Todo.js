import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  Alert,
  FlatList,
  Platform,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import HeaderStyle from "../components/HeaderStyle";
import EditModal from "../components/EditModal";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";

import { TokenContext, UsernameContext } from "../context/Context";
import {
  getTasks,
  getTaskLists,
  deleteTaskList,
  createTaskList,
  updateTaskListTitle,
} from "../api/todoApi";
import { styles } from "../styles/styles";

const Todo = ({ navigation }) => {
  const [username, setUsername] = useContext(UsernameContext);
  const [token, setToken] = useContext(TokenContext);
  const [list, setList] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [editInput, setEditInput] = useState("");
  const [editId, setEditId] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    getTaskLists(username, token, setList);
  }, []);

  const deleteHandler = (idTaskList) => {
    Alert.alert("Delete", "Delete this list?", [
      {
        text: "OK",
        onPress: () => {
          deleteTaskList(idTaskList, username, token);
        },
      },
      {
        text: "Cancel",
        styles: "cancel",
      },
    ]);
    getTaskLists(username, token, setList);
  };

  const createHandler = (textInput) => {
    createTaskList(textInput, username, token);
    getTaskLists(username, token, setList);
  };

  const editHandler = (item) => {
    setEditable(true);
    setEditInput(item.title);
    setEditId(item.id);
  };

  const saveHandler = (id, editInput) => {
    updateTaskListTitle(id, editInput, token);
    getTaskLists(username, token, setList);
    setEditable(false);
  };

  const fetchData = () => {
    getTaskLists(username, token, setList);
    setIsFetching(false);
  };

  const onRefresh = () => {
    setIsFetching(true);
    fetchData();
  };

  const RightSwipe = ({ item }) => {
    return (
      <>
        <TouchableOpacity
          style={styles.swipeBox1}
          onPress={() => deleteHandler(item.id)}
        >
          <Feather name="trash" size={20} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.swipeBox2}
          onPress={() => editHandler(item)}
        >
          <Feather name="edit-3" size={20} color="white" />
        </TouchableOpacity>
      </>
    );
  };

  const RenderItem = ({ item }) => {
    return (
      <ScrollView showsHorizontalScrollIndicator={false}>
        <GestureHandlerRootView>
          <Swipeable
            renderRightActions={() => {
              return <RightSwipe item={item} />;
            }}
          >
            <TouchableOpacity
              style={[styles.row, styles.todoList]}
              onPress={() =>
                navigation.push("Details", {
                  idTaskList: item.id,
                  username,
                  token,
                })
              }
            >
              <Text style={styles.content}>{item.title}</Text>
              <Entypo
                style={{ paddingRight: 5 }}
                name="chevron-right"
                size={25}
              />
            </TouchableOpacity>
          </Swipeable>
        </GestureHandlerRootView>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderStyle title="Todo-List" />

      <FlatList
        data={list}
        extraData={list}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 60 }}
        ItemSeparatorComponent={() => {
          return <View style={styles.separator} />;
        }}
        onRefresh={onRefresh}
        refreshing={isFetching}
        renderItem={({ item }) => {
          return <RenderItem item={item} />;
        }}
      />

      <EditModal
        editable={editable}
        setEditable={setEditable}
        editInput={editInput}
        setEditInput={setEditInput}
        saveHandler={() => saveHandler(editId, editInput)}
      />

      <KeyboardAvoidingView
        style={styles.footer}
        enabled
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.inputContainer}>
          <TextInput
            value={textInput}
            placeholder="Add Todo-List"
            onChangeText={(text) => setTextInput(text)}
          />
        </View>
        <TouchableOpacity onPress={() => createHandler(textInput)}>
          <View style={styles.iconContainer}>
            <Entypo name="plus" color="#ec85b1" size={30} />
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Todo;
