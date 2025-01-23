import React, { useState } from 'react'

import { Text, SearchInput, View, XStack, YStack } from 'components'
import { Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

interface UserInfo {
    sub: string;
    username: string;
    picture: string;
}

const NewChat = () => {
    const [searchResults, setSearchResults] = useState<UserInfo[]>([])
    const router = useRouter();

    const handleSearchResults = (values: UserInfo[], textInputValue: string) => {
        if(textInputValue === ''){
          setSearchResults([])
        } else {
          setSearchResults(values);
        }
    };

    return (
        <YStack style={{ padding: 8, alignItems: 'flex-start' }}>
            <Text style={{ fontSize: 24, fontWeight: 500 }}>New Chat</Text>
            <SearchInput callbackFunction={handleSearchResults}/>
            {searchResults.length > 0 && (
                <YStack>
                    {searchResults.map((user, index) => (
                        <TouchableOpacity key={index} onPress={() => router.push(`(app)/chats/chat/null?type=dm&reciever_id=${user.sub}`)} style={{ width: '100%' }}>
                            <XStack style={{ gap: 8, padding: 12, justifyContent: 'flex-start' }}>
                                <Image
                                    style={{ width: 32, height: 32, borderRadius: 100, overflow: 'hidden' }}
                                    src={user?.picture ? user.picture : 'https://randomuser.me/api/portraits/men/1.jpg'}
                                />
                                <Text>{user.username}</Text>
                            </XStack>
                        </TouchableOpacity>
                    ))}
                </YStack>
            )}
        </YStack>
    )
}

export default NewChat