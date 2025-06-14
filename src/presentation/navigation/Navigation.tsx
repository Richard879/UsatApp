import React from 'react'
import { createStackNavigator, StackCardStyleInterpolator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/home/HomeScreen';
import { LoadingScreen } from '../screens/loading/LoadingScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { GroupScreen } from '../screens/group/GroupScreen';

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
          initialRouteName='LoadingScreen'
          screenOptions={{
              headerShown: false,
              // cardStyleInterpolator: fadeAnimation
          }}>
          <Stack.Screen options={{cardStyleInterpolator: fadeAnimation}} name="LoadingScreen" component={LoadingScreen} />
          <Stack.Screen options={{cardStyleInterpolator: fadeAnimation}} name="LoginScreen" component={LoginScreen} />
          <Stack.Screen options={{cardStyleInterpolator: fadeAnimation}} name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen options={{cardStyleInterpolator: fadeAnimation}} name="HomeScreen" component={HomeScreen} />
          <Stack.Screen options={{cardStyleInterpolator: fadeAnimation}} name="GroupScreen" component={GroupScreen} />
        </Stack.Navigator>
      )
}