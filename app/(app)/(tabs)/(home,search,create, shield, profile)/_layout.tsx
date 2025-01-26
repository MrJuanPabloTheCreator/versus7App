import React from 'react';
import { Link, Stack, useRouter } from 'expo-router';
import { Image, TouchableOpacity, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';

import { XStack, VS7logo, Text } from 'components';
import useSession from 'contexts/SessionContext/useSession';
import useWebSocket from 'contexts/WebSocketContext/useWebSocket';
import useTheme from 'contexts/ThemeContext/useTheme';

export const unstable_settings = {
  initialRouteName: 'home',
  home: {
    initialRouteName: 'home',
  },
  search: {
    initialRouteName: 'search',
  },
  create: {
    initialRouteName: 'create',
  },
  shield: {
    initialRouteName: 'shield',
  },
  profile: {
    initialRouteName: 'profile',
  },
};

const DefaultStack: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { themeConstants } = useTheme();
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
            backgroundColor: themeConstants.colors.background,
        },
        contentStyle: {
            backgroundColor: themeConstants.view.backgroundColor,
        },
        headerTitle: '',
        headerTintColor: themeConstants.colors.text,
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="arrow-back-ios" size={24} color={themeConstants.colors.primary} />
          </TouchableOpacity>
        ),
      }}
    >
      {children}
    </Stack>
  )
}

export default function SharedLayout({ segment }: { segment: string }) {
  console.log(segment)
  const { connected } = useWebSocket();
  const { themeConstants, theme } = useTheme();
  const { session } = useSession();

  const router = useRouter();

  if(segment === '(home)'){
    return (
      <DefaultStack>
        <Stack.Screen
          name="index" 
          options={{ 
            headerLeft: () => ( 
              <VS7logo textStyle={{ fontSize: 32 }}/>
            ),
            headerRight: () => (
              <XStack fitContent style={{ gap: 8 }}>
                <Link href="/profile">
                  <Image
                    style={{ width: 32, height: 32, borderRadius: 100, overflow: 'hidden' }}
                    src={session?.picture ? session.picture : 'https://randomuser.me/api/portraits/men/1.jpg'}
                  />
                  <View style={[
                    { width: 12, height: 12, borderRadius: 6, },
                    connected ? { backgroundColor: '#6DF700'}:{ backgroundColor: 'red'},
                  ]}/>
                </Link>
                <Link href="/chats">
                  <Feather name="message-circle" size={36} color={themeConstants.colors.text} />
                </Link>
              </XStack>
            ),
          }} 
        />
      </DefaultStack>
    )
  } else if(segment === '(search)'){
    return (
      <DefaultStack>
        <Stack.Screen
          name="search" 
          options={{ 
            headerShown: false
          }} 
        />
      </DefaultStack>
    )
  } else if(segment === '(create)'){
    return (
      <DefaultStack>
        <Stack.Screen
          name="create" 
          options={{ 
            headerLeft: () => ('')
          }} 
        />
      </DefaultStack>
    )
  } else if(segment === '(shield)'){
    return (
      <DefaultStack>
        <Stack.Screen
          name="shield" 
          options={{ 
            headerLeft: () => ('')
          }} 
        />
      </DefaultStack>
    )
  } else if(segment === '(profile)'){
    return (
      <DefaultStack>
        <Stack.Screen
          name="profile/index" 
          options={{ 
            headerLeft: () => (<Text style={{ fontSize: 24, fontWeight: 500 }}>{session?.preferred_username}</Text>),
            headerRight: () => (
            <TouchableOpacity onPress={() => router.push('(app)/(tabs2)/(profile)/profile/settings')}>
              <Feather name="settings" size={28} color={themeConstants.colors.text} />
            </TouchableOpacity>
            ),
          }} 
        />
        <Stack.Screen 
          name="profile/settings" 
          options={{
            headerTitle: 'settings'
          }}
        />
      </DefaultStack>
    )
  }
}