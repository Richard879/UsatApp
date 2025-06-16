import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../navigation/Navigation'
import { PropsWithChildren, useEffect, useState } from 'react'
//import { useAuthStore } from '../store/useAuthStore'
import { TokenServiceImpl } from '../../infrastructure/services/TokenServiceImpl'
import { ActivityIndicator, View } from 'react-native'

export const AuthProvider = ({children}:PropsWithChildren) => {

    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
    //const { checkStatus, status } = useAuthStore();

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      const checkAuth = async () => {
        const tokenService = new TokenServiceImpl();
        const token = await tokenService.getToken();
        setIsAuthenticated(!!token);
        setLoading(false);
      };
      
      checkAuth();
    }, []);
    


    if ( isAuthenticated  ) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'HomeScreen' }],
      })
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'LoginScreen' }],
      })
    }

  return (
    <>
    { children }
    </>
  )
}