import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Welcome to the Who's Down app!</Text>
      <Text>This is Aarish</Text>
      <Text>This is Anjali!</Text>
      <Text>This is Arjun :D</Text>
      <Text>This is Musab</Text>
      <Text>This is Sihao</Text>
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
