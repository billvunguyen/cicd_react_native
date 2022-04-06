import {
  Text,
  View,
  Alert,
  FlatList,
  Platform,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderStyle from "../components/HeaderStyle";
import EditModal from "../components/EditModal";

import Icon from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";

import {
  getTasks,
  getTaskListName,
  deleteTask,
  createTask,
  updateTaskStatus,
  updateTaskContent,
} from "../api/todoApi";
import { CheckBox } from "react-native-elements";
import { styles } from "../styles/styles";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const DetailsScreen = ({ route, navigation }) => {
  const [task, setTask] = useState([]);
  const [list, setList] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [editable, setEditable] = useState(false);
  const [editInput, setEditInput] = useState("");
  const [editId, setEditId] = useState("");
  const { idTaskList, username, token } = route.params;
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    getTasks(idTaskList, username, token, setTask);
    getTaskListName(idTaskList, token, setList);
  }, []);

  const deleteHandler = (idTask) => {
    Alert.alert("Delete", "Delete this task?", [
      {
        text: "OK",
        onPress: () => {
          deleteTask(idTask, username, token);
        },
      },
      {
        text: "Cancel",
        styles: "cancel",
      },
    ]);
    getTasks(idTaskList, username, token, setTask);
  };

  const fetchData = () => {
    getTasks(idTaskList, username, token, setTask);
    setIsFetching(false);
  };

  const onRefresh = () => {
    setIsFetching(true);
    fetchData();
  };

  const createHandler = (textInput) => {
    createTask(textInput, idTaskList, token);
    getTasks(idTaskList, username, token, setTask);
  };

  const updateStatusHandler = (item) => {
    updateTaskStatus(item.id, !item.done, token);
    getTasks(idTaskList, username, token, setTask);
  };

  const editHandler = (item) => {
    setEditable(true);
    setEditInput(item.content);
    setEditId(item.id);
  };

  const saveHandler = (id, editInput) => {
    updateTaskContent(id, editInput, token);
    getTasks(idTaskList, username, token, setTask);
    setEditable(false);
  };

  const RightSwipe = ({ item }) => {
    return (
      <>
        <TouchableOpacity
          style={styles.deleteIcon}
          onPress={() => deleteHandler(item.id)}
        >
          <Feather name="trash" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.editIcon}
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
            <View style={[styles.row, styles.todoTask]}>
              {item.done ? (
                <Text style={styles.contentDone}>{item.content}</Text>
              ) : (
                <Text style={styles.content}>{item.content}</Text>
              )}
              <CheckBox
                checked={item.done}
                onPress={() => updateStatusHandler(item)}
                checkedColor="#ec85b1"
              />
            </View>
          </Swipeable>
        </GestureHandlerRootView>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderStyle title="Todo-Tasks" print={true} task={task} list={list} />

      <FlatList
        data={task}
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

      <View style={styles.footer}>
        <TouchableOpacity>
          <View style={styles.iconContainer}>
            <Icon name="add" color="white" size={30} />
          </View>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={styles.footer}
        enabled
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.inputContainer}>
          <TextInput
            value={textInput}
            placeholder="Add Todo-Task"
            onChangeText={setTextInput}
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

export default DetailsScreen;
