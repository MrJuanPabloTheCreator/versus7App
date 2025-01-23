import React, { useState } from 'react'
import { Image, ScrollView, TouchableOpacity, View } from 'react-native'

import { useLocalSearchParams } from 'expo-router';

import { SearchInput, Text, XStack, YStack } from 'components'
import { getRef } from './refRegistry';
import { UserInfo } from 'types/returnedDataTypes';
import useTheme from 'contexts/ThemeContext/useTheme';

const AddTeamMembers = () => {
    const { refId } = useLocalSearchParams();
    if (typeof refId !== 'string') return <Text>Invalid Ref Id</Text>;

    const refObject = getRef(refId);
    if (!refObject) return <Text>Invalid Ref</Text>;
    const { selectUser, users } = refObject;

    const [selectedUsers, setSelectedUsers] = useState<UserInfo[] | []>(users || [])
    const [searchResults, setSearchResults] = useState<UserInfo[] | []>([])

    const { themeConstants } = useTheme();

    const handleSelectUser = (user: UserInfo) => {
        refObject.users = [...selectedUsers, user];
        selectUser(user)
        setSelectedUsers([...selectedUsers, user])
    }

    const handleSearchResults = (values: UserInfo[], textInputValue: string) => {
        if(textInputValue === ''){
            setSearchResults([])
        } else {
            setSearchResults(values);
        }
    };

    const isUserSelected = (sub: string) => {
        return selectedUsers.some((user) => user.sub === sub);
    }

    return (
        <YStack style={{ padding: 8 }}>
            <SearchInput placeholder="Search..." searchTopic={'users'} callbackFunction={handleSearchResults}/>
            <ScrollView style={{ width: '100%' }}>
                {searchResults.length > 0  ? (
                    <XStack style={{ flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                        {searchResults.map((user, index) => (
                            <TouchableOpacity 
                                key={index} 
                                onPress={() => handleSelectUser(user)} 
                                style={[
                                    isUserSelected(user.sub) ? { backgroundColor: themeConstants.colors.primary }:{}, 
                                    { width: '33.33%' }
                                ]}>
                                <YStack style={{ gap: 8, padding: 12, paddingVertical: 16, justifyContent: 'flex-start' }}>
                                    <Image
                                        style={{ width: 64, height: 64, borderRadius: 12, overflow: 'hidden' }}
                                        src={user?.picture ? user.picture : 'https://randomuser.me/api/portraits/men/1.jpg'}
                                    />
                                    <Text 
                                        style={[isUserSelected(user.sub) ? { color: 'gray' }:{}, { fontWeight: 500, }]} 
                                        numberOfLines={1}
                                        ellipsizeMode="tail"
                                    >
                                        {user.username}
                                    </Text>
                                </YStack>
                            </TouchableOpacity>
                        ))}
                    </XStack>
                ): selectedUsers.length > 0 && (
                    <YStack>
                        <Text>Selected Users</Text>
                        {selectedUsers.map((user, index) => (
                            <XStack key={index}>
                                <Text>{user.username}</Text>
                            </XStack>
                        ))}
                    </YStack>
                )}
            </ScrollView>
        </YStack>   
    )
}

export default AddTeamMembers