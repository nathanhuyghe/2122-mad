import {
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    Picker
} from "react-native"
import React, { useEffect, useState } from "react"
import Icon from "react-native-vector-icons/FontAwesome"
import H2 from "../components/H2"
import AsyncStorage from '@react-native-async-storage/async-storage'

function RaceResults({navigation}) {
    const [raceName, setRaceName] = useState()
    const [riders, setRiders] = useState()
    const [results, setResults] = useState()
    const [races, setRaces] = useState()
    const [selectedRace, setSelectedRace] = useState()

    const getData = () => {
        AsyncStorage.getItem('races')        
            .then(value => {
                setRaces(JSON.parse(value))
            })

        AsyncStorage.getItem('riders')        
        .then(value => {
            setRiders(JSON.parse(value))
        })

        AsyncStorage.getItem('results')
        .then(value => {
            setResults(JSON.parse(value))
        })
        

    }



    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        let isMounted = true
        let res = {}

        results?.map(result => {
            if(res[result.id] != null){
                res[result.id].push(result.rider_id)            
            }
            else {
                res[result.id] = result.rider_id
            }
        })  
        return () => { isMounted = false }      
    },[])

    return (
        <View style={{flex : 1}}>
        <ScrollView style={styles.container}>
            <H2 h2={"Update races"}/>
            <Text style={styles.text}>Race</Text>
            <Picker style={styles.dropdown}
                    selectedValue={selectedRace} onValueChange={(itemValue) => setSelectedRace(itemValue)}>
                {
                    races?.map(race => <Picker.Item label={race.name} value={race.id} key={race.id}/>)
                }
            </Picker>
            <View>
                {
                    selectedRace ? 
                    results?.map(result => {
                        if (result.race_id === selectedRace) {
                            return <View key={result.id} style={styles.results}>
                            <Text style={styles.result}>{result.position} </Text>
                            <Text style={styles.result}>{
                                riders?.map(rider => {
                                    if (rider.id === result.rider_id){
                                        return rider.firstname + " " + rider.name
                                    }
                                })}
                            </Text>
                            </View>                   
                        }   
                    }) 
                    : <Text style={styles.text}>Choose a race</Text>
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
    },
    dropdown: {
        height: 61,
        borderWidth: 3,
        marginLeft: "5%",
        width: "90%",
        borderColor: "#011627",
        borderRadius: 5,
        textAlign: "center",
        fontSize: 24,
    },
    text: {
        marginLeft: "5%",
        width: "90%",
        color: "#011627",
        fontSize: 24,
        marginBottom: "2%",
        fontWeight: "bold"
    },
    results: {
        flexDirection: "row",
        marginLeft: "5%",
        width: "90%"
    },
    result: {
        fontSize: 24,
        marginBottom: 5
        
    }
})

export default RaceResults