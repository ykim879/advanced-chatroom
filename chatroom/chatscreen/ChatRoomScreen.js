// ChatRoomScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChatRoomScreen = ({ route }) => {
  //const { chatName } = route.params;

  return (
    <View style={styles.container}>
      <Text>Chat Room</Text>
      {/* Add your chatroom component here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatRoomScreen;
