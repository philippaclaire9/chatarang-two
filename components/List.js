import React from 'react';
import { View, Text, Button } from 'react-native';

export default function List(props) {
  console.log(props);
  return (
    <View>
      {props.words.map((item, i) => {
        return <Text key={i}>{item}</Text>;
      })}
      <Button title="Press Me" onPress={props.handlePress} />
    </View>
  );
}
