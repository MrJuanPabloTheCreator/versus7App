import React, { useState } from 'react'

import { View } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import Text from './text'
import XStack from './xstack'
import Button from './button'
import useTheme from 'contexts/ThemeContext/useTheme';

interface CalendarProps {
    handleSelectDate: (dateSelected: string) => void;
    handleDateSelected: string | null
}

const Calendar:React.FC<CalendarProps> = ({ handleSelectDate, handleDateSelected }) => {
    const currentDate = new Date()
    const [selectedDate, setSelectedDate] = useState(handleDateSelected ? new Date(handleDateSelected) : currentDate)
    const [selectedMonth, setSelectedMonth] = useState(currentDate)
    const { themeConstants } = useTheme();

    const handleSelect = (day: number) => {
        const newDateSelected = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), day);
        handleSelectDate(newDateSelected.toISOString())
        setSelectedDate(newDateSelected)
    }

    const handleMonthChange = (number: number) => {
        const newDate = new Date(selectedMonth);
        newDate.setMonth(newDate.getMonth() + number);
        setSelectedMonth(newDate)
    }

    const getDaysOfTheMonth = () => {
        const lastDay = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0);
        return lastDay.getDate()
    }

    const getFirstDayOfMonth = () => {
        const firstDay = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1).getDay();
        return firstDay === 0 ? 7 : firstDay;
    };

    const firstDayOfMonth = getFirstDayOfMonth();

    const isDayDisabled = (day: number) => {
        const today = new Date();
        const dateToCheck = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), day);
        return dateToCheck.getTime() < today.setHours(0, 0, 0, 0);
    };

    const isSelectedDay = (day: number) => {
        return selectedDate.getFullYear() === selectedMonth.getFullYear() &&
               selectedDate.getMonth() === selectedMonth.getMonth() &&
               selectedDate.getDate() === day;
    };

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const days = Array.from({ length: getDaysOfTheMonth() }, (_, i) => i + 1);

    return (
        <View style={{ padding: 8, gap: 8 }}>
            <XStack style={{ justifyContent: 'space-between', paddingHorizontal: 4 }}>
                <Button fitContent style={{ paddingHorizontal: 12, paddingVertical: 12 }} disabled={selectedMonth.getMonth() - 1 < new Date().getMonth()} onPress={() => handleMonthChange(-1)}>
                    <MaterialIcons name="arrow-back-ios" size={22} color={themeConstants.colors.text} />
                </Button>
                <Text style={{ fontSize: 24 }}>{selectedMonth.toLocaleString('en-US', { year: 'numeric', month: 'long' })}</Text>
                <Button fitContent style={{ paddingHorizontal: 12, paddingVertical: 12}} onPress={() => handleMonthChange(1)}>
                    <MaterialIcons name="arrow-forward-ios" size={22} color={themeConstants.colors.text} />
                </Button>
            </XStack>
            <XStack>
                {weekDays.map((day, index) => (
                    <Text style={{ width: '14.2%', fontSize: 20, textAlign: 'center' }} key={index}>{day}</Text>
                ))}
            </XStack>
            <XStack style={{ flexWrap: 'wrap', justifyContent: 'flex-start'}}>
                {firstDayOfMonth < 7 && Array.from({ length: firstDayOfMonth }, (_, i) => i + 1).map((day) => (
                    <View style={{ width: '14.2%', padding: 2 }} key={day}>
                        <Button text={''} disabled={true} style={{ paddingHorizontal: 0, backgroundColor: 'transparent' }}/> 
                    </View>
                ))}
                {days.map((day) => (
                    <View style={{ width: '14.2%', padding: 2 }} key={day}>
                        <Button 
                            text={String(day)} 
                            style={{ paddingHorizontal: 0 }} 
                            type={isSelectedDay(day) ? 'active':'default'}
                            textStyle={isDayDisabled(day) ? { color: 'gray'} : {}} 
                            disabled={isDayDisabled(day)}
                            onPress={() => handleSelect(day)}
                        /> 
                    </View>
                ))}
            </XStack>
        </View>
    )
}

export default Calendar