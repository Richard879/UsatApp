import React, { useState } from 'react'
import { Button, Input, Layout, Text } from '@ui-kitten/components'
import { ScrollView } from 'react-native-gesture-handler'
import { Alert, useWindowDimensions } from 'react-native'
import { MyIcon } from '../../components/ui/MyIcon'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParams } from '../../navigation/Navigation'
import { API_URL, STAGE } from '@env'
import { authSlice } from '../../store/authSlice'
import { AuthRepositoryImpl } from '../../../infrastructure/repositories/AuthRepositoryImpl'
import { LoginUser } from '../../../core/usecases/LoginUser'
import { TokenServiceImpl } from '../../../infrastructure/services/TokenServiceImpl'

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'>{}

export const LoginScreen = ( { navigation }: Props) => {

  const { loginSuccess, loginFailure } = authSlice();
  const [isPosting , setIsPosting] = useState(false);
  const [form, setForm] = useState({
    userName: '',
    password: ''
  });
  const { height } = useWindowDimensions();

  console.log({ apiUrl: API_URL, stage: STAGE });

  const onLogin = async() => {

    try {
      if( form.userName.length === 0 || form.password.length === 0){
        return;
      }
  
      setIsPosting(true);

      //const wasSuccessful = await login(form.userName, form.password);

      const authRepository = new AuthRepositoryImpl();
      const loginUseCase = new LoginUser(authRepository);
      const auth = await loginUseCase.execute(form.userName, form.password);
      
      setIsPosting(false);

      if (!auth) {
        Alert.alert('Error', 'Usuario o contraseña incorrectos');
        return;
      }

     // Guardar token (aquí podrías inyectar el TokenService)
      const tokenService = new TokenServiceImpl();
      await tokenService.saveToken(auth.token);
      if (auth.refreshToken) {
        await tokenService.saveRefreshToken(auth.refreshToken);
      }
      
      loginSuccess(auth);

      navigation.navigate("HomeScreen");
    
    } catch (error) {
      loginFailure('Usuario o contraseña incorrectos');
      setIsPosting(false);
      console.error('Error during login:', error);
    }
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