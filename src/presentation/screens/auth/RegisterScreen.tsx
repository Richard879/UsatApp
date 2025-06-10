import { View, ScrollView, useWindowDimensions } from 'react-native'
import React from 'react'
import { Button, Input, Layout, Text } from '@ui-kitten/components'
import { MyIcon } from '../../components/ui/MyIcon'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParams } from '../../navigation/Navigation'

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'>{}

const { height } = useWindowDimensions();

export const RegisterScreen = ({ navigation }: Props) => {
  return (
    <Layout style={{flex: 1}}>
      <ScrollView style={{ marginHorizontal: 40 }}>
        <Layout style={{paddingTop: height *0.35 }}>
          <Text category='h1'>Crear cuenta</Text>
          <Text category='p2'>Por favor, crea una cuenta para continuar</Text>
        </Layout>

        <Layout style={{marginTop:20}}>
          <Input 
            placeholder='Usuario'
            autoCapitalize='none'
            accessoryLeft={ <MyIcon name='person-outline' />}
            style={{marginBottom:10}}
          />

          <Input 
            placeholder='Contraseña'
            secureTextEntry
            autoCapitalize='none'
            accessoryLeft={ <MyIcon name='lock-outline' />}
            style={{marginBottom:10}}
          />

        </Layout>

        <Layout style={{marginBottom: 10}} />

        <Layout>
          <Button 
            accessoryRight={ <MyIcon name='arrow-forward-outline' />}
            onPress={ () => {}}>
            Registrar
          </Button>
        </Layout>

        <Layout style={{marginBottom: 20}} />

        <Layout style={{
          alignItems: 'flex-end',
          flexDirection: 'row',
          justifyContent:'center'
        }}>
          <Text>¿Ya tienes cuenta?</Text>
          <Text 
            status='primary' 
            category='s1'
            onPress={ () => navigation.goBack() }
          > Ingresar</Text>
        </Layout>

      </ScrollView>
    </Layout>
  )
}