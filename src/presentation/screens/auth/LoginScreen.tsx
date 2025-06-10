import React, { useState } from 'react'
import { Button, Input, Layout, Text } from '@ui-kitten/components'
import { ScrollView } from 'react-native-gesture-handler'
import { Alert, useWindowDimensions } from 'react-native'
import { MyIcon } from '../../components/ui/MyIcon'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParams } from '../../navigation/Navigation'
import { API_URL, STAGE } from '@env'
import { useAuthStore } from '../../store/auth/usAuthStore'

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'>{}

export const LoginScreen = ( { navigation }: Props) => {

  const { login } = useAuthStore();
  const [isPosting , setIsPosting] = useState(false);
  const [form, setForm] = useState({
    userName: '',
    password: ''
  });
  const { height } = useWindowDimensions();

   console.log({ apiUrl: API_URL, stage: STAGE });

  const onLogin = async() => {
    if( form.userName.length === 0 || form.password.length === 0){
      return;
    }
  
    setIsPosting(true);

    const wasSuccessful = await login(form.userName, form.password);
    setIsPosting(false);
    // console.log(wasSuccessful);
    if(wasSuccessful) return;
    Alert.alert('Error', 'Usuario o contraseña incorrectos');
  }


  return (
    <Layout style={{flex: 1}}>
      <ScrollView style={{ marginHorizontal: 40 }}>
        <Layout style={{paddingTop: height *0.35 }}>
          <Text category='h1'>Ingresar</Text>
          <Text category='p2'>Por favor, ingrese para continuar</Text>
        </Layout>

        <Layout style={{marginTop:20}}>
          <Input 
            placeholder='Usuario'
            autoCapitalize='none'
            value={ form.userName }
            onChangeText={ (userName) => setForm({ ...form, userName }) }
            accessoryLeft={ <MyIcon name='person-outline' />}
            style={{marginBottom:10}}
          />

          <Input 
            placeholder='Contraseña'
            secureTextEntry
            autoCapitalize='none'
            value={ form.password }
            onChangeText={ (password) => setForm({ ...form, password }) }
            accessoryLeft={ <MyIcon name='lock-outline' />}
            style={{marginBottom:10}}
          />

        </Layout>

        {/* <Text>{ JSON.stringify(form, null, 2)}</Text> */}

        <Layout style={{marginBottom: 10}} />

        <Layout>
          <Button 
            disabled={isPosting}
            accessoryRight={ <MyIcon name='arrow-forward-outline' />}
            onPress={ onLogin }>
            Ingresar
          </Button>
        </Layout>

        <Layout style={{marginBottom: 20}} />

        <Layout style={{
          alignItems: 'flex-end',
          flexDirection: 'row',
          justifyContent:'center'
        }}>
          <Text>¿No tienes cuenta?</Text>
          <Text 
            status='primary' 
            category='s1'
            onPress={ () => navigation.navigate('RegisterScreen') }
          > Regístrate</Text>
        </Layout>

      </ScrollView>
    </Layout>
  )
}