import React, { useState } from 'react'
import { Image, ScrollView, TouchableOpacity, View } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useLocalSearchParams } from 'expo-router';

import { Accordion, SearchInput, Text, XStack, YStack } from 'components'
import { getRef } from './refRegistry';
import { UserInfo } from 'types/returnedDataTypes';
import useTheme from 'contexts/ThemeContext/useTheme';

const AddTeamMembers = () => {
    const { refId } = useLocalSearchParams();
    if (typeof refId !== 'string') return <Text>Invalid Ref Id</Text>;

    const refObject = getRef(refId);
    if (!refObject) return <Text>Invalid Ref</Text>;
    const { updateList, users } = refObject;

    const [selectedUsers, setSelectedUsers] = useState<UserInfo[] | []>(users || [])
    const [searchResults, setSearchResults] = useState<UserInfo[] | []>([])

    const { themeConstants } = useTheme();

    const handleRemoveUser = (sub: string) => {
        const updatedList = selectedUsers.filter((user) => user.sub !== sub)
        refObject.users = updatedList
        updateList(updatedList)
        setSelectedUsers(updatedList)
    }

    const handleSelectUser = (user: UserInfo) => {
        if(selectedUsers.some((existingUser) => existingUser.sub === user.sub)){
            console.log("User exist, removing user")
            handleRemoveUser(user.sub)
        } else {
            console.log("User added")
            refObject.users = [...selectedUsers, user];
            updateList([...selectedUsers, user])
            setSelectedUsers([...selectedUsers, user])
        }
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
                {searchResults.length > 0  && (
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
                )} 
                { selectedUsers.length > 0 && (
                    <YStack style={{ alignItems: 'flex-start', gap: 16, marginTop: 8 }}>
                        <Text style={{ fontSize: 24, fontWeight: 500 }}>Selected Users</Text>
                        {selectedUsers.map((user, index) => (
                            <XStack key={index} style={{ justifyContent: 'space-between', alignItems: 'flex-start', backgroundColor: ''}}>
                                <XStack fitContent style={{ gap: 8, justifyContent: 'flex-start' }}>
                                    <Image
                                        style={{ width: 36, height: 36, borderRadius: 18, overflow: 'hidden' }}
                                        src={user?.picture ? user.picture : 'https://randomuser.me/api/portraits/men/1.jpg'}
                                    />
                                    <Text style={{ fontWeight: 500 }}>{user.username}</Text>
                                </XStack>
                                <XStack fitContent style={{ gap: 24, alignItems: 'flex-start', backgroundColor: '' }}>
                                    {/* <Accordion fitContent style={{ gap: 8, padding: 8 }} header={<Text>Role</Text>} contentHeight={40}>
                                        <Text>Hello</Text>
                                    </Accordion> */}
                                    <TouchableOpacity style={{ padding: 8 }} onPress={() => handleRemoveUser(user.sub)}>
                                        <FontAwesome name="trash-o" size={24} color="gray" />
                                    </TouchableOpacity>
                                </XStack>
                            </XStack>
                        ))}
                    </YStack>
                )}
            </ScrollView>
        </YStack>   
    )
}

export default AddTeamMembers