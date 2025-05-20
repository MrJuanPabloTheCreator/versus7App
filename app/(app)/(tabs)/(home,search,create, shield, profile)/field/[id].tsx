import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { Button, Text, View, XStack, YStack } from 'components';
import { facilities, fakeSchedules } from 'constants/fakeData';
import useTheme from 'contexts/ThemeContext/useTheme';

const Field = () => {
    const { id } = useLocalSearchParams();
    const { themeConstants } = useTheme();

    const googleKey = process.envl.EXPO_PUBLIC_GOOGLE_API_KEY

    const router = useRouter();

    if (typeof id !== 'string') return null;

    const facility = facilities.find((facility) => facility.facility_id === id);

    if (!facility) return <Text>Facility not found</Text>;

    const [dates, setDates] = useState<Date[]>([])
    const today = new Date();
    const [selectedDate, setSelectedDate] = useState(today)

    const getLabel = ({ date, index }: {date: Date, index: number}) => {
        const isWithinSevenDays = (date.getTime() <= new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000).getTime());

        const label = isWithinSevenDays 
            ? (index === 0 ? 'Today' : date.toLocaleString('default', { weekday: 'short' }))
            : date.toLocaleString('default', { month: 'short' });
        return label
    }

  useEffect(() => {
    const twoMonthsLater = new Date(today); 
    twoMonthsLater.setMonth(today.getMonth() + 2);

    const datesArray = [];
  
    for (let d = new Date(today); d <= twoMonthsLater; d.setDate(d.getDate() + 1)) {
        datesArray.push(new Date(d));
    }

    setDates(datesArray)
  }, [])
  

  const { x, y } = facility.coordinates;
  const mapURL = `https://maps.googleapis.com/maps/api/staticmap?size=600x400&zoom=15&markers=color:red|${x},${y}&key=${googleKey}&style=element:all|invert_lightness:true|visibility:on|color:#1c1c1c`;

  return (
    <ScrollView style={[styles.container, { backgroundColor: themeConstants.colors.background }]}>
        <Image
            style={{ width: '100%', height: 200 }}
            source={{ uri: facility.pictures[0] }}
        />
        <TouchableOpacity 
            onPress={() => router.back()} 
            style={{ 
                width: 36, height: 36,
                backgroundColor: themeConstants.colors.background, borderRadius: 28,
                position: 'absolute', top: 48, left: 12, 
                display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
        >
            <MaterialIcons name="arrow-back-ios" size={24} color={themeConstants.colors.primary} style={{ position: 'absolute', left: 10 }}/>
        </TouchableOpacity>
        <YStack style={{ padding: 12, alignItems: 'flex-start'}}>
            <Text style={{ fontSize: 24, fontWeight: 500 }}>{facility.name}</Text>
            <Text style={{ fontSize: 14, color: 'grey' }}>{facility.address}</Text>
        </YStack>
        <YStack>
            <ScrollView horizontal>
                <XStack style={{ paddingLeft: 12, gap: 8 }}>
                    {dates.map((date, index) => (
                        <TouchableOpacity 
                            key={index}
                            onPress={() => setSelectedDate(date)}
                            style={[
                                { 
                                    borderWidth: 2, display: 'flex', justifyContent: 'center',
                                    backgroundColor: themeConstants.colors.secondary, width: 68, 
                                    height: 90, borderRadius: 36, alignItems: 'center',
                                    borderColor: selectedDate.getTime() === date.getTime() ? themeConstants.colors.primary : themeConstants.colors.background,
                                },
                            ]}
                        >
                            <Text style={{ fontSize: 24, fontWeight: 700, color: (selectedDate.getTime() === date.getTime())
                                    ? themeConstants.colors.primary
                                    : 'white'
                                }}>{date.getDate()}</Text>
                            <Text 
                                style={{ fontWeight: 400, color: (selectedDate.getTime() === date.getTime() || index === 0)
                                    ? themeConstants.colors.primary
                                    : 'white'
                                }}
                            >
                                {getLabel({ date, index })}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </XStack>
            </ScrollView>
            <XStack style={{ flexWrap: 'wrap', padding: 8}}>    
                {fakeSchedules.map((time, index) => (
                    <View key={index} style={{ width: '33.33%', flex: 0, padding: 4 }}>
                        <TouchableOpacity 
                            style={{ 
                                backgroundColor: themeConstants.colors.secondary, display: 'flex', alignItems: 'center', padding: 12,
                                borderRadius: 12
                            }}
                        >
                            <Text style={{ fontSize: 18, fontWeight: 600 }}>{time}</Text>
                            <XStack><Text style={{ color: 'gray', fontSize: 12 }}>60min | </Text><Text style={{ color: themeConstants.colors.primary, fontSize: 12 }}>$42</Text></XStack>
                        </TouchableOpacity>
                    </View>
                ))}
            </XStack>
        </YStack>
        <Image
            style={{ width: '100%', height: 300, marginBottom: 200, padding: 12, borderRadius: 12 }}
            src={mapURL}
        />
    </ScrollView>
  );
};

export default Field;

const styles = StyleSheet.create({
  container: {
    // padding: 16,
  },
});