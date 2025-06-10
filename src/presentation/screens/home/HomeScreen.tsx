import React from 'react'
import { useAuthStore } from '../../store/auth/usAuthStore'
import { getGroup } from '../../../actions/group/get-group';
import { MainLayout } from '../../layouts/MainLayout';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { useQuery } from '@tanstack/react-query';
import { Text } from 'react-native-svg';

export const HomeScreen = () => {

  const { logout } = useAuthStore();

  const { isLoading, data: groups = [] } = useQuery({
    queryKey: ['groups'],
    staleTime: 1000 * 60 * 60, // 1 hour
    queryFn: () => getGroup()
  })
  
  // getGroup();

  return (
      <MainLayout
        title='Titulo'
        subtitle='Aplicacion'
        >
          {
            isLoading ? (
              <FullScreenLoader />
            ):
            <Text></Text>
          }
          
      </MainLayout>
  )
}