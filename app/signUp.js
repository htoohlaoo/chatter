import { View, Text, Image, TouchableOpacity, Pressable, Alert } from 'react-native'
import React, { createRef, useState } from 'react'

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import {Octicons} from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import { ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { KeyboardAvoidingView } from 'react-native-web';
import CustomKeyboardView from '../components/CustomKeyboardView';
import { useAuth } from '../context/authContext';
const signUp = () => {

  const router = useRouter();

  const emailRef = createRef("");
  const passwordRef=createRef("");
  const usernameRef = createRef("");
  const profileRef=createRef("");

  const [loading,setLoading] = useState(false);

  const {register} = useAuth();

  const handleRegister=async ()=>{
    console.log(emailRef.current,passwordRef.current,usernameRef.current,profileRef.current)
    if(!emailRef.current || !passwordRef.current || !usernameRef.current || !profileRef.current ){
      Alert.alert("Sign Up",'Please fill in all the information!')
      return
    }
    setLoading(true);
    //register
    const response = await register(emailRef.current,passwordRef.current,usernameRef.current,profileRef.current);
    setLoading(false);
    if(!response.success){
      Alert.alert("Sign Up",response.msg)
    }else{
      Alert.alert("Sign Up ",'Sign Up Process Successful!')
    }

  }
  return (
    
    <CustomKeyboardView>
      <StatusBar style='dark' />
      <View style={{paddingTop:hp(8),paddingHorizontal:wp(5)}} className='flex-1 gap-6'>
        {/*      Sign Up Image    */}
        <View className='items-center '>
          <Image resizeMode='contain' style={{height:hp(18)}} source={require('../assets/images/register.png')} />
        </View>
        {/* <View className='gap-10 bg-red-900'>
          <Text style={{fontSize:hp(4)}} className=' font-bold tracking-wider  text-neutral-800 '>Sign In</Text>
          <View style={{height:hp(7)}} className='flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl'>
            <Octicons name='mail' size={hp(2.7)} color='gray' />
          </View>
        </View> 
        */}
        <View 
          // style={{ marginTop: hp(3), paddingHorizontal: wp(3) }}
          className=''
        >
          <Text style={{ fontSize: hp(4), fontWeight: 'bold' }} className='text-center my-4 '>Sign Up</Text>
          <View className='gap-4'>
              {/* Inputs */}
              <View style={styles.inputs}>
                <Feather name='user' size={hp(2.7)} color='gray' className='bg-red-500' style={styles.icon} />
                <TextInput style={{fontSize:hp(2)}}
                          className='flex-1 font-semibold text-neutral-700 ml-2'
                          placeholder='Username'
                          placeholderTextColor={'gray'}
                          onChangeText={(value)=>{usernameRef.current=value}}
                          
                />
              </View>


              <View style={styles.inputs}>
                <Octicons name='mail' size={hp(2.7)} color='gray' style={styles.icon} />
                <TextInput style={{fontSize:hp(2)}}
                          className='flex-1 font-semibold text-neutral-700 flex-10 ml-2'
                          placeholder='Email address'
                          placeholderTextColor={'gray'}
                          onChangeText={(value)=>{emailRef.current=value}}
                />
              </View>

              
             
             
             
              <View style={styles.inputs}>
                <Octicons name='lock' size={hp(2.7)} color='gray' style={styles.icon} />
                <TextInput style={{fontSize:hp(2)}}
                          className='flex-1 font-semibold text-neutral-700 ml-2'
                          placeholder='Password'
                          placeholderTextColor={'gray'}
                          onChangeText={(value)=>{passwordRef.current=value}}
                          secureTextEntry
                />
              </View>
              <View style={styles.inputs}>
                <Octicons name='image' size={hp(2.7)} color='gray' style={styles.icon} />
                <TextInput style={{fontSize:hp(2)}}
                          className='flex-1 font-semibold text-neutral-700 ml-2'
                          placeholder='Profile Url'
                          placeholderTextColor={'gray'}
                          onChangeText={(value)=>{profileRef.current=value}}
                />
              </View>
                
              
              {/* submit btn */}
              <View>
                {
                  loading
                  ?(<View className='flex-row justify-center'>
                    <ActivityIndicator size='large' color='gray' />
                  </View>)
                  :(
                    <TouchableOpacity className='bg-indigo-500 rounded-xl justify-center items-center' style={{height:hp(6)}}
                      onPress={handleRegister}
                    >
                      <Text style={{fontSize:hp(2.7)}} className='text-white font-bold tracking-wider'>Sign Up</Text>
                    </TouchableOpacity>
                  )
                }
              </View>
              
              <View className='flex-row justify-center items-center'>
                <Text style={{fontSize:hp(1.8)}} className="font-semibold text-neutral-500">Already have an account? </Text>
                <Pressable onPress={()=>{router.push('signIn')}}>
                  <Text style={{fontSize:hp(1.8)}} className="font-bold text-indigo-500">Sign In</Text>
                </Pressable>
                
              </View>
          </View>
          
        </View>

      </View>
    </CustomKeyboardView>
   
  )
}

const styles = StyleSheet.create({
  inputs:{ 
    height: hp(7), 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#eee', 
    borderRadius: 20, 
    paddingHorizontal: wp(4),           // style={{ marginTop: hp(3), paddingHorizontal: wp(3) }}
    marginTop: hp(2),
  },
  icon:{
    width:hp(2.7),
    maxWidth:hp(2.7)
  }
})

export default signUp