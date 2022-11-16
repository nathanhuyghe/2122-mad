import {
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Picker,
    Text, 
    View
} from "react-native"
import ButtonLogin from "../components/ButtonLogin"
import React, {useState, useEffect} from "react"
import H2 from "../components/H2"
import {db, auth} from '../firebase'
import Icon from "react-native-vector-icons/FontAwesome"
import AsyncStorage from '@react-native-async-storage/async-storage'


function UpdateRaces({navigation}) {
    const [riders, setRiders] = useState()
    const [races, setRaces] = useState()
    const [first, setFirst] = useState()
    const [second, setSecond] = useState()
    const [third, setThird] = useState()
    const [selectedRace, setSelectedRace] = useState()
    const [teamRiders, setTeamRiders] = useState()
    const [users, setUsers] = useState()
    const [error, setError] = useState()

    function validate(){
        let firstError = ""
        let secondError = ""
        let thirdError = ""
        let selectedRaceError = ""
    
        if (!first) {
          firstError = "You have to select something"
        }
        if (!second) {
            secondError = "You have to select something"
        }
        if (!third) {
            thirdError = "You have to select something"
        }
        if (!selectedRace) {
            selectedRaceError = "You have to select something"
        }
        if (selectedRaceError || thirdError || firstError || secondError) {
            setError({ selectedRaceError, thirdError, firstError, secondError })
            return false
        }
        
        return true
    }

    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        try{
            AsyncStorage.getItem('riders')        
            .then(value => {
                setRiders(JSON.parse(value))
            })

            AsyncStorage.getItem('races')        
            .then(value => {
                setRaces(JSON.parse(value))
            })

            AsyncStorage.getItem('myriders')        
            .then(value => {
                setTeamRiders(JSON.parse(value))
            })

            AsyncStorage.getItem('users')        
            .then(value => {
                setUsers(JSON.parse(value))
            })
        } catch(error) {
            console.log(error)
        }
    }

    async function insert (selectedRace, first, second, third) {
        if(validate()){
            db.collection('races_riders')
            .add({
                rider_id: first,
                race_id: selectedRace,
                position: 1,
                points: 10
            })

        db.collection('races_riders')
            .add({
                rider_id: second,
                race_id: selectedRace,
                position: 2,
                points: 9
            })
        db.collection('races_riders')
            .add({
                rider_id: third,
                race_id: selectedRace,
                position: 3,
                points: 8
            })
            
        
        //nu bij update van race resultaat wordt resultaten aangepast voor alle users
        //controleren of team uit 5 rijders bestaat => team is geldig

        let res = db.collection('races_riders').where('race_id', '==', selectedRace).get()        
        users.forEach(user => {
                res
                .then(results => results.docs)
                .then(docs => docs?.map(doc => {
                    teamRiders?.map(teamrider => {                    
                        if (doc.data().rider_id === teamrider.rider_id && teamrider.user_id === user.id ){
                            user.points += doc.data().points                                         
                        }                 
                    })         
                }))
                .then(() => {
                    db.collection('results')
                        .add({
                            points: user.points,
                            race: selectedRace,
                            user_id: user.id
                        })                      

                        db.collection('users')
                        .doc(user.id)
                        .onSnapshot(documentSnapshot => {
                            user.points += documentSnapshot.data().points
                        })                   

                    db.collection('users').doc(user.id)
                        .update({
                            points: user.points
                        })                    
                })                               
        })                
        navigation.replace('Home')
        }
    }    

    


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
            <Text style={styles.error}>{error?.selectedRaceError}</Text>
            <Text style={styles.text}>First</Text>
            <Picker style={styles.dropdown}
                    selectedValue={first} onValueChange={(itemValue) => setFirst(itemValue)}>
                {
                    riders?.map(rider => <Picker.Item label={rider.firstname + ' ' + rider.name} value={rider.id} key={rider.id}/>)
                }
            </Picker>
            <Text style={styles.error}>{error?.firstError}</Text>
            <Text style={styles.text}>Second</Text>
            <Picker style={styles.dropdown}
                    selectedValue={second} onValueChange={(itemValue) => setSecond(itemValue)}>
                {
                    riders?.map(rider => <Picker.Item label={rider.firstname + ' ' + rider.name} value={rider.id} key={rider.id}/>)
                }
            </Picker>
            <Text style={styles.error}>{error?.secondError}</Text>
            <Text style={styles.text}>Third</Text>
            <Picker style={styles.dropdown}
                    selectedValue={third} onValueChange={(itemValue) => setThird(itemValue)}>
                {
                    riders?.map(rider => <Picker.Item label={rider.firstname + ' ' + rider.name} value={rider.id} key={rider.id}/>)
                }
            </Picker>
            <Text style={styles.error}>{error?.thirdError}</Text>
            <ButtonLogin text={"Insert"} onPress={() => insert(selectedRace, first, second, third)}/>
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
    error: {
        color: '#E71D36',
        fontSize: 18,
        marginLeft: "5%",
        width: "90%",
        marginBottom: '5%'     
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      backgroundColor: '#FF9F1C'
    }
})

export default UpdateRaces