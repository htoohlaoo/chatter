import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const chatRoom = () => {
    const item = useLocalSearchParams()
  return (
    <View>
      <Text>chatroom</Text>
    </View>
  )
}

export default chatRoom