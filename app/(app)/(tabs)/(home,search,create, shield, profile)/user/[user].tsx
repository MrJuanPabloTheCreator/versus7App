import { StyleSheet, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import React from 'react'

import { Text, View, YStack } from 'components'

const User = () => {
  const { id, username, picture } = useLocalSearchParams()

  const pictureUrl = Array.isArray(picture) ? picture[0] : picture;

  return (
    <View style={styles.container}>
      <YStack style={{ gap: 8 }}>
        <Image
          style={{ width: 72, height: 72, borderRadius: 100, overflow: 'hidden' }}
          src={pictureUrl || 'https://randomuser.me/api/portraits/men/1.jpg'}
        />
        <Text>{username}</Text>
      </YStack>
    </View>
  )
}

export default User

const styles = StyleSheet.create({
  container: {
    padding: 12
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});