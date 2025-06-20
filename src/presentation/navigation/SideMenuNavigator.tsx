import React from 'react'
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { globalColors } from '../theme/theme';
import { useWindowDimensions, View } from 'react-native';
import { MyIcon } from '../components/ui/MyIcon';
//import { BottomTabNavigator } from './BottomTabNavigator';
//import { IonIcon } from '../components/shared/IonIcon';

const Drawer = createDrawerNavigator();

export const SideMenuNavigator = () => {

    const dimensions = useWindowDimensions();

    return (
      <Drawer.Navigator

        drawerContent={ (props) => <CustomDrawerContent { ...props} />}

        screenOptions={{
          // drawerType: 'slide',
          drawerType: dimensions.width >= 758 ? 'permanent' : 'slide',
          headerShown: false,
          drawerActiveBackgroundColor: globalColors.primary,
          drawerActiveTintColor: 'white',
          drawerInactiveTintColor: globalColors.primary,
          drawerItemStyle:{
            borderRadius: 100,
            paddingHorizontal: 20
          }
        }}
      >
        {/* <Drawer.Screen name="StackNavigator" component={StackNavigation} /> */}
        <Drawer.Screen options={{ drawerIcon: ({color}) => (<MyIcon name="person-circle-outline" color={color} />)}} name="Profile" component={ProfileScreen} />
      </Drawer.Navigator>
    );
  }

  const CustomDrawerContent = ( props: DrawerContentComponentProps ) => {
    return (
      <DrawerContentScrollView>
        <View
          style = {{ 
            height:200,
            backgroundColor: globalColors.primary,
            margin:30,
            borderRadius: 50
          }}
        />
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    )
  }