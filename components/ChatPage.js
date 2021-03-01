import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { FirebaseContext } from '../firebase/firebase-context';
import List from './List';
import firebase from 'firebase';

const ChatPage = () => {
  const [value, onChangeText] = useState('placeholder');
  const [dbRef, setDbRef] = useState(null);
  const [chats, setChats] = useState([]);
  // [{uid: "", sent_at: 123, message: ""}]
  const Firebase = useContext(FirebaseContext);

  useEffect(() => {
    const dbRef = Firebase.getDbRef();
    setDbRef(dbRef);
    dbRef
      .collection('chats')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((chat) => {
          setChats((currentChats) => [chat.data(), ...currentChats]);
        });
      });
  }, []);

  const handlePress = () => {
    const chatObj = {
      message: value,
      sent_at: firebase.database.ServerValue.TIMESTAMP,
      uid: 'philippa&doug',
    };
    setChats((prevState) => [chatObj, ...prevState]);
    dbRef.collection('chats').add(chatObj);
  };

  const handleTextChange = (newWord) => {
    onChangeText(newWord);
  };

  return (
    <View style={styles.container}>
      <Text>Chatarang</Text>
      <List words={chats} handlePress={handlePress} />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={handleTextChange}
        value={value}
      />
      <Text>The current word: {value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChatPage;
