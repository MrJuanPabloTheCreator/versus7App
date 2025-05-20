import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Octicons from '@expo/vector-icons/Octicons';

import { View, Button, XStack, SearchInput, YStack, Text } from 'components'
import { useRouter } from 'expo-router';
import { facilities, tournaments } from 'constants/fakeData';
import useTheme from 'contexts/ThemeContext/useTheme';
import Sticker from '@components/sticker';

const topicOptions = ['All','Posts','Fields','Users','Teams','Matches','Tournaments']

interface UserInfo {
  sub: string;
  username: string;
  picture: string;
}

interface SearchResultsTypes {
  values: UserInfo[] | []
}

const SearchTab = () => {
  const [searchTopic, setSearchTopic] = useState<any>(topicOptions[0])
  const [searchResults, setSearchResults] = useState<UserInfo[]>([])
  const [filter, setFilter] = useState(false)

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
    <YStack style={{ backgroundColor: themeConstants.colors.background }}>
      <YStack style={{ paddingTop: 44, backgroundColor: themeConstants.colors.background }}>
        <XStack style={{ paddingHorizontal: 12, gap: 8 }}>
          <SearchInput fitContent placeholder={`Search ${searchTopic}...`} searchTopic={searchTopic} callbackFunction={handleSearchResults}/>
          <Button 
            fitContent style={{ paddingHorizontal: 14, borderRadius: 24, height: '100%' }}
            onPress={() => router.push('search/filter')}
          >
            <Octicons name="filter" size={20} color={filter ? themeConstants.colors.primary : "white"}/>
          </Button>
        </XStack>
        <ScrollView horizontal style={{ paddingLeft: 12, paddingVertical: 8 }}>
          {topicOptions.map((option, index) => (
            <TouchableOpacity 
              key={index} 
              onPress={() => setSearchTopic(option)}
              style={{
                paddingVertical: 12, paddingHorizontal: 24, borderWidth: 2, 
                backgroundColor: themeConstants.colors.secondary, borderRadius: 28, padding: 8,
                borderColor: searchTopic === option ? themeConstants.colors.primary : themeConstants.colors.background 
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: '600', color: searchTopic === option ? themeConstants.colors.primary : 'white' }}>{option}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </YStack>
      <ScrollView style={{ width: '100%' }}>
        {searchResults.length > 0 && searchTopic === 'Users' && (
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
        {facilities.length > 0 && searchTopic === 'Fields' && (
          <YStack style={{ gap: 16, padding: 12, paddingTop: 0 }}>
            {facilities.map((item, index) => (
              <TouchableOpacity key={index} style={[styles.facilityCard, { backgroundColor: themeConstants.colors.background }]} onPress={() => router.push(`field/${item.facility_id}`)} >
                <Image
                  style={{ height: 200, width: '100%', borderRadius: 14 }}
                  src={item?.pictures[0] ? item.pictures[0] : 'https://randomuser.me/api/portraits/men/1.jpg'}
                />
                <YStack style={{ alignItems: 'flex-start', paddingVertical: 8 }}>
                  <Text style={{ fontSize: 20, fontWeight: 500 }}>{item.name}</Text>
                  <XStack style={{ justifyContent: 'flex-start' }}>
                    <Text style={{ fontSize: 14, color: 'gray' }}>7 v 7 </Text>
                    <Text style={{ fontSize: 14, color: themeConstants.colors.primary }}>$42</Text>
                  </XStack>
                  <Text style={{ fontSize: 14, color: 'gray' }}>{item.address}</Text>
                </YStack>
              </TouchableOpacity>
            ))}
          </YStack>
        )}
        {tournaments.length > 0 && searchTopic === 'Tournaments' && (
          <YStack style={{ gap: 8, padding: 12 }}>
            {tournaments.map((item, index) => (
              <TouchableOpacity key={index} style={[styles.tournamentCard, { backgroundColor: themeConstants.colors.background }]} onPress={() => router.push(`tournament/${item.tournament_id}`)} >
                <Image
                  style={{ height: 200, width: '100%' }}
                  source={require('assets/tournament1.png')}
                />
                <YStack style={{ alignItems: 'flex-start', padding: 16 }}>
                  <XStack style={{ justifyContent: 'flex-start', alignItems: 'flex-end' }}>
                    <Text style={{ fontSize: 24, fontWeight: 600, color: themeConstants.colors.primary }}>${item.price}</Text>
                    <Text style={{ fontSize: 18, fontWeight: 600, color: 'gray' }}>/Match</Text>
                  </XStack>
                  <Text style={{ fontSize: 20, fontWeight: 500, }}>{item.name}</Text>
                  <Text style={{ fontSize: 14, color: 'gray' }}>{item.address}</Text>
                  <XStack style={{ gap: 8, justifyContent: 'flex-start', paddingTop: 8 }}>
                    <Sticker type='purple' text='7 vs 7'/>
                    <Sticker type='blue' text='4-6 matches'/>
                    <Sticker type='yellow' text='Turf'/>
                  </XStack>
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
  },
  tournamentCard: {
    width: '100%', 
    flexDirection: 'column',
    overflow: 'hidden',
    borderRadius: 12
  }
  // container: {
  //   alignItems: 'center',
  //   padding: 8,

  // },
});