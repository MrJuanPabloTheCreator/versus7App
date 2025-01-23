import { useRouter } from 'expo-router';
import React, { useState } from 'react'
import { Image, ScrollView } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

import { Button, Input, Text, SearchInput, View, XStack, YStack } from 'components'
import useTheme from 'contexts/ThemeContext/useTheme';

interface UserInfo {
    sub: string;
    username: string;
    picture: string;
}

const Chats = () => {
    const [searchResults, setSearchResults] = useState<UserInfo[]>([])

    const { themeConstants } = useTheme();
    const router = useRouter();

    const handleSearchResults = (values: UserInfo[], textInputValue: string) => {
        if(textInputValue === ''){
          setSearchResults([])
        } else {
          setSearchResults(values);
        }
    };

    const fakeChats = Array.from({ length: 10 }, (_, index) => ({
        id: index + 1,
        name: `User ${index + 1}`,
        message: `Message from User ${index + 1}`,
        image: `https://randomuser.me/api/portraits/men/${index + 1}.jpg`,
    }));

    return (
        <ScrollView style={{ backgroundColor: themeConstants.colors.background }}>
            <YStack style={{ padding: 8, gap: 8, alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 28, fontWeight: 500 }}>Chats</Text>
                <XStack style={{ gap: 8 }}>
                    <SearchInput callbackFunction={handleSearchResults} style={{ flex: 1 }}/>
                    <Button fitContent style={{ paddingHorizontal: 8, paddingVertical: 8 }} onPress={() => router.push('(app)/chats/newChat')}>
                        <Entypo name="plus" size={32} color={themeConstants.colors.text}/>
                    </Button>
                </XStack>
            </YStack>
            <YStack>
                {fakeChats.map((chat) => (
                    <Button
                        key={chat.id}
                        style={{ justifyContent: 'flex-start', paddingHorizontal: 12, borderRadius: 0 }}
                        onPress={() => router.push(`(app)/chats/chat/null?user_id=345435`)}
                    >
                        <XStack fitContent style={{ gap: 8 }}>
                            <Image
                                style={{ width: 52, height: 52, borderRadius: 100, overflow: 'hidden' }}
                                src={chat.image}
                            />
                            <YStack fitContent style={{ alignItems: 'flex-start' }}>
                                <Text style={{ fontSize: 20 }}>{chat.name}</Text>
                                <Text style={{ fontSize: 14, color: 'gray' }}>{chat.message}</Text>
                            </YStack>
                        </XStack>
                    </Button>
                ))}
            </YStack>
        </ScrollView>
    )
}

export default Chats