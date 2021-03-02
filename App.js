import React from 'react';
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
  const [user] = useAuthState(authRef);
  const [
    createUser,
    emailUser,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(authRef);
  const emailSignUp = (email, password) => {
    console.log('getting ready to create user...');
    console.log(useCreateUserWithEmailAndPassword);

    console.log('creating user...');
    createUser(email, password);
  };

  if (emailUser) {
    emailUser.user.updateProfile({ displayName: 'Dough' });
  }

  const emailSignIn = (email, password) => {
    // const provider = Firebase.getAuthProvider();
    // console.log(provider);
    // authRef.signInWithPopup(provider);
  };

  const emailSignOut = () => {
    authRef.signOut();
  };

  return (
    <FirebaseProvider value={Firebase}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: true }}>
          {!emailUser ? (
            <Stack.Screen name="Home">
              {(props) => (
                <HomeScreen
                  {...props}
                  signIn={emailSignIn}
                  signUp={emailSignUp}
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
                return <ChatScreen {...props} currentUser={emailUser} />;
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
