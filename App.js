import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import ChatPage from './components/ChatPage';
import { FirebaseProvider } from './firebase/firebase-context';
import Firebase from './firebase/firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  useAuthState,
  useSignInWithEmailAndPassword,
  useCreateUserWithEmailAndPassword,
} from 'react-firebase-hooks/auth';
import HomeScreen from './components/HomeScreen';

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#d5d9e0',
  },
});

const Stack = createStackNavigator();

const ChatScreen = (props) => (
  <View style={styles.app}>
    <ChatPage {...props} />
  </View>
);

const authRef = Firebase.getAuth();

export default function App() {
  const [user, setUser] = useState(null);
  const [displayNameInput, setDisplayNameInput] = useState('');
  // needed??
  // const [user] = useAuthState(authRef);
  useEffect(() => {
    authRef.onAuthStateChanged((user) => {
      //console.log(user);
      setUser(user);
    });
  }, []);
  ////////////
  // sign up
  //
  const [
    createUser,
    newUser,
    signUpLoading,
    signUpError,
  ] = useCreateUserWithEmailAndPassword(authRef);
  const emailSignUp = (email, password) => {
    createUser(email, password);
  };

  //////////
  // sign in
  //
  const [
    signInUser,
    existingUser,
    signInLoading,
    signInError,
  ] = useSignInWithEmailAndPassword(authRef);

  const emailSignIn = (email, password) => {
    signInUser(email, password);
  };

  ////////
  // sign out
  //

  const emailSignOut = () => {
    authRef.signOut();
  };

  if (newUser) {
    newUser.user.updateProfile({ displayName: displayNameInput });
  }
  return (
    <FirebaseProvider value={Firebase}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: true }}>
          {!user ? (
            <Stack.Screen name="Home">
              {(props) => (
                <HomeScreen
                  {...props}
                  signIn={emailSignIn}
                  signUp={emailSignUp}
                  signUpError={signUpError}
                  signInError={signInError}
                  setDisplayName={setDisplayNameInput}
                />
              )}
            </Stack.Screen>
          ) : (
            <Stack.Screen
              name="Chat"
              options={{
                title: 'chaterang',
                headerRight: () => {
                  return <Button title="Sign out" onPress={emailSignOut} />;
                },
              }}
            >
              {(props) => {
                return <ChatScreen {...props} currentUser={user} />;
              }}
            </Stack.Screen>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </FirebaseProvider>
  );
}

// function SignInButton() {
//   return <Button title="Sign with Google" onPress={emailSignIn} />;
// }
