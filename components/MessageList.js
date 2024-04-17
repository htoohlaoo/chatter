import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import MessageItem from './MessageItem'

const MessageList = ({messages,currentUser,scrollViewRef}) => {
  return (
    <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false} contentContainerStyle={{paddingTop: 10}}>
      {messages.map((message,index)=>(
        <MessageItem 
          message={message} key={index} currentUser={currentUser}
        />
      ))}
    </ScrollView>
  )
}

export default MessageList