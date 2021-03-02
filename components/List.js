import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatBubble: {
    borderColor: '#c6cdd7',
    borderWidth: 1,
    borderRadius: 7,
    margin: '.2rem',
    overflow: 'hidden',
    shadowColor: '#4a6d88',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {
      height: 4,
      width: 4,
    },
  },
  chatText: {
    paddingVertical: '1rem',
    paddingHorizontal: '2rem',
    backgroundColor: 'white',
  },
});

export default function List({ words, handlePress }) {
  return (
    <View style={styles.container}>
      {words &&
        words.map((item, i) => {
          return (
            <View style={styles.chatBubble}>
              <Text key={i} style={styles.chatText}>
                {item.message}
              </Text>
            </View>
          );
        })}
    </View>
  );
}
