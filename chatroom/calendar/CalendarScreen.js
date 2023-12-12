// CalendarScreen.js
import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Calendar } from 'react-native-calendars';
import MonthPicker from 'react-native-month-year-picker';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const openPicker = () => {
    setShowPicker(true);
  };

  const closePicker = () => {
    setShowPicker(false);
  };

  const handleDateChange = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || date;

      showPicker(false);
      setDate(selectedDate);
    },
    [date, showPicker],
  );

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={openPicker}>
        <MaterialCommunityIcons name="calendar" size={26} />
      </Pressable>
      <Calendar
        onDayPress={onDayPress}
        monthFormat={'yyyy MM'}
        markedDates={{
          [selectedDate]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: 'blue',
            selectedTextColor: 'white',
          },
        }}
      />
      
    </View>
  );
};
/** Todo
 * {showPicker && (
        <MonthPicker
          value={date}
          onChange={handleDateChange} // Todo: get min date from database
          maxDate={new Date()} // Optional: Set max date to the current date
        />
      )}
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  button: {
    padding: 16,
    alignItems: 'flex-end',
  },
  buttonText: {
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default CalendarScreen;
