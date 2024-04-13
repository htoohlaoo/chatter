import { Slot, useSegments,useRouter} from 'expo-router';
import { AuthContextProvider, useAuth } from '../context/authContext';
import { useEffect } from 'react';
import { MenuProvider } from 'react-native-popup-menu';


const MainLayout = () =>{
    const {isAuthenticated} = useAuth();
    const segments = useSegments();
    const router = useRouter();
    useEffect(()=>{
        //check if use is authenticated
        if(typeof isAuthenticated=='undefined') return;

        const inApp = segments[0]=='(app)';

        if(isAuthenticated && !inApp){
            //is authenticated and not in home -> redirect to home
            router.replace('home');
        }else if(isAuthenticated==false){
            //is not authenticated -> redirect to signin
            router.replace('signIn');
        }
    },[isAuthenticated])

    return <Slot />
}


export default function RootLayout() {
  return (
    <MenuProvider>
        <AuthContextProvider>
            <MainLayout />
        </AuthContextProvider>
    </MenuProvider>
  );
}