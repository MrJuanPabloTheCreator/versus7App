import { StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { Button, PostCard, Text, View, XStack, YStack } from 'components'
import useSession from 'contexts/SessionContext/useSession';
import useTheme from 'contexts/ThemeContext/useTheme';
import Feather from '@expo/vector-icons/Feather';

const profileTabs = [
  'Activity',
  'Stats',
  'Teams',
  'Games'
]

const trophies = [
  require('assets/trophy1.png'),
  require('assets/trophy2.png'),
  require('assets/trophy4.png'),
];

const medals = [
  require('assets/medal1.png'),
  require('assets/medal2.png'),
];

const ProfileTab = () => {
  const [activeTab, setActiveTab] = useState('Activity')
  const { themeConstants } = useTheme();
  const { session } = useSession();

  const router = useRouter();

  return (
    <View style={{ backgroundColor: themeConstants.colors.background }}>
      <Image
        style={{ width: '100%', height: 180, marginBottom: 120 }}
        source={require('assets/field.png')}
      />
      <TouchableOpacity 
        onPress={() => router.push('profile/settings')} 
        style={{ 
            width: 36, height: 36,
            backgroundColor: themeConstants.colors.background, borderRadius: 28,
            position: 'absolute', top: 48, right: 16, 
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}
      >
        <Feather name="settings" size={22} color={themeConstants.colors.text} style={{ position: 'absolute' }}/>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => router.push('profile/settings')} 
        style={{ 
            width: 36, height: 36,
            backgroundColor: themeConstants.colors.background, borderRadius: 28,
            position: 'absolute', top: 88, right: 16, 
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}
      >
        <Feather name="edit" size={22} color={themeConstants.colors.text} style={{ position: 'absolute' }}/>
      </TouchableOpacity>
      {/* <XStack style={{ gap: 8, padding: 8, justifyContent: 'flex-start' }}>
        <YStack fitContent>
          <Image
            style={{ width: 150, height: 150, borderRadius: 25 }}
            src={session?.picture || 'https://randomuser.me/api/portraits/men/1.jpg'}
          />
        </YStack>
        <YStack style={{ flex: 1, gap: 12 }}>
          <XStack style={{ gap: 12 }}>
            {trophies.map((source, index) => (
              <Image
                key={index}
                style={{ width: 40, height: 55, borderRadius: 0 }}
                source={source}
              />
            ))}
          </XStack>
          <XStack style={{ gap: 12 }}>
            {medals.map((source, index) => (
              <Image
                key={index}
                style={{ width: 36, height: 48, borderRadius: 0 }}
                source={source}
              />
            ))}
          </XStack>
        </YStack>
      </XStack> */}
      <YStack style={{position: 'absolute', top: 92}}>
        <Image
          style={{ width: 150, height: 150, borderRadius: 25 }}
          src={session?.picture || 'https://randomuser.me/api/portraits/men/1.jpg'}
        />
        <Text style={{ fontSize: 24, fontWeight: 600, justifyContent: 'center', paddingTop: 8 }}>Juan Pablo Cerda</Text>
      </YStack>
      {/* <XStack style={{ paddingTop: 120, gap: 8 }}>
        <TouchableOpacity>
          <Feather name="settings" size={24} color={themeConstants.colors.text} style={{ }}/>
        </TouchableOpacity>
        <TouchableOpacity style={{ 
            backgroundColor: themeConstants.colors.background, padding: 8, borderRadius: 12,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
          <Feather name="edit" size={24} color={themeConstants.colors.text} style={{ }} />
          <Text style={{ fontSize: 12}}>Edit</Text>
        </TouchableOpacity>
      </XStack> */}
      {/* <XStack style={{ gap: 8, padding: 8, paddingTop: 120 }}>
        <Button style={{ flex: 1, paddingVertical: 10}} text={'Amigos'}/>
        <Button style={{ flex: 1, paddingVertical: 10}} type='default' text={'Enviar mensaje'}/>
      </XStack> */}
      <YStack style={{ backgroundColor: themeConstants.colors.background }}>
        <XStack style={{ backgroundColor: themeConstants.colors.secondary}}>
          {profileTabs.map((tab, index) => (
            <TouchableOpacity 
              key={index} 
              onPress={() => setActiveTab(tab)}
              style={[activeTab === tab && { backgroundColor: themeConstants.colors.background},{ width: '25%', alignItems: 'center', paddingVertical: 10 }]}
            >
              <Text style={[activeTab === tab && { color: themeConstants.colors.primary},{ fontWeight: 500}]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </XStack>
        <YStack style={{ alignItems: 'flex-start', padding: 16 }}>
          <Text>Nombre: Juan Pablo</Text>
          <Text>Edad: 24</Text>
          <Text>Posicion/es: Deltantero/Punta</Text>
          <Text>Altura: 176cm</Text>
          <Text>Nacionalidad: Chile 🇨🇱</Text>
        </YStack>
      </YStack>
    </View>
  )
}

export default ProfileTab

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});