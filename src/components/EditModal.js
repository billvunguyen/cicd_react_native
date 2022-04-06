import {Text, View, Modal, TextInput} from 'react-native';
import React from 'react';
import {Button} from 'react-native-elements';
import {styles} from '../styles/styles';

const EditModal = ({
  editable,
  setEditable,
  saveHandler,
  editInput,
  setEditInput,
  initialValue,
}) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={editable}
      onRequestClose={() => setEditable(true)}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.textEdit}>Edit list</Text>
          <TextInput
            style={styles.editInput}
            value={initialValue}
            onChangeText={text => setEditInput(text)}
            defaultValue={editInput}
            editable={true}
            multiline={false}
          />
          <Button
            title="Save"
            onPress={saveHandler}
            buttonStyle={{
              backgroundColor: '#fff',
              borderRadius: 50,
              paddingVertical: 12,
              backgroundColor: '#96c4ff',
            }}
            titleStyle={{
              fontWeight: 'bold',
            }}
            containerStyle={{
              paddingHorizontal: 30,
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default EditModal;
