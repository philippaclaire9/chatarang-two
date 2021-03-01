import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { FirebaseContext } from '../firebase/firebase-context';
import List from './List';
import firebase from 'firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const ChatPage = () => {
  const [value, onChangeText] = useState('placeholder');
  // const [dbRef, setDbRef] = useState(null);
  const [chats, setChats] = useState([]);
  // [{uid: "", sent_at: 123, message: ""}]
  const Firebase = useContext(FirebaseContext);

  const dbRef = Firebase.getDbRef().collection('chats');
  const query = dbRef.orderBy('sent_at');
  const [messages, loading, error] = useCollectionData(query, {
    idField: 'uid',
  });

  // useEffect(() => {
  //   const dbRef = Firebase.getDbRef();
  //   setDbRef(dbRef);
  //   dbRef.collection('chats').onSnapshot((querySnapshot) => {
  //     querySnapshot.forEach((chat) => {
  //       console.log(chat.data());
  //       setChats((currentChats) => [chat.data(), ...currentChats]);
  //     });
  //   });
  // }, []);

  const handlePress = () => {
    const chatObj = {
      message: value,
      sent_at: firebase.firestore.FieldValue.serverTimestamp(),
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
      <List words={messages} handlePress={handlePress} />
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
