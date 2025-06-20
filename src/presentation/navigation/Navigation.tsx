import React, { useEffect, useState } from 'react'
import { createStackNavigator, StackCardStyleInterpolator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/home/HomeScreen';
import { LoadingScreen } from '../screens/loading/LoadingScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';

export type RootStackParams = {
  LoadingScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  HomeScreen: undefined;
  GroupScreen: undefined;
}

const Stack = createStackNavigator<RootStackParams>();

const fadeAnimation: StackCardStyleInterpolator = ({ current}) => {
    return {
      cardStyle:{
        opacity: current.progress
      }
    }
}

export const Navigation = () => {

   
    return (
        <Stack.Navigator 
          initialRouteName='LoginScreen'
          screenOptions={{
              headerShown: false,
              // cardStyleInterpolator: fadeAnimation
          }}>
          <Stack.Screen options={{cardStyleInterpolator: fadeAnimation}} name="HomeScreen" component={HomeScreen} />
          <Stack.Screen options={{cardStyleInterpolator: fadeAnimation}} name="LoginScreen" component={LoginScreen} />
          <Stack.Screen options={{cardStyleInterpolator: fadeAnimation}} name="RegisterScreen" component={RegisterScreen} />
        </Stack.Navigator>
      )
}