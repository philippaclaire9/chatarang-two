import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { FirebaseContext } from '../firebase/firebase-context';
import List from './List';

const ChatPage = () => {
  const [value, onChangeText] = useState('placeholder');
  const [list, setList] = useState([]);
  const Firebase = useContext(FirebaseContext);
  const [shoppingRef, setShoppingRef] = useState();

  useEffect(() => {
    const dbRef = Firebase.getShoppingRef();
    dbRef.on('value', (snapshot) => {
      const data = snapshot.val();
      console.log('data: ', data);
      setList(Object.values(data));
    });
    setShoppingRef(dbRef);

    return () => {
      dbRef.off();
    };
  }, []);

  const handlePress = () => {
    console.log('hello');
    setList((prevState) => [value, ...prevState]);
    shoppingRef.push().set(value);
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
