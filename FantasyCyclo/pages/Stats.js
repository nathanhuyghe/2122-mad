import {
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    View, Text
} from "react-native"
import H2 from "../components/H2"
import Stat from "../components/Stat"
import React, { useEffect, useState } from "react"
import { db } from "../firebase"
import Icon from "react-native-vector-icons/FontAwesome"
import AsyncStorage from '@react-native-async-storage/async-storage'


function Stats({navigation}) {
    const [wins, setWins] = useState()
    const [podiums, setPodiums] = useState()
    const [riders, setRiders] = useState()

    useEffect(() => {
        getData()
    },[])

    

    const getData = () => {
        try{
            AsyncStorage.getItem('riders')        
            .then(value => {
                setRiders(JSON.parse(value))
            })

            AsyncStorage.getItem('podiums')
            .then(value => {
                setPodiums(JSON.parse(value))
            })

            AsyncStorage.getItem('wins')
            .then(value => {
                setWins(JSON.parse(value))
            })
        } catch(error) {
            console.log(error)
        }
    }

    

    return (
        <View style={{flex : 1}}>
        <ScrollView style={styles.container}>
            <H2 h2={"2021/22 Statistics"}/>
            <View style={styles.row}>
            {
                riders?.map(rider => {
                    if(rider.id === wins){     
                        return <Stat number="Most wins:" stat={rider.firstname + ' ' + rider.name} />
                    }
                })
            }

{
                riders?.map(rider => {
                    if(rider.id === podiums){     
                        return <Stat number="Most podiums:" stat={rider.firstname + ' ' + rider.name} />
                    }
                })
            }
            
            </View>
            




            
        </ScrollView>
        <View style={styles.footer}>
              <Icon name="trophy" color={"#011627"} size={30} onPress={() => navigation.navigate('Ranking')} />
              <Icon name="users" color={"#011627"} size={30} onPress={() => navigation.navigate('MyTeam')} /> 
              <Icon name="home" color={"#011627"} size={30} onPress={() => navigation.navigate('Home')}/>
              <Icon name="bar-chart" color={"#011627"} size={30} onPress={() => navigation.navigate('Stats')} />  
              <Icon name="cog" color={"#011627"} size={30} onPress={() => navigation.navigate('Settings')} /> 
          </View>  
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      backgroundColor: '#FF9F1C'
    }
})

export default Stats