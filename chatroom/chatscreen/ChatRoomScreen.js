// ChatRoomScreen.js
import { onSnapshot, query, collection, orderBy, addDoc } from "firebase/firestore";
import React, { useState, useRef, useLayoutEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { database } from "../config/firebase";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Modal } from "react-native";
import AddPictureScreen from "./AddPictureScreen";

const ChatRoomScreen = ({ route }) => {
  const { chatName } = route.params;

  const [inputKey, setInputKey] = useState(1); // Add key state
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  const flatListRef = useRef();

  //Todo: data modeling
  useLayoutEffect(() => {
    const collectionRef = collection(database, "mockChats");
    const q = query(collectionRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          _id: doc.id,
          createdAt: doc.data().createdAt,
          text: doc.data().text,
          sender: doc.data().sender,
        }))
      );
    });
    return () => unsubscribe();
  }, []);

  const sendMessage = () => {
    if (inputText.trim() !== "") {
      const newMessage = {
        _id: `${messages.length + 1}`,
        text: inputText,
        sender: "User 1",
        createdAt: new Date().toUTCString(),
      };
      setMessages([...messages, newMessage]);
      addDoc(collection(database, "mockChats"), {...newMessage});
      setInputText("");
      setInputKey((prevKey) => prevKey + 1);
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }

  // handle to submit message when user pressed enter without shiftKey.
  const handleKeyPress = useCallback((e) => {
    if (e.nativeEvent.key === "Enter" && !e.nativeEvent.shiftKey) {
      sendMessage();
    }
  });

  const renderItem = ({ item }) => (
    <View
      style={
        item.sender === "User 1" ? styles.sentMessage : styles.receivedMessage
      }
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <Modal visible={isModalVisible} style={styles.modal} transparent={true}>
        <AddPictureScreen onClose={toggleModal}
        />
      </Modal>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
        inverted
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
        <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
          <MaterialCommunityIcons name="image-plus" size={15} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendButton}  onPress={toggleModal}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  messagesContainer: {
    padding: 16,
  },
  sentMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#E4EFE7",
    borderColor: "#064420",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginVertical: 4,
    maxWidth: "70%",
  },
  receivedMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#E4EFE7",
    borderColor: "#064420",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginVertical: 4,
    maxWidth: "70%",
  },
  messageText: {
    color: "black",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 5,
    maxHeight: 100,
  },
  addButton: {
    backgroundColor: "#B2C8BA",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  sendButton: {
    backgroundColor: "#064420",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modal: {
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
});

export default ChatRoomScreen;
