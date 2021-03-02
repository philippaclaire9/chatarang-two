import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#d5d9e0',
    alignItems: 'center',
  },
  signInWrapper: {
    width: '80%',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 7,
  },
  form: {
    // alignItems: 'center',
  },
});

const HomeScreen = ({ navigation, signIn, signUp }) => {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const handleSignUp = () => {
    console.log('signing up...');
    console.log(emailInput, passwordInput);
    // if (emailInput && passwordInput) {
    signUp(emailInput, passwordInput);
    // }
  };

  const handleSignIn = () => {
    if (emailInput && passwordInput) {
      signIn(emailInput, passwordInput);
    }
  };

  return (
    <View style={styles.app}>
      <View style={styles.signInWrapper}>
        <Text style={{ alignSelf: 'center' }}>Welcome to our app :) 👯‍♀️</Text>
        <View style={styles.form}>
          <Text>Email:</Text>
          <TextInput style={styles.textInput} onTextInput={setEmailInput} />
          <Text>Password:</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.textInput}
            onTextInput={setPasswordInput}
          />
        </View>
        <View>
          <Button title="Sign in" onPress={handleSignIn} />
          <Button title="Sign up" onPress={handleSignUp} />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
