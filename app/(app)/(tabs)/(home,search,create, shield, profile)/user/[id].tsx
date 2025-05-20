import { StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react'

import { Button, PostCard, Text, View, XStack, YStack } from 'components'
import useSession from 'contexts/SessionContext/useSession';
import useTheme from 'contexts/ThemeContext/useTheme';

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

type Friendship = 'send' | 'sent' | 'pending' | 'friends'

const User = () => {
  const { id, username, picture } = useLocalSearchParams()
  const [activeTab, setActiveTab] = useState('Activity')
  const [friendship, setFriendship] = useState<Friendship>('send')

  const { themeConstants } = useTheme();
  const { session } = useSession();

  const pictureUrl = Array.isArray(picture) ? picture[0] : picture;
  const userId = Array.isArray(id) ? id[0] : id;

  const friendshipStatusText = (): string => {
    switch (friendship) {
      case 'send':
        return 'Send Request';
      case 'sent':
        return 'Request Sent';
      case 'pending':
        return 'Accept';
      case 'friends':
        return 'Unfriend';
      default:
        return 'Send Request';
    }
  };
  
  const friendshipButtonType = (): "active" | "modest" | "default" | "warning" | undefined => {
    switch (friendship) {
      case 'send':
        return 'active';
      case 'sent':
        return 'modest';
      case 'pending':
        return 'active';
      case 'friends':
        return 'modest';
      default:
        return 'default';
    }
  };

  const handleSendFriendRequest = async () => {
    try {
      const friendReqResponse = await fetch('https://5k8r7j8jm0.execute-api.sa-east-1.amazonaws.com/Development/friends', {
        method: 'POST',
        body: JSON.stringify({
          sub: session?.sub,
          receiver_id: id
        })
      })
      if(friendReqResponse.ok){
        // friendship sent succesfully
        setFriendship('sent')
        console.log('Friendship sent successfully!')
      } else {
        const { message } = await friendReqResponse.json()
        throw new Error(message || 'Failed to send friend request')
      }
    } catch (error) {
      Alert.alert('Error sending request', `${error}`)
    }
  }

  useEffect(() => {
    if (session?.friends?.has(userId)) {
      const status = session?.friends?.get(userId)?.status;
      if(status !== undefined){
        setFriendship(status);
      }
    }
  }, [session, userId]);

  return (
    <View style={styles.container}>
      <XStack style={{ gap: 8, padding: 8, justifyContent: 'flex-start' }}>
        <YStack fitContent>
          <Image
            style={{ width: 150, height: 150, borderRadius: 25 }}
            src={pictureUrl || 'https://randomuser.me/api/portraits/men/1.jpg'}
          />
          <Text style={{ 
            position: 'absolute', 
            bottom: -10, 
            right: -10, 
            zIndex: 10, 
            backgroundColor: 'black',
            color: themeConstants.colors.primary,
            textAlign: 'center',
            width: 44,
            height: 44,
            borderRadius: 5,
            fontSize: 32,
            fontWeight: 600
          }}>
            7
          </Text>
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
      </XStack>
      <XStack style={{ gap: 8, padding: 8 }}>
        <Button 
          style={{ flex: 1, paddingVertical: 10 }} 
          type={friendshipButtonType()} 
          onPress={handleSendFriendRequest} 
          text={friendshipStatusText()}
          disabled={friendship !== 'send'}
        />
        <Button style={{ flex: 1, paddingVertical: 10}} type='default' text={'Enviar mensaje'}/>
      </XStack>
      <YStack style={{ backgroundColor: themeConstants.colors.background, overflow: 'hidden' }}>
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

export default User

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});