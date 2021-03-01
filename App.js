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
  

  useEffect(() => {
      const itemsRef = firebaseApp.database().ref('shopping');
      itemsRef.on('value', (snapshot) => {
        const data = snapshot.val()
        console.log('data: ', data)
        setList(Object.values(data))
      })

      return () => {
        itemsRef.off();
      }
  }, [])

  const handlePress = () => {
    console.log('hello');
    setList((prevState) => [value, ...prevState]);
    const newListRef = firebaseApp
      .database()
      .ref(`shopping`)
    const newPostRef = newListRef.push()
    newPostRef.set(value)
  };

  const handleTextChange = (newWord) => {
    onChangeText(newWord);
  };

  return (
    <View style={styles.container}>
      <Text>Chatarang</Text>
      <List words={list} handlePress={handlePress} />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={handleTextChange}
        value={value}
      />
      <Text>The current word: {value}</Text>

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
