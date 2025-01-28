import { Image, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { Button, Text, View, XStack, YStack } from 'components';
import { facilities, fakeSchedules } from 'constants/fakeData';
import useTheme from 'contexts/ThemeContext/useTheme';

const API_KEY = 'AIzaSyDrMseunnRkOyTEjRH9zfxRzk4uBpcIQ38'

const Field = () => {
  const { id } = useLocalSearchParams();
  const { themeConstants } = useTheme();

  if (typeof id !== 'string') return null;

  const facility = facilities.find((facility) => facility.facility_id === id);

  if (!facility) return <Text>Facility not found</Text>;

  const { x, y } = facility.coordinates;
  const mapURL = `https://maps.googleapis.com/maps/api/staticmap?size=600x400&zoom=15&markers=color:red|${x},${y}&key=${API_KEY}`

  return (
    <ScrollView style={styles.container}>
        <Image
            style={{ width: '100%', height: 200 }}
            source={{ uri: facility.pictures[0] }}
        />
        <YStack style={{ padding: 8, alignItems: 'flex-start'}}>
            <Text style={{ fontSize: 24, fontWeight: 500 }}>{facility.name}</Text>
            <Text style={{ fontSize: 14 }}>{facility.address}</Text>
        </YStack>
        <YStack style={{ padding: 4, gap: 8 }}>
            <XStack style={{ justifyContent: 'space-between', paddingHorizontal: 4 }}>
                <Button fitContent style={{ paddingHorizontal: 12, paddingVertical: 12 }}>
                    <MaterialIcons name="arrow-back-ios" size={22} color={themeConstants.colors.text} />
                </Button>
                <Text style={{ fontSize: 22 }}>Mon, Jan 2025</Text>
                <Button fitContent style={{ paddingHorizontal: 12, paddingVertical: 12}}>
                    <MaterialIcons name="arrow-forward-ios" size={22} color={themeConstants.colors.text} />
                </Button>
            </XStack>
            <XStack style={{ flexWrap: 'wrap'}}>    
                {fakeSchedules.map((time, index) => (
                    <View key={index} style={{ width: '33.33%', flex: 0, padding: 4 }}>
                        <Button text={time} fitContent style={{ paddingHorizontal: 0, paddingVertical: 12}}/>
                    </View>
                ))}
            </XStack>
        </YStack>
        <Image
            style={{ width: '100%', height: 300, marginBottom: 200, marginTop: 24 }}
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