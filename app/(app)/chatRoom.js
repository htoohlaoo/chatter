import { View, Text, StatusBar, TouchableOpacity, Alert, Keyboard } from 'react-native'
import React,{createRef, useEffect, useRef, useState} from 'react'
import { useLocalSearchParams ,useRouter} from 'expo-router'
import ChatRoomHeader from '../../components/ChatRoomHeader'
import MessageList from '../../components/MessageList'
import { TextInput } from 'react-native-gesture-handler'
import { heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Feather } from '@expo/vector-icons'
import CustomKeyboardView from '../../components/CustomKeyboardView'
import { useAuth } from '../../context/authContext'
import { Timestamp, collection, doc, setDoc,addDoc, query, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebaseConfig'
import { getRoomId } from '../../utils/common'
import { create } from 'react-test-renderer'
const chatRoom = () => {
    const item = useLocalSearchParams();//second user
    const router = useRouter();
    const [messages,setMessages] = useState([]);
    const {user} = useAuth(); //logged in user
    const textRef = useRef('');
    const inputRef = useRef(null);
    const scrollViewRef = useRef(null);

    useEffect(()=>{
      createRoomIfNotExists();
      let roomId = getRoomId(user?.userId,item?.userId);
      let docRef = doc(db,'rooms',roomId);
      const messagesRef = collection(docRef,'messages');
      const q = query(messagesRef,orderBy('createdAt','asc'));
      let unsub = onSnapshot(q,(snapshot)=>{
        let allMessages = snapshot.docs.map(doc=>{
          return doc.data();
        })
        setMessages([...allMessages]);
      })

      const KeyboardDidShowListener = Keyboard.addListener('keyboardDidShow',updateScrollView)
      return ()=>{
        unsub();
        KeyboardDidShowListener.remove();
      }
    });

    useEffect(()=>{// auto scroll to end
      updateScrollView();
    },[messages])

    const updateScrollView = () =>{
      setTimeout(()=>scrollViewRef?.current?.scrollToEnd(),100);
    }
    const createRoomIfNotExists = async ()=>{
      const roomId = getRoomId(user?.userId,item?.userId);
      await setDoc(doc(db,'rooms',roomId),{
        roomId,
        createdAt:Timestamp.fromDate(new Date()),
      });
    }

    const handleSendMessage = async () =>{
      const message = textRef.current?.trim();
      if(!message) return;
      let roomId = getRoomId(user?.userId,item?.userId);
      // console.log('roomId',roomId)
      const docRef = doc(db,'rooms',roomId);
      const messagesRef = collection(docRef,'messages');
      textRef.current="";
      if(inputRef) inputRef?.current?.clear();
      const newDoc = await addDoc(messagesRef,{
        userId:user?.userId,
        text:message,
        profileUrl:user?.profileUrl,
        senderName:user?.username,
        createdAt:Timestamp.fromDate(new Date())
      })
     
    }

    return (
    <CustomKeyboardView inChat={true}>
    <View className='flex-1 bg-white'>
      <StatusBar style='dark'/>
      <ChatRoomHeader user={item} router={router} />
      <View className='h-3 border-b border-neutral-300'></View>
      <View className='flex-1 bg-neutral-100 justify-between overflow-visible'>
        <View className='flex-1'>
          <MessageList scrollViewRef={scrollViewRef} messages={messages} currentUser={user} />
        </View>
        <View style={{marginBottom:hp(1.7)}} className='pt-2'>
          <View className='flex-row justify-between bg-white border p-2 border-neutral-300 rounded-full pl-5 mx-3'>
            <TextInput 
              ref={inputRef}
              placeholder='Type message...'
              style={{fontSize:hp(2)}}
              className='flex-1 mr-2'
              onChangeText={(value)=>{textRef.current = value}}
            />
            <TouchableOpacity className='bg-neutral-200 p-2 mr-[1px] rounded-full' onPress={handleSendMessage}>
              <Feather name='send' size={hp(2.7)} color="#737373" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
    </CustomKeyboardView>
  )
}

export default chatRoom