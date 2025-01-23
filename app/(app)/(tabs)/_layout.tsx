import { Image, StyleSheet } from 'react-native'
import React from 'react'
import { Link, Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import Fontisto from '@expo/vector-icons/Fontisto';

import useTheme from 'contexts/ThemeContext/useTheme';
import { Text, View, VS7logo, XStack } from 'components';
import useSession from 'contexts/SessionContext/useSession';
import useWebSocket from 'contexts/WebSocketContext/useWebSocket';

const AppLayout = () => {
    const { connected } = useWebSocket();
    const { themeConstants, theme } = useTheme();
    const { session } = useSession();

    return (
        <Tabs
            screenOptions={{
                headerStyle: {
                    backgroundColor: themeConstants.colors.background,
                    shadowOffset: { width: 0, height: 0 },
                },
                sceneStyle: {
                    backgroundColor: themeConstants.colors.secondary,
                },
                headerTitle: '',
                tabBarShowLabel: false,
                tabBarStyle: {
                    borderTopColor: 'gray',
                    backgroundColor: themeConstants.colors.background,
                    height: 84,
                },
            }}
        >
            <Tabs.Screen name='index' options={{
                headerRight: () => (
                    <XStack fitContent style={{ gap: 8, marginRight: 12 }}>
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
                headerLeft: () => ( 
                    <VS7logo style={{ marginLeft: 12 }} textStyle={{ fontSize: 32 }}/>
                ),
                tabBarIcon: ({ focused }) => <Ionicons name={focused ? 'home-sharp':'home-outline'} size={28} color={focused ? '#6DF700': 'gray'} />
            }}/>
            <Tabs.Screen name='search' options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => <Ionicons name={focused ? 'search-sharp':'search-outline'} size={28} color={focused ? '#6DF700': 'gray'} />
            }}/>
            <Tabs.Screen name='create' options={{
                tabBarIcon: ({ focused }) => <Ionicons name={focused ? 'football-sharp':'football-outline'} size={28} color={focused ? '#6DF700': 'gray'} />
            }}/>
            <Tabs.Screen name='shield' options={{
                // headerShown: false,
                tabBarIcon: ({ focused }) => <Fontisto name={focused ? 'shield':'shield'} size={24} color={focused ? '#6DF700': 'gray'} />
            }}/>
            <Tabs.Screen name='profile' options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => <Ionicons name={focused ? 'person-circle-sharp':'person-circle-outline'} size={28} color={focused ? '#6DF700': 'gray'} />
            }}/>
        </Tabs>
    )
}

export default AppLayout

const styles = StyleSheet.create({})