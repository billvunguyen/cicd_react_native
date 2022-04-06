import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    alignItems: "center",
  },

  todoList: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  todoTask: {
    paddingLeft: 20,
    paddingRight: 2,
    paddingVertical: 6,
  },

  contentDone: {
    fontWeight: "bold",
    paddingHorizontal: 10,
    color: "rgba(0, 0, 0, 0.3)",
    textDecorationLine: "line-through",
    fontSize: 16,
  },

  content: {
    fontWeight: "bold",
    paddingHorizontal: 10,
    fontSize: 16,
  },

  footer: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
    backgroundColor: "#fff",
  },

  inputContainer: {
    flex: 1,
    paddingLeft: 25,
  },

  iconContainer: {
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
  },

  deleteIcon: {
    backgroundColor: "#9d85ec",
    width: 60,
    justifyContent: "center",
    alignItems: "center",
  },

  editIcon: {
    backgroundColor: "#96c4ff",
    width: 60,
    justifyContent: "center",
    alignItems: "center",
  },

  separator: {
    height: 1,
    backgroundColor: "#e0e0e0",
  },

  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
  },

  modalContainer: {
    backgroundColor: "#fff",
    marginHorizontal: 30,
    paddingVertical: 30,
    borderRadius: 20,
  },

  textEdit: {
    fontWeight: "bold",
    fontSize: 26,
    marginHorizontal: 30,
  },

  editInput: {
    fontWeight: "bold",
    margin: 30,
    fontSize: 20,
  },
});
