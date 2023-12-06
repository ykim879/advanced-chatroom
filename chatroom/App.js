import { StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CalendarScreen from "./calendar/CalendarScreen";
import { NavigationContainer } from '@react-navigation/native';
import ChatStack from "./chatscreen/ChatStack";

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="ChatStack"
        activeColor="#e91e63"
        barStyle={{ backgroundColor: "tomato" }}
      >
        <Tab.Screen
          name="ChatStack"
          component={ChatStack}
          options={{
            tabBarLabel: "ChatStack",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="chat-processing" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{
            tabBarLabel: "Calendar",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="calendar" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
