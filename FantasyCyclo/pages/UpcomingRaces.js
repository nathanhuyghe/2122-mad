import {
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button, 
} from "react-native"
import React, { useEffect, useState } from "react"
import Icon from "react-native-vector-icons/FontAwesome"
import { auth, db } from "../firebase"
import H2 from "../components/H2"
import AsyncStorage from '@react-native-async-storage/async-storage'


function UpcomingRaces({navigation}) {
  const [races, setRaces] = useState()
  const [today, setToday] = useState(new Date())

  useEffect(() => {
    let isMounted = true
    getData()  
    return () => { isMounted = false }
  }, [])

  const getData = () => {
    try{
      AsyncStorage.getItem('races')
      .then(value => {
          setRaces(JSON.parse(value))
      })
  } catch(error) {
      console.log(error)
  }

  }

  return (
      <View style={{flex : 1}}>
        <ScrollView style={styles.container}>
          <H2 h2={"Upcoming races"}/>
          <View style={styles.races}>
            {
                races?.map(race => {
                  if (today < new Date(race.date.seconds * 1000)){
                    return <Text key={race.id} style={styles.race}>{race.class + ' ' + race.name + ' ' + new Date(race.date.seconds * 1000).toLocaleDateString("en-GB") }</Text>      
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
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#FF9F1C'
  },
  races: {
    marginTop: "5%",
    marginLeft: "5%",
  },
  race: {
    fontSize: 18,
    marginBottom: "1%"
  }
})

export default UpcomingRaces
