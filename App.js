import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import ChatPage from './components/ChatPage';
import List from './components/List';
import { FirebaseProvider } from './firebase/firebase-context';
import Firebase from './firebase/firebase';

export default function App() {
  return (
    <FirebaseProvider value={Firebase}>
      <View>
        <ChatPage />
      </View>
    </FirebaseProvider>
  );
}
