import { useLocalSearchParams, useRouter } from 'expo-router/build/hooks';
import React, { useState } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import { getRef } from './refRegistry';
import { Place } from 'types/returnedDataTypes';
import { YStack, Text, Button, Input, LocationSearch, XStack } from 'components'
import useTheme from 'contexts/ThemeContext/useTheme';

const LocationPicker = () => {
  const { refId } = useLocalSearchParams();
  if (typeof refId !== 'string') return <Text>Invalid Ref Id</Text>;

  const refObject = getRef(refId);
  if (!refObject) return <Text>Invalid Ref</Text>;
  const { selectLocation } = refObject;

  const [value, setValue] = useState(refObject.location || null)
  const [searchResults, setSearchResults] = useState<Place[] | []>([])
  const router = useRouter()
  const { themeConstants } = useTheme()

  const handleSelectLocation = (location: Place) => {
    const formattedLocation = `${location.displayName.text} - ${location.shortFormattedAddress}`
    refObject.location = formattedLocation;
    selectLocation(formattedLocation);
    setValue(formattedLocation)
    router.back()
  };

  const handleRemoveLocation = () => {
    refObject.location = '',
    selectLocation('');
    setValue(null)
  }

  const handleSearchResults = (values: Place[], textInputValue: string) => {
    if(textInputValue === ''){
      setSearchResults([])
    } else {
      setSearchResults(values);
    }
  };
  

  return (
    <YStack style={{ padding: 8}}>
      <LocationSearch callbackFunction={handleSearchResults}/>
      {searchResults.length > 0 &&
        <ScrollView style={{ width: '100%'}}>
          {searchResults.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={{ padding: 12, marginBottom: 4 }}
              onPress={() => handleSelectLocation(item)}
            >
              <Text 
                style={{ width: '100%' }}
                numberOfLines={1}
              >{item.displayName.text} - {item.shortFormattedAddress}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      }
      {value && 
        <XStack
          style={{ 
            marginTop: 8,
            paddingVertical: 8,
            paddingHorizontal: 18, 
            paddingRight: 14,
            backgroundColor: themeConstants.colors.secondary ,
            borderRadius: 26, 
            justifyContent: 'space-between'
          }}
        >
          <Text 
            style={{ maxWidth: '90%' }}
            numberOfLines={1}
          >
            {value}
          </Text>
          <TouchableOpacity style={{ padding: 8 }} onPress={handleRemoveLocation}>
            <FontAwesome6 name="xmark" size={24} color="red" />
          </TouchableOpacity>
        </XStack>
      }
    </YStack>
  )
}

export default LocationPicker