import { View, Text } from 'react-native'
import React from 'react'
import { Layout, Spinner } from '@ui-kitten/components'

export const LoadingScreen = () => {
  return (
    <Layout style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
      <Spinner status='primary' size='large'></Spinner>
    </Layout>
  )
}