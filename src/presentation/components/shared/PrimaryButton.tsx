import React from 'react'
import { globalStyle } from '../../theme/theme'
import { Pressable, Text } from 'react-native'

interface Props{
    onPress: () => void;
    label: string
}

export const PrimaryButton = ({onPress, label} : Props) => {
  return (
    <Pressable 
        onPress={ () => onPress() }
        style={globalStyle.primaryButton}>
          <Text style={globalStyle.buttonText}>{label}</Text>
      </Pressable>
  )
}