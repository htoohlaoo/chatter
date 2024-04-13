import { View, Text, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import React from 'react'
import { heightPercentageToDP as hp,widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { blurhash } from '../utils/common';

const ChatItem = ({item,noBorder,router}) => {

  const openChatRoom = ()=>{
    router.push({pathname:'/chatRoom',params:item})
  }
  return (
    <TouchableOpacity onPress={openChatRoom} className={`flex-row justify-between items-center mb-4 p-0 pb-2  ${(noBorder) && 'border-b border-b-neutral-200'} mx-4`} >
            <Image 
                // source={require('../assets/images/avatar.png')}
                source={{uri:item?.profileUri}}
                style={{height:hp(6),width:hp(6),borderRadius:100,marginRight:15}}
                placeholder={blurhash}
                transition={500}
            />
            {/* name and last message */}
            <View className='flex-1 gap-1'>
                <View className='flex-row justify-between'>
                    <Text style={{fontSize:hp(1.8)}} className='font-semibold text-neutral-800'>{item.username}</Text>
                    <Text style={{fontSize:hp(1.6)}} className='font-medium text-neutral-500'>Time</Text>
                </View>
                <Text style={{fontSize:hp(1.6)}} className='font-medium text-neutral-500'>Last message</Text>

            </View>
        
    </TouchableOpacity>
  )
}

export default ChatItem