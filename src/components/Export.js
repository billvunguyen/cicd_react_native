import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Export = ({ task, list }) => {
  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({
      html: createDynamicTable(),
    });
    // console.log("File has been saved to:", uri);
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };

  const createDynamicTable = () => {
    let title = ``;
    list.map((value, index) => {
      return (title += `<h1>${value.title}</h1>`);
    });

    let content = ``;
    task.map((value, index) => {
      if (value.done)
        content += `
          <li>
            <label>
              <input type="checkbox" checked>
              <p>${value.content}</p>
            </label>  
          </li>
      `;
      else
        content += `
        <li>
          <label>
            <input type="checkbox">
            <p>${value.content}</p>
          </label>  
        </li>`;
      return content;
    });

    let html = `
    <!DOCTYPE html>
    <html>
      <head>
      <style>
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        *{
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }
        .container{
          max-width: 405px;
          padding: 28px 0 30px;
          margin: 137px auto;
          background: #fff;
          border-radius: 7px;
        }
        .container h1{
          font-size: 30px;
          font-weight: 700;
          text-align: center;
        }
        .todoList{
          margin-top: 20px;
          margin-right: 5px;
          padding: 0 20px 10px 25px;
        }
        .todoList li{
          list-style: none;
          font-size: 17px;
          margin-bottom: 18px;
          padding-bottom: 16px;
          align-items: flex-start;
          border-bottom: 1px solid #ccc;
        }
        .todoList li:last-child{
          margin-bottom: 0;
          border-bottom: 0;
          padding-bottom: 0;
        }
        .todoList li label{
          display: flex;
          align-items: flex-start;
        }
        .todoList li label input{
          margin-top: 7px;
          accent-color: #3C87FF;
        }
        .todoList li label p{
          margin-left: 12px;
          word-wrap: break-word;
        }

      </style>
    </head>
    <body>
      <div class="container">
        ${title}
        <ul class="todoList">
          ${content}
        </ul>
      <div>
    </body>
    </html>
    `;

    return html;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={printToFile}>
        <MaterialCommunityIcons
          name="export-variant"
          size={30}
          color="#9d85ec"
        />
      </TouchableOpacity>
    </View>
  );
};

export default Export;

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
  },
});
