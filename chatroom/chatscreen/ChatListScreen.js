// ChatListScreen.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { chatListData } from './MockChatsData';

const ChatListScreen = ({ navigation }) => {

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style = {styles.chat_list_item_container}
      onPress={() => navigation.navigate('ChatRoom', { chatId: item.id, chatName: item.name })}
    >
      <Image style = {styles.chat_list_item_image} source={{uri: item.image}}></Image>
      <View>
        <Text style = {styles.chat_list_item_text}>{item.name}</Text>
        <Text style = {styles.chat_list_item_preview}>{item.preview}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={chatListData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16, // Add horizontal padding
    
    borderRadius: 8, // Add border radius
    marginVertical: 4, // Add vertical margin
    borderBottomWidth: 1,
    width: '95%'
  },
  chat_list_item_container: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    paddingVertical: 5,
    paddingHorizontal: 16, // Add horizontal padding
    borderRadius: 8, // Add border radius
    marginVertical: 4, // Add vertical margin
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#FDFAF6',
  },
  chat_list_item_image: {
    width:50,
    height: 50,
    borderRadius: 25
  },
  chat_list_item_text: {
    fontSize: 14,
    marginLeft: 10,
    fontWeight: "600"
  },
  chat_list_item_preview: {
    fontSize: 14,
    marginLeft: 10,
    color: "grey"
  }
});

export default ChatListScreen;
