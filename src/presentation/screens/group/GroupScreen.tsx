import React, { useContext, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { getGroup } from '../../../actions/group/get-group';
import { Button, Card, Icon, List } from '@ui-kitten/components';
import { useAuthStore } from '../../store/auth/usAuthStore';
import { getCountries } from '../../../actions/group/get-countries';
import { Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { MainLayout } from '../../layouts/MainLayout';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';

export const GroupScreen = () => {
  
  const {top} = useSafeAreaInsets();
  const { logout } = useAuthStore();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onPullToRefresh = async() => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  }
  
  const { isLoading, data: groups = [] } = useQuery({
    queryKey: ['groups'],
    staleTime: 1000 * 60 * 60, // 1 hour
    queryFn: () => getGroup()
  })

  const { isPending, data: countries = [] } = useQuery({
    queryKey: ['countries'],
    staleTime: 1000 * 60 * 60, // 1 hour
    queryFn: () => getCountries(),
    enabled: !!groups // Only fetch countries if groups are loaded
  })

  // console.log(JSON.stringify(groups, null, 2));
  // if(!groups){
  //   return (
  //     <FullScreenLoader />
  //   )
  // }

  return (
    <>
      {/* <MainLayout
        title='Titulo'
        subtitle='Aplicacion'> */}
          {
            isLoading ? (
              <FullScreenLoader />
            ):
            <ScrollView
              style={ { flex: 1, backgroundColor: '#294084'} }
              bounces={ false }
              showsVerticalScrollIndicator={ false }>
                <View style={ styles.headerContainer }>
                  <Text
                    style={ {
                      top: top + 5,
                      textAlign:'center',
                      color:'#f9f9f9',
                      fontSize: 20
                        } }>
                    FASE DE GRUPOS
                  </Text>
                </View>

                <View style={ { height: 10 } } />

                <FlatList
                  data={groups}
                  numColumns={2}
                  keyExtractor={ (item) => `${ item.idGrupo }` }
                  renderItem={ ({item}) => (
                    <Card
                      style={[styles.cardContainer]}
                    >
                      <View>
                        <Text style={styles.name} lineBreakMode='middle'>
                          GRUPO {item.descripcion}
                        </Text>
                      </View>
                      <View style={ { height: 20 } } />
                      <View>
                        { 
                          countries.map( c => (  
                            item.idGrupo === c.grupo.idGrupo ? <Pressable 
                                                                    style={styles.pressable}
                                                                    onPress={()=> console.log("aqui")}>
                                                                    <Text style={{textAlign:'center', fontWeight:'bold'}}> { c.nomPais.toUpperCase()  } </Text>
                                                                </Pressable> 
                                                              : ''
                          ))
                        }
                      </View>
                    </Card>
                  )}
                  refreshControl={
                    <RefreshControl 
                    refreshing= {isRefreshing}
                    onRefresh={onPullToRefresh}
                    />
                  }
                >
                </FlatList>
                
            </ScrollView>
          }
      {/* </MainLayout> */}

      <Button 
        accessoryLeft={ <Icon name='log-out-outline' /> }
        onPress={ logout }>
        Cerrar Sesión
      </Button>
  </>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 40,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
    backgroundColor: '#dd1d1c',
  },
  cardContainer: {
    marginHorizontal: 10,
    backgroundColor: '#1e3261',
    height: 220,
    flex: 0.5,
    marginBottom: 10,
    borderRadius: 20,
    borderColor:'#1e3261',
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
    // left: 10,
    backgroundColor: '#dd1d1c',
    borderRadius: 10,
    // marginBottom: 6,
     padding: 4,
     textAlign:'center'
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
  pressable:{
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    marginBottom: 6,
    padding: 4,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    // color: colors.text,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    // color: colors.text,
  },
});