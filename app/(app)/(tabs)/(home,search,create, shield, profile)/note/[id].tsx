import { StyleSheet, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import React from 'react'

import { Text, View } from 'components';
import useTheme from 'contexts/ThemeContext/useTheme';

const Note = () => {
  const { id } = useLocalSearchParams();
  const { themeConstants } = useTheme();

  return (
    <View style={{ backgroundColor: themeConstants.colors.background }}>
      <Text>
        {id}
      </Text>
    </View>
  )
}

export default Note