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

const HomeScreen = ({
  navigation,
  signIn,
  signUp,
  signInError,
  signUpError,
  setDisplayName,
}) => {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [hasAccount, setAccountStatus] = useState(true);

  const handleSignUp = () => {
    if (emailInput && passwordInput) {
      signUp(emailInput, passwordInput);
    }
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
        {hasAccount ? (
          <View style={styles.form}>
            <Text>Email:</Text>
            <TextInput style={styles.textInput} onChangeText={setEmailInput} />
            <Text>Password:</Text>
            <TextInput
              secureTextEntry={true}
              style={styles.textInput}
              onChangeText={setPasswordInput}
            />
            <Button title="Sign in" onPress={handleSignIn} />
            <Text>Don't have an account? Sign up below</Text>
            <Button
              title="Create account"
              onPress={() => {
                setAccountStatus(false);
              }}
            />
          </View>
        ) : (
          <View style={styles.form}>
            <Text>Email:</Text>
            <TextInput style={styles.textInput} onChangeText={setEmailInput} />
            <Text>Password:</Text>
            <TextInput
              secureTextEntry={true}
              style={styles.textInput}
              onChangeText={setPasswordInput}
            />

            <Text>Display name:</Text>
            <TextInput style={styles.textInput} onChangeText={setDisplayName} />
            <Button title="Sign up" onPress={handleSignUp} />
          </View>
        )}

        <View></View>
        <Text style={{ color: 'red' }}>
          {signInError && signInError.message}
        </Text>
      </View>
    </View>
  );
};

export default HomeScreen;
