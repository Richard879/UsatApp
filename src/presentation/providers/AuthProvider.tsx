import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../navigation/Navigation'
import { PropsWithChildren, useEffect } from 'react'
import { useAuthStore } from '../store/auth/usAuthStore'

export const AuthProvider = ({children}:PropsWithChildren) => {

    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
    const { checkStatus, status } = useAuthStore();

    useEffect(() => {
        checkStatus();
    }, []);
    
    useEffect(() => {
        console.log(status);
        if ( status !== 'checking' ) {
            if ( status === 'authenticated' ) {
              navigation.reset({
                index: 0,
                routes: [{ name: 'GroupScreen' }],
              })
            } else {
              navigation.reset({
                index: 0,
                routes: [{ name: 'LoginScreen' }],
              })
            }
          }
        }, [status]);

  return (
    <>
    { children }
    </>
  )
}