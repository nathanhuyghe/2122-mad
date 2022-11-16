import {
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View
} from "react-native"
import Input from "../components/Input"
import React, { useEffect, useState } from "react"
import H2 from "../components/H2"
import H3 from "../components/H3"
import Rank from "../components/Rank"
import Icon from "react-native-vector-icons/FontAwesome"
import AsyncStorage from '@react-native-async-storage/async-storage'

function Ranking({navigation}) {

    const [users, setUsers] = useState()

    useEffect(() => {
        let isMounted = true
        getData()
            
        return () => { isMounted = false }
    }, [])

    const getData = () => {
        try{
            AsyncStorage.getItem('ranking')
            .then(value => {
                setUsers(JSON.parse(value))
            })
        } catch(error) {
            console.log(error)
        }
    }

        



    return (
        <View style={{flex : 1}}>
        <ScrollView style={styles.container}>
            <H2 h2={'Ranking'}/>
            <View style={styles.box}>
                <H3 h3={"Position"} />
                <H3 h3={"Username"}/>
                <H3 h3={"Points"}/>
            </View>
            {
                users?.map((user,index) => {
                    return <Rank key={user.id}  position={index + 1} username={user.name} points={user.points}/>
                })
            }
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
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    box: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%",
        marginLeft: "5%"
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      backgroundColor: '#FF9F1C'
    }
})

export default Ranking