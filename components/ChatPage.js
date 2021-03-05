import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { FirebaseContext } from '../firebase/firebase-context';
import List from './List';
import firebase from 'firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const ChatPage = (props) => {
  const [value, onChangeText] = useState('');
  // [{displayName: "", uid: "", sent_at: 123, message: ""}]
  const Firebase = useContext(FirebaseContext);

  const dbRef = Firebase.getDbRef().collection('chats');
  const query = dbRef.orderBy('sent_at');
  const [messages, loading, error] = useCollectionData(query, {
    idField: 'uid',
  });

  const handlePress = () => {
    console.log(props.currentUser.displayName);
    const chatObj = {
      message: value,
      sent_at: firebase.firestore.FieldValue.serverTimestamp(),
      displayName: props.currentUser.displayName,
      uid: props.currentUser.uid,
    };
    dbRef.doc().set(chatObj);
    onChangeText('');
  };

  const handleTextChange = (newWord) => {
    onChangeText(newWord);
  };

  return (
    <View style={styles.container}>
      <List words={messages} />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={handleTextChange}
          value={value}
        />
        <Button style={styles.sendButton} title="Send" onPress={handlePress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
    borderBottomLeftRadius: 7,
    borderTopLeftRadius: 7,
  },
  sendButton: {
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    overflow: 'hidden',
  },
});

export default ChatPage;
