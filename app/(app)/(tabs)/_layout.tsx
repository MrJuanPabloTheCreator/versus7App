import React from 'react'
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

import useTheme from 'contexts/ThemeContext/useTheme';
import useSession from 'contexts/SessionContext/useSession';
import useWebSocket from 'contexts/WebSocketContext/useWebSocket';
import Fontisto from '@expo/vector-icons/Fontisto';

const TabsLayout = () => {
    const { themeConstants } = useTheme();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                // sceneStyle: {
                //     backgroundColor: themeConstants.colors.secondary,
                // },
                tabBarShowLabel: false,
                tabBarStyle: {
                    borderTopColor: 'gray',
                    backgroundColor: themeConstants.colors.background,
                    height: 84,
                },
            }}
        >
            <Tabs.Screen name='(home)' options={{
                tabBarIcon: ({ focused }) => <Ionicons name={focused ? 'home-sharp':'home-outline'} size={28} color={focused ? '#6DF700': 'gray'} />
            }}/>
            <Tabs.Screen name='(search)' options={{
                tabBarIcon: ({ focused }) => <Ionicons name={focused ? 'search-sharp':'search-outline'} size={28} color={focused ? '#6DF700': 'gray'} />
            }}/>
            <Tabs.Screen name='(create)' options={{
                tabBarIcon: ({ focused }) => <Ionicons name={focused ? 'football-sharp':'football-outline'} size={28} color={focused ? '#6DF700': 'gray'} />
            }}/>
            <Tabs.Screen name='(shield)' options={{
                tabBarIcon: ({ focused }) => <Fontisto name={focused ? 'shield':'shield'} size={24} color={focused ? '#6DF700': 'gray'} />
            }}/>
            <Tabs.Screen name='(profile)' options={{
                tabBarIcon: ({ focused }) => <Ionicons name={focused ? 'person-circle-sharp':'person-circle-outline'} size={28} color={focused ? '#6DF700': 'gray'} />
            }}/>
        </Tabs>
    )
}

export default TabsLayout;