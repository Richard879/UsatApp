import React from 'react'
import { MainLayout } from '../../layouts/MainLayout';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { useQuery } from '@tanstack/react-query';
import { Text } from 'react-native-svg';

export const HomeScreen = () => {

  
  // getGroup();

  return (
      <MainLayout
        title='Titulo'
        subtitle='Aplicacion'
        >
          
              
 
            <Text>Hola</Text>

          
      </MainLayout>
  )
}