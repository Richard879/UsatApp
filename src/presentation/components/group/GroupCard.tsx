import { StyleSheet } from 'react-native'
import React from 'react'
import { Group } from '../../../domain/entities/group'
import { Card, Text } from '@ui-kitten/components';

interface Props {
    group: Group;
}

export const GroupCard = ({group}: Props) => {
  return (
      <Card
      style={[styles.cardContainer]}
        >
        <Text style={styles.name} lineBreakMode='middle'>
           Grupo: {group.descripcion}
        </Text>
      </Card>
  )
}

const styles = StyleSheet.create({
    cardContainer: {
      marginHorizontal: 10,
      backgroundColor: 'grey',
      height: 120,
      flex: 0.5,
      marginBottom: 25,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
  
      elevation: 5,
    },
    name: {
      color: 'white',
      top: 10,
      left: 10,
    },
    pokeball: {
      width: 100,
      height: 100,
      right: -25,
      top: -25,
      opacity: 0.4,
    },
    pokemonImage: {
      width: 120,
      height: 120,
      position: 'absolute',
      right: -15,
      top: -30,
    },
  
    pokeballContainer: {
      alignItems: 'flex-end',
      width: '100%',
      position: 'absolute',
  
      overflow: 'hidden',
      opacity: 0.5,
    },
  });