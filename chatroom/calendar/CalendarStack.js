import { createStackNavigator } from "@react-navigation/stack";
import CalendarScreen from "./CalendarScreen";

const Stack = createStackNavigator();

const CalendarStack = () => (
    <Stack.Navigator initialRouteName="Browse Calendar">
    <Stack.Screen name="Browse Calendar" component={CalendarScreen} />
  </Stack.Navigator>
)

export default CalendarStack;