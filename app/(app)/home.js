import { View, Text, Button } from 'react-native'
import React from 'react'
import { useAuth } from '../../context/authContext'

const home = () => {
  const {logout} = useAuth();
  const handleSignout=async ()=>{
    await logout();
  }


  return (
    <View className='flex-1 justify-center items-center'>
      <Text>home</Text>
      <Button title='Sign Out' onPress={handleSignout}/>
    </View>
  )
}

export default home