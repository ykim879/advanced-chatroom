import { createStackNavigator } from "@react-navigation/stack";
import ChatRoomScreen from "./ChatRoomScreen";
import ChatListScreen from "./ChatRoomScreen";

const Stack = createStackNavigator();

const ChatStack = () => (
  <Stack.Navigator initialRouteName="ChatList">
    <Stack.Screen name="ChatList" component={ChatListScreen} />
    <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
  </Stack.Navigator>
);

export default ChatStack;
