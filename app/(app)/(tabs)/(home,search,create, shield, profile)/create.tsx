import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { View, Text, XStack, YStack } from 'components'
import useTheme from 'contexts/ThemeContext/useTheme';
import { useRouter } from 'expo-router';

const createOptions = [
  {
    title: 'New Note',
    route: 'newNoteForm',
    icon: <Entypo name="new-message" size={24} color="white" />
  },
  {
    title: 'Crear Equipo',
    route: 'newTeamForm',
    icon: <MaterialCommunityIcons name="shield-plus" size={24} color="white" />
  },
  {
    title: 'Organizar Partido',
    route: 'newMatchForm',
    icon: <FontAwesome name="soccer-ball-o" size={24} color="white" />
  },
  // {
  //   title: 'Create a Match',
  //   route: '/form/createMatch'
  // },
  // {
  //   title: 'Create a Tournament',
  //   route: '/(forms)/(newTeamForm)/newTeam'
  // }
]

const CreateTab = () => {
  const router = useRouter();
  const { themeConstants } = useTheme();

  return (
    <YStack style={{ padding: 8, flex: 1 }}>
      <XStack style={{ flexWrap: 'wrap', gap: 8 }}>
        {createOptions.map((option, index) => (
          <TouchableOpacity 
            key={index} 
            style={{ 
              backgroundColor: themeConstants.colors.background, 
              padding: 12, 
              borderRadius: 8,
            }}
            onPress={() => router.push(option.route)}
          >
            <XStack fitContent style={{ gap: 8 }}>
              {option.icon}
              <Text style={{ fontSize: 16, fontWeight: 500 }}>{option.title}</Text>
            </XStack>
          </TouchableOpacity>
        ))}
      </XStack>
    </YStack>
  )
}

export default CreateTab

const styles = StyleSheet.create({
    container: {
    
    },
});