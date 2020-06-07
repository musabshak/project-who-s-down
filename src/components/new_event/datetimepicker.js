/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { Button, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

function customFormatTime(date) {
  const hours = date.getHours() === 0 ? '12' : date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
  const ampm = date.getHours() < 12 ? 'AM' : 'PM';
  const formattedTime = `${hours}:${minutes} ${ampm}`;
  return formattedTime;
}

function customFormatDate(date) {
  return date.toDateString().split(' ').slice(0, -1).join(' ');
}

const DTPicker = (props) => {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');

  
  const showDatepicker = () => {
    setShow(true);
    setMode('date'); 
  };
    
  const showTimepicker = () => {
    setShow(true);
    setMode('time'); 
  };
  
  const handleConfirmOrCancel = (selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    console.log(currentDate);
    console.log(customFormatDate(currentDate));
    console.log(customFormatTime(currentDate));
    console.log('--------------');
  };
 

  return (
    <View>
      <View style={{height: 70}} />
      <Button title="Show Date Picker"
        onPress={showDatepicker}
      />
      <Button title="Show Time Picker"
        onPress={showTimepicker}
      />
      <DateTimePickerModal
        date={date}
        mode={mode}
        isVisible={show}
        onConfirm={handleConfirmOrCancel}
        onCancel={handleConfirmOrCancel}
      />
    </View>
  );
};

export default DTPicker;