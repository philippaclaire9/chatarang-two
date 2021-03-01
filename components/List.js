import React from 'react';
import { View, Text, Button } from 'react-native';

export default function List({ words, handlePress }) {
  return (
    <View>
      {words.map((item, i) => {
        return <Text key={i}>{item}</Text>;
      })}
      <Button title="Press Me" onPress={handlePress} />
    </View>
  );
}
