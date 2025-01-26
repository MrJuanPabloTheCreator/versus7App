import React, { useState } from 'react'
import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import { View, Button, XStack, SearchInput, YStack, Text } from 'components'
import { useRouter } from 'expo-router';
import { facilities } from 'constants/fakeData';
import useTheme from 'contexts/ThemeContext/useTheme';

const topicOptions = ['users','teams','fields','tournaments']

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

interface UserInfo {
  sub: string;
  username: string;
  picture: string;
}

interface SearchResultsTypes {
  values: UserInfo[] | []
}

const SearchTab = () => {
  const [searchTopic, setSearchTopic] = useState<any>('users')
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

  return (
    <YStack>
      <YStack style={{ padding: 8, paddingTop: 68, gap: 8, backgroundColor: themeConstants.colors.background }}>
        <ScrollView horizontal>
          {topicOptions.map((option, index) => (
            <Button 
              key={index}
              text={capitalizeFirstLetter(option)} 
              fitContent
              type={searchTopic === option ? 'active' : 'default'} 
              onPress={() => setSearchTopic(option)}
              textStyle={searchTopic === option ? { color: '#2B2B2B' } :{ }}
              style={{ marginRight: 8 }}
            />
          ))}
        </ScrollView>
        <SearchInput placeholder="Search..." searchTopic={searchTopic} callbackFunction={handleSearchResults}/>
      </YStack>
      <ScrollView style={{ width: '100%' }}>
        {searchResults.length > 0 && searchTopic === 'users' && (
          <XStack style={{ flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
            {searchResults.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => router.push(`user/${item.sub}?username=${item.username}${
                item?.picture !== '' && `&picture=${encodeURIComponent(item.picture)}`}`)} style={{ width: '33.33%' }}>
                <YStack style={{ gap: 8, padding: 12, paddingVertical: 16, justifyContent: 'flex-start' }}>
                  <Image
                    style={{ width: 64, height: 64, borderRadius: 12, overflow: 'hidden' }}
                    src={item?.picture ? item.picture : 'https://randomuser.me/api/portraits/men/1.jpg'}
                  />
                  <Text 
                    style={{ fontWeight: 500, }} 
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item.username}
                  </Text>
                </YStack>
              </TouchableOpacity>
            ))}
          </XStack>
        )}
        {facilities.length > 0 && searchTopic === 'fields' && (
          <YStack style={{ gap: 8 }}>
            {facilities.map((item, index) => (
              <TouchableOpacity key={index} style={styles.facilityCard} onPress={() => router.push(`field/${item.facility_id}`)} >
                <Image
                  style={{ height: 200, width: '100%' }}
                  src={item?.pictures[0] ? item.pictures[0] : 'https://randomuser.me/api/portraits/men/1.jpg'}
                />
                <YStack style={{ alignItems: 'flex-start', paddingVertical: 12, paddingHorizontal: 8 }}>
                  <Text style={{ fontSize: 18 }}>{item.name}</Text>
                  <Text style={{ fontSize: 14 }}>{item.address}</Text>
                </YStack>
              </TouchableOpacity>
            ))}
          </YStack>
        )}
      </ScrollView>
    </YStack>
  )
}

export default SearchTab

const styles = StyleSheet.create({
  facilityCard: {
    width: '100%', 
    flexDirection: 'column',
    overflow: 'hidden',
    
  }
  // container: {
  //   alignItems: 'center',
  //   padding: 8,

  // },
});