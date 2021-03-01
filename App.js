import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import firebase from 'firebase';
import { firebaseConfig } from './config';
import List from './components/List';

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default function App() {
  const [value, onChangeText] = useState('placeholder');
  const [list, setList] = useState([]);
  const [items, setItems] = useState();

  const itemsRef = firebaseApp.database().ref();

  // const listenForItems = (itemsRef) => {
  //   itemsRef.on('value', (snap) => {
  //     console.log(snap);
  //     const itemsArray = [];
  //     snap.forEach((child) => {
  //       itemsArray.push({
  //         title: child.val().title,
  //         key: child.key,
  //       });
  //     });

  //     setItems(itemsArray);
  //   });
  // };

  // const writeWords = (value) => {

  //};

  const handlePress = () => {
    console.log('hello');
    setList((prevState) => [value, ...prevState]);
    firebaseApp
      .database()
      .ref(`shopping/${list.length + 1}`)
      .set(`${value}`);
  };

  const handleTextChange = (newWord) => {
    onChangeText(newWord);
  };

  return (
    <View style={styles.container}>
      <Text>Test test test</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={handleTextChange}
        value={value}
      />
      <Text>The current word: {value}</Text>

      <List words={list} handlePress={handlePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
