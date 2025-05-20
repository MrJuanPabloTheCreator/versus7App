import React from 'react';
import { Link, Stack, useRouter } from 'expo-router';
import { Image, TouchableOpacity, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import { Platform } from 'react-native';

import { XStack, VS7logo, Text } from 'components';
import useSession from 'contexts/SessionContext/useSession';
import useWebSocket from 'contexts/WebSocketContext/useWebSocket';
import useTheme from 'contexts/ThemeContext/useTheme';
import Ionicons from '@expo/vector-icons/Ionicons';

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

  const headerLeft = () => (
    <TouchableOpacity onPress={() => router.back()}>
      <MaterialIcons name="arrow-back-ios" size={24} color={themeConstants.colors.primary} />
    </TouchableOpacity>
  )

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
        headerLeft: headerLeft,
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

  const headerLeft = () => (
    <TouchableOpacity onPress={() => router.back()}>
      <MaterialIcons name="arrow-back-ios" size={24} color={themeConstants.colors.primary} />
    </TouchableOpacity>
  )

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
                <TouchableOpacity onPress={() => router.push('profile')}>
                  <Image
                    style={{ width: 32, height: 32, borderRadius: 100, overflow: 'hidden' }}
                    src={session?.picture ? session.picture : 'https://randomuser.me/api/portraits/men/1.jpg'}
                  />
                  {/* <View style={[
                    { width: 12, height: 12, borderRadius: 6, position: 'absolute', bottom: 0, right: -3 },
                    connected ? { backgroundColor: '#6DF700'}:{ backgroundColor: 'red'},
                  ]}/> */}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('chats')}>
                  <Ionicons name="chatbubbles-outline" size={32} color={themeConstants.colors.text} />
                  <View style={[
                    { width: 16, height: 16, borderRadius: 12, position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', bottom: 0, right: -3 },
                    connected ? { backgroundColor: '#6DF700'}:{ backgroundColor: 'red'},
                  ]}>
                    <Text style={{ position: 'absolute', fontSize: 12, fontWeight: 600 }}>2</Text>
                  </View>
                  {/* <Feather name="message-circle" size={36} color={themeConstants.colors.text} /> */}
                </TouchableOpacity>
              </XStack>
            ),
          }} 
        />
        <Stack.Screen
          name="note/[id]" 
          options={{
            headerLeft: Platform.OS === 'ios' ? () => '': headerLeft,
            presentation: 'modal',
          }}
        />
      </DefaultStack>
    )
  } else if(segment === '(search)'){
    return (
      <DefaultStack>
        <Stack.Screen
          name="search/index" 
          options={{ 
            headerShown: false
          }} 
        />
        <Stack.Screen
          name="field/[id]" 
          options={{ 
            headerShown: false
          }} 
        />
        <Stack.Screen
          name="search/filter" 
          options={{
            headerLeft: Platform.OS === 'ios' ? () => '': headerLeft,
            presentation: 'modal',
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
            headerShown: false
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