import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { Image } from 'expo-image'
import React,{useEffect,useState} from 'react'
import { heightPercentageToDP as hp,widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { blurhash, formatDate } from '../utils/common';

import { getRoomId } from '../utils/common';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebaseConfig';
const ChatItem = ({item,currentUser,noBorder,router}) => {

  const [lastMessage,setLastMessage] = useState(undefined)

  useEffect(()=>{
  
    let roomId = getRoomId(currentUser?.userId,item?.userId);
    let docRef = doc(db,'rooms',roomId);
    const messagesRef = collection(docRef,'messages');
    const q = query(messagesRef,orderBy('createdAt','desc'));

    let unsub = onSnapshot(q,(snapshot)=>{
      let allMessages = snapshot.docs.map(doc=>{
        return doc.data();
      })
      //set last message
      setLastMessage(allMessages[0]?allMessages[0]:null );
      return unsub;
    });
    
    // console.log("Effect runs")
   
  },[]);
  const openChatRoom = ()=>{
    router.push({pathname:'/chatRoom',params:item})
  }

  const renderTime=()=>{
    if(lastMessage){
      let date = lastMessage.createdAt;
      return formatDate(new Date(date?.seconds*1000))
    }
  }

  const renderLastMessage=()=>{
      
      if(typeof lastMessage=='undefined') return "Loading..."
      if(lastMessage){
        if(currentUser?.userId == lastMessage?.userId ) return "You: "+lastMessage?.text;
        return lastMessage?.text;
      }else{
        return "Say Hi 👋"
      }
    
  }

  return (
    <TouchableOpacity onPress={openChatRoom} className={`flex-row justify-between items-center mb-4 p-0 pb-2  ${(noBorder) && 'border-b border-b-neutral-200'} mx-4`} >
            <Image 
                // source={require('../assets/images/avatar.png')}
                source={{uri:item?.profileUrl}}
                style={{height:hp(6),width:hp(6),borderRadius:100,marginRight:15}}
                placeholder={blurhash}
                transition={500}
            />
            {/* name and last message */}
            <View className='flex-1 gap-1'>
                <View className='flex-row justify-between'>
                    <Text style={{fontSize:hp(1.8)}} className='font-semibold text-neutral-800'>{item.username}</Text>
                    <Text style={{fontSize:hp(1.6)}} className='font-medium text-neutral-500'>{renderTime()}</Text>
                </View>
                <Text style={{fontSize:hp(1.6)}} className='font-medium text-neutral-500'>{renderLastMessage()}</Text>
            </View>
    </TouchableOpacity>
  )
}

export default ChatItem