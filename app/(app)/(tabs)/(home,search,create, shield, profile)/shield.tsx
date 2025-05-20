import { Text, View, XStack, YStack } from 'components'
import React from 'react'

import { Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const teamsInfo = [
  {
    teamName: "Calceteam",
    picture: require('assets/calceteam.jpg'),
  },
  {
    teamName: "Calceteam",
    picture: require('assets/calceteam.jpg'),
  },
  {
    teamName: "Calceteam",
    picture: require('assets/calceteam.jpg'),
  }
]


const ShieldTab = () => {
  return (
    <View style={styles.container}>
      <YStack style={{ alignItems: 'flex-start'}}>
        <Text style={{ fontSize: 28, fontWeight: 600, padding: 12 }}>
          Services
        </Text>
        <ScrollView horizontal>
          <XStack style={{ gap: 12, paddingLeft: 12 }}>
            <YStack fitContent style={{ alignItems: 'flex-start'}}>
              <Image
                style={{ width: 240, height: 160, borderRadius: 20 }}
                source={require('assets/referee.png')}
              />
              <Text style={{ fontSize: 18, fontWeight: 500, paddingTop: 8 }}>Referee</Text>
              <Text style={{ color: 'gray' }}>Hire a Referee</Text>
            </YStack>
            <YStack fitContent style={{ alignItems: 'flex-start'}}>
              <Image
                style={{ width: 240, height: 160, borderRadius: 20 }}
                source={require('assets/photographer.png')}
              />
              <Text style={{ fontSize: 18, fontWeight: 500, paddingTop: 8 }}>Photographer</Text>
              <Text style={{ color: 'gray' }}>Hire a photographer</Text>
            </YStack>
          </XStack>
        </ScrollView>
      </YStack>
    </View>
  )
}

export default ShieldTab

const styles = StyleSheet.create({
  container: {
    // padding: 16
  }
})

