import {
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    View,
    Text,
} from "react-native"
import React, {useState, useEffect} from "react"
import H3 from "../components/H3"
import H2 from "../components/H2"
import Result from "../components/Result"
import Icon from "react-native-vector-icons/FontAwesome"
import AsyncStorage from '@react-native-async-storage/async-storage'


function YourResults({navigation}) {
    const [raceResults, setRaceResults] = useState()
    const [raceName, setRaceName] = useState()
    const [total, setTotal] = useState(0)
    
    useEffect(() => {
        let isMounted = true
        getData()        
        return () => { isMounted = false }
    }, [])

    const getData = () => {
        try{
            AsyncStorage.getItem('YourResults')
            .then(value => {
                setRaceResults(JSON.parse(value))
            })

            AsyncStorage.getItem('races')
            .then(value => {
                setRaceName(JSON.parse(value))
            })
        } catch(error) {
            console.log(error)
        }
    }

    
    return (
        <View style={{flex : 1}}>
        <ScrollView style={styles.container}>
            <H2 h2={"Your results"}/>
            <View style={styles.headers}>
                <H3 h3={"Race"}/>
                <H3 h3={"Points"}/>
            </View>
            {                
                raceResults?.map(raceResult => <Result key={raceResult.race_id} result={
                    raceName?.map(race => {
                        if (race.id === raceResult.race_id) {
                            return race.name
                        }
                    })
                } points={raceResult.points}/>)
            }
            <View style={styles.headers}>
                <H3 h3={"Total points scored"}/>        
            <Text style={styles.txt}>{total}</Text>
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
    headers: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: "5%",
        width: "90%",
    },
    txt:{
        fontSize: 18
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      backgroundColor: '#FF9F1C'
    }
})

export default YourResults