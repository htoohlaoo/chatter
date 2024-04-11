import { View, Text, Image, TouchableOpacity, Pressable, Alert } from 'react-native'
import React, { createRef, useReducer, useState } from 'react'

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import {Octicons} from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import { ActivityIndicator } from 'react-native';
import { useAuth } from '../context/authContext';
import CustomKeyboardView from '../components/CustomKeyboardView';
const signIn = () => {

  const router = useRouter();

  const emailRef = createRef("");
  const passwordRef=createRef("");

  const [loading,setLoading] = useState(false);
  const {login} = useAuth();

  const handleSubmit=async ()=>{
    if(!emailRef.current || !passwordRef.current ){
      console.log(emailRef.current,passwordRef.current)
      Alert.alert("Sign In",'Please fill in all the information!')
    }
    //login process
    setLoading(true);
    const response = await login(emailRef.current,passwordRef.current)
    if(response.success){
      router.replace('home')
      setLoading(false)
    }else{
      Alert.alert("Sign In",response.msg)
      setLoading(false)
    }
  }
  return (
    <CustomKeyboardView>
      <StatusBar style='dark' />
      <View style={{paddingTop:hp(8),paddingHorizontal:wp(5)}} className='flex-1 gap-12'>
        {/*      Sign In Image    */}
        <View className='items-center bg-red'>
          <Image resizeMode='contain' style={{height:hp(25)}} source={require('../assets/images/login.png')} />
        </View>
        
        <View 
          // style={{ marginTop: hp(3), paddingHorizontal: wp(3) }}
          className=''
        >
          <Text style={{ fontSize: hp(4), fontWeight: 'bold' }} className='text-center my-4 '>Sign In</Text>
          <View className='gap-4'>
              {/* Inputs */}
              <View style={styles.inputs}>
                <Octicons name='mail' size={hp(2.7)} color='gray' style={styles.icon} />
                <TextInput style={{fontSize:hp(2)}}
                          className='flex-1 font-semibold text-neutral-700 ml-2'
                          placeholder='Email address'
                          placeholderTextColor={'gray'}
                          onChangeText={(value)=>{emailRef.current=value}}
                />
              </View>
             
              <View style={{gap:hp(2)}}>
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
                <Text style={{fontSize:hp(1.8)}} className='text-right font-semibold text-neutral-500'>Forgot password?</Text>
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
                      onPress={handleSubmit}
                    >
                      <Text style={{fontSize:hp(2.7)}} className='text-white font-bold tracking-wider'>Sign In</Text>
                    </TouchableOpacity>
                  )
                }
              </View>
              
              <View className='flex-row justify-center items-center'>
                <Text style={{fontSize:hp(1.8)}} className="font-semibold text-neutral-500">Don't have an account? </Text>
                <Pressable onPress={()=>{router.push('signUp')}}>
                  <Text style={{fontSize:hp(1.8)}} className="font-bold text-indigo-500">Sign Up</Text>
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

export default signIn