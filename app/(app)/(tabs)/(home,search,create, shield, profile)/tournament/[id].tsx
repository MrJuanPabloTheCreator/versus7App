import { StyleSheet, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import React from 'react'

import { Text, View, XStack, YStack } from 'components';
import Sticker from '@components/sticker';
import useTheme from 'contexts/ThemeContext/useTheme';
import { facilities, tournaments } from 'constants/fakeData';

const Tournament = () => {
  const { id } = useLocalSearchParams();
  const { themeConstants } = useTheme();

  if (typeof id !== 'string') return null;
  
  const tournament = tournaments.find((tournament) => tournament.tournament_id === id);

  if (!tournament) return <Text>Facility not found</Text>;

  return (
    <View>
      <Image
        style={{ height: 200, width: '100%' }}
        source={require('assets/tournament1.png')}
      />
      <YStack style={{ alignItems: 'flex-start', padding: 16 }}>
        <XStack style={{ justifyContent: 'flex-start', alignItems: 'flex-end' }}>
          <Text style={{ fontSize: 24, fontWeight: 600, color: themeConstants.colors.primary }}>${tournament.price}</Text>
          <Text style={{ fontSize: 18, fontWeight: 600, color: 'gray' }}>/Match</Text>
        </XStack>
        <Text style={{ fontSize: 20, fontWeight: 500, }}>{facilities[0].name}</Text>
        <Text style={{ fontSize: 14, color: 'gray' }}>{facilities[0].address}</Text>
        <XStack style={{ gap: 8, justifyContent: 'flex-start', paddingTop: 8 }}>
          <Sticker type='purple' text='7 vs 7'/>
          <Sticker type='blue' text='4-6 matches'/>
          <Sticker type='yellow' text='Turf'/>
        </XStack>
      </YStack>
    </View>
  )
}

export default Tournament