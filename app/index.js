import { View, Text } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native'

export default function index() {
  return (
    <View className='flex-1 items-center justify-center'>
      <ActivityIndicator size='large' color='gray' />
    </View>
  )
}