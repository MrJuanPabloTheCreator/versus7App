import React from 'react'
import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { View, Text, XStack, YStack } from 'components'
import useTheme from 'contexts/ThemeContext/useTheme';
import { useRouter } from 'expo-router';

const createOptions = [
  {
    title: 'New Note',
    subline: 'Share a message',
    route: 'newNoteForm',
    image: require('assets/field.png'),
    icon: <Entypo name="new-message" size={20} color="#6DF700" />
  },
  {
    title: 'Create Team',
    subline: 'Play with your friends',
    route: 'newTeamForm',
    image: require('assets/team.png'),
    icon: <MaterialCommunityIcons name="shield-plus" size={20} color="#6DF700" />
  },
  {
    title: 'Organizar Partido',
    subline: 'Invite your friends',
    route: 'newMatchForm',
    image: require('assets/soccerBall.png'),
    icon: <FontAwesome name="soccer-ball-o" size={20} color="#6DF700" />
  },
  {
    title: 'Tournaments',
    subline: 'Play with your friends',
    route: 'newMatchForm',
    image: require('assets/thropy.png'),
    icon: <MaterialCommunityIcons name="trophy" size={20} color="#6DF700" />
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
    <ScrollView style={{ backgroundColor: themeConstants.colors.background}}>
      <YStack style={{ alignItems: 'flex-start',  }}>
        {/* <Text style={{ fontSize: 28, fontWeight: 600, padding: 12 }}>
          Actions
        </Text> */}
        <XStack style={{ flexWrap: 'wrap', gap: 12 }}>
          {createOptions.map((option, index) => (
            <TouchableOpacity 
              key={index} 
              style={[{ 
                // backgroundColor: themeConstants.colors.background, 
                // padding: 12, 
                // borderRadius: 8,
              }, index === 2 || index === 3 ? {paddingTop: 0}:{paddingTop: 12}]}
              onPress={() => router.push(option.route)}
            >
              <Image
                style={{ width: 180, height: 200, borderRadius: 20 }}
                source={option.image}
              />
              <XStack fitContent style={{ gap: 8, paddingTop: 8, justifyContent: 'flex-start' }}>
                <Text style={{ fontSize: 18, fontWeight: 500, color: 'white' }}>{option.title}</Text>
                {option.icon}
              </XStack>
              <Text style={{ color: 'gray' }}>{option.subline}</Text>
            </TouchableOpacity>
          ))}
        </XStack>
        <YStack style={{ alignItems: 'flex-start'}}>
          <Text style={{ fontSize: 28, fontWeight: 600, padding: 12 }}>
            Services
          </Text>
          <ScrollView horizontal>
            <XStack style={{ gap: 12, paddingLeft: 12 }}>
              <YStack fitContent style={{ alignItems: 'flex-start'}}>
                <Image
                  style={{ width: 240, height: 160, borderRadius: 20 }}
                  source={require('assets/referee.png')}
                />
                <Text style={{ fontSize: 18, fontWeight: 500, paddingTop: 8 }}>Referee</Text>
                <Text style={{ color: 'gray' }}>Hire a Referee</Text>
              </YStack>
              <YStack fitContent style={{ alignItems: 'flex-start'}}>
                <Image
                  style={{ width: 240, height: 160, borderRadius: 20 }}
                  source={require('assets/photographer.png')}
                />
                <Text style={{ fontSize: 18, fontWeight: 500, paddingTop: 8 }}>Photographer</Text>
                <Text style={{ color: 'gray' }}>Hire a photographer</Text>
              </YStack>
            </XStack>
          </ScrollView>
        </YStack>
      </YStack>
    </ScrollView>
  )
}

export default CreateTab

const styles = StyleSheet.create({
    container: {
    
    },
});