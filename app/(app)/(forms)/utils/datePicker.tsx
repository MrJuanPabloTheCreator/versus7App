import { YStack, Text, Button } from 'components'
import { useLocalSearchParams } from 'expo-router/build/hooks';
import React, { useState } from 'react'
import { getRef } from './refRegistry';

import Calendar from '@components/calendar';

const DatePicker = () => {
  const { refId } = useLocalSearchParams();
  if (typeof refId !== 'string') return <Text>Invalid Ref Id</Text>;

  const refObject = getRef(refId);
  if (!refObject) return <Text>Invalid Ref</Text>;
  const { selectDate } = refObject;

  const [value, setValue] = useState(refObject.date || null)

  const handleSelectDate = (dateSelected: string) => {
    if(dateSelected === value){
      refObject.date = null;
      selectDate(null);
      setValue(null)
    } else {
      refObject.date = dateSelected;
      selectDate(dateSelected);
      setValue(dateSelected)
    }
  };
  

  return (
    <YStack>
      <Calendar handleSelectDate={handleSelectDate} handleDateSelected={refObject.date}/>
    </YStack>
  )
}

export default DatePicker


{/* <Button type={value === '1' ? 'active':'default' } text={'select 1'} onPress={() => handleSelectDate('1')}/>
      <Button type={value === '2' ? 'active':'default' } text={'select 2'} onPress={() => handleSelectDate('2')}/> */}