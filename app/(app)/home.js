import { View, Text, Button, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/authContext'
import { heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ChatList from '../../components/ChatList';
import { getDocs, query, where } from 'firebase/firestore';
import { usersRef } from '../../firebaseConfig';
const home = () => {
  const {logout,user} = useAuth();
  const [users,setUsers] = useState([1,2,3])


  useEffect(()=>{
    user?.uid && getUsers()
  },[])
  const handleSignout=async ()=>{
    await logout();
  }

  const getUsers = async () =>{
    //fetch users 
    const q = query(usersRef,where('userId','!=',user?.uid))
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach(doc => {
      data.push({...doc.data()});
    });

    setUsers(data);

  }


  return (
    <View className='flex-1 bg-white'>
      {
      (users?.length > 0 )
      ? <ChatList users={users} />
      :(
        <View className='flex items-center' style={{top:hp(30)}}>
          <ActivityIndicator size='large' color='indigo' />
        </View>
      )
      }
    </View>
  )
}

export default home