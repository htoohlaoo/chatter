import { View, Text, Platform } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Image} from 'expo-image'

import { blurhash } from '../utils/common';
import { useAuth } from '../context/authContext';

import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';
import { MenuItem } from './CustomMenuItem';
import { AntDesign, Feather } from '@expo/vector-icons';

const ios = Platform.OS == 'ios';

const HomeHeader = () => {
    const {top} = useSafeAreaInsets();
    const {user,logout} = useAuth();
    // const defaultProfile = "https://picsum.photos/seed/696/3000/2000";

    const handleProfile = () =>{
        console.log('Profile handled')
    }
    const handleLogout = async () =>{
        console.log('Profile logout')
        await logout();
    }
  return (
    <View style={{paddingTop:ios?top:top+10}} className="flex-row justify-between px-5 pb-6 bg-indigo-400 rounded-b-3xl shadow-md">
      <View>
        <Text style={{fontSize:hp(3)}} className='font-medium text-white' >Chat</Text>
      </View>
      <View>
        <Menu>
            <MenuTrigger customStyles={{
                triggerWrapper:{
                    //trigger wrapper styles
                }
            }}>
                <Image
                    style={{height:hp(4.3),aspectRatio:1,borderRadius:100}}
                    source={user?.profileUrl}
                    placeholder={blurhash}
                    transition={500}
                />
            </MenuTrigger>
            <MenuOptions
                customStyles={{
                    optionsContainer:{
                        borderRadius:10,
                        borderCurve:'continuous',
                        marginTop:40,
                        marginLeft:-30,
                        backgroundColor:'white',
                        shadowOpacity:0.2,
                        shadowOffset:{width:0,height:0},
                        width:160
                    }
                }}
            >
                <MenuItem 
                    text='Profile'
                    action={handleProfile}
                    value={null}
                    icon={<Feather name='user' size={hp(2.5)} color='#737373' />} 
                />
                <MenuItem 
                    text='Logout'
                    action={handleLogout}
                    value={null}
                    icon={<AntDesign name='logout' size={hp(2.5)} color='#737373' />} 
                />
            </MenuOptions>
        </Menu>
        
      </View>
    </View>
  )
}

export default HomeHeader