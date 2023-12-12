// ChatRoomScreen.js
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const ChatRoomScreen = ({ route }) => {
  const { chatName } = route.params;

  const [inputKey, setInputKey] = useState(1); // Add key state
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const flatListRef = useRef();

  useEffect(() => {
    // Simulating initial messages
    setMessages([
      { id: '1', text: 'Hello!', sender: 'User 1' },
      { id: '2', text: 'Hi there!', sender: 'User 2' },
    ]);
  }, []);

  const sendMessage = () => {
    if (inputText.trim() !== '') {
      const newMessage = { id: `${messages.length + 1}`, text: inputText, sender: 'User 1' };
      setMessages([...messages, newMessage]);
      setInputText('');
      setInputKey((prevKey) => prevKey + 1);
      // Scroll to the bottom when a new message is sent
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  const handleKeyPress = (e) => {
    if (e.nativeEvent.key === 'Enter' && !e.nativeEvent.shiftKey) {
      // Prevent default behavior (new line) and send the message
      sendMessage();
    } 
  };

  const renderItem = ({ item }) => (
    <View style={item.sender === 'User 1' ? styles.sentMessage : styles.receivedMessage}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.inputContainer}>
        <TextInput
          key={inputKey}
          style={styles.input}
          placeholder="Type a message..."
          value={inputText}
          onChangeText={(text) => setInputText(text)}
          multiline
          onKeyPress={handleKeyPress}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  messagesContainer: {
    padding: 16,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#E4EFE7',
    borderColor: '#064420',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginVertical: 4,
    maxWidth: '70%',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E4EFE7',
    borderColor: '#064420',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginVertical: 4,
    maxWidth: '70%',
  },
  messageText: {
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#064420',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ChatRoomScreen;