import {
    Image,
    Platform,
    ScrollView,
    Settings,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Picker
} from "react-native"
import DateTimePicker from '@react-native-community/datetimepicker'
import Input from "../components/Input"
import DateInput from "../components/DateInput"
import ButtonRegister from "../components/ButtonRegister"
import React, {useEffect, useState} from "react"
import Logo from "../components/Logo"
import {auth, db} from '../firebase'
import ButtonLogin from "../components/ButtonLogin"
import H2 from "../components/H2"
import Icon from "react-native-vector-icons/FontAwesome"
import DateField from 'react-native-datefield'
import AsyncStorage from '@react-native-async-storage/async-storage'


function AddRider({ navigation }) {
    const [name, setName] = useState()
    const [firstname, setFirstname] = useState()
    const [credits, setCredits] = useState()
    const [uci_ranking, setUciRanking] = useState()
    const [team, setTeam] = useState()
    const [country_id, setCountryId] = useState()
    const [error, setError] = useState()
    const [countries, setCountries] = useState()
    const [birthday, setBirthday] = useState(new Date())
    const [mode, setMode] = useState('date')
    const [show, setShow] = useState(false)

    function validate(){
        let nameError = ""
        let firstnameError = ""
        let creditsError = ""
        let birthdayError = ""
        let uci_rankingError = ""
        let teamError = ""
        let country_idError = ""
        const rx_live = /^[+-]?\d*(?:[.,]\d*)?$/


        if (!name) {
            nameError = "Name field is required"
        }
        if (!firstname) {
            firstnameError = "Firstname field is required"
        }
        if (!credits) {
            creditsError = "Credits field is required"
        }
        if(!rx_live.test(credits)){
            creditsError = "Credits field must be numeric"
        }
        if (!birthday) {
            birthdayError = "Birthday field is required"
        }
        if (!uci_ranking) {
            uci_rankingError = "Uci ranking field is required"
        }
        if(!rx_live.test(uci_ranking)){
            uci_rankingError = "Uci ranking field must be numeric"
        }
        if (!team) {
            teamError = "Team field is required"
        }
        if (!country_id) {
            country_idError = "Country field is required"
        }
        if (nameError || firstnameError || creditsError || birthdayError || uci_rankingError || teamError || country_idError) {
            setError({ nameError, firstnameError, creditsError, birthdayError, uci_rankingError, teamError, country_idError })
            return false
        }
        
        return true
    }


    const showDatepicker = () => {
        showMode('date')
      }

      const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || birthday
        setShow(Platform.OS === 'ios')
        setBirthday(currentDate)
      }

      const showMode = (currentMode) => {
        setShow(true)
        setMode(currentMode)
      }

    const add = () => {     
        if(validate()){
            db.collection('riders')
                .add({
                    name: name,
                    firstname: firstname,
                    credits: credits,
                    birthday: birthday,
                    uci_ranking: uci_ranking,
                    team_id: team,
                    country_id: country_id                    
                })                
            navigation.replace('Home')  
        }      
    }

    useEffect(() => {
        getData()
    },[])
    


    const getData = () => {
        try{
            AsyncStorage.getItem('countries')
            .then(value => {
                setCountries(JSON.parse(value))
            })
        } catch(error) {
            console.log(error)
        }
    }


    return (
        <View style={{flex : 1}}>
            <ScrollView style={styles.container}>
                <H2 h2={"Add rider"}/>
                <Text style={styles.text}>Firstname</Text>
                <Input placeholder={"Firstname"}
                    onChangeText={(firstname) => setFirstname(firstname)}
                    defaultValue={firstname}
                    secureTextEntry={false}/>
                    <Text style={styles.error}>{error?.firstnameError}</Text>
                <Text style={styles.text}>Name</Text>
                <Input placeholder={"name"}
                    onChangeText={(name) => setName(name)}
                    defaultValue={name}
                    secureTextEntry={false}/>
                    <Text style={styles.error}>{error?.nameError}</Text>
                <Text style={styles.text}>Birthday</Text>
                <View>
                <ButtonLogin onPress={showDatepicker} text="Show date picker!" />
                </View>
                {show && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={birthday}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    />
                )} 
    
            <Text style={styles.error}>{error?.birthdayError}</Text>
                <Text style={styles.text}>Uci ranking</Text>
                <Input placeholder={"Uci ranking"} onChangeText={(uci_ranking) => setUciRanking(uci_ranking)}
                    defaultValue={uci_ranking}
                    secureTextEntry={false}
                    pattern="[+-]?\d+(?:[.,]\d+)?"/>
                    <Text style={styles.error}>{error?.uci_rankingError}</Text>
                <Text style={styles.text}>Credits</Text>
                <Input placeholder={"Credits"} onChangeText={(credits) => setCredits(credits)}
                    defaultValue={credits}
                    secureTextEntry={false}/>
                    <Text style={styles.error}>{error?.creditsError}</Text>
                <Text style={styles.text}>Team</Text>
                <Input placeholder={"Team"} onChangeText={(team) => setTeam(team)}
                    defaultValue={team}
                    secureTextEntry={false}/>
                    <Text style={styles.error}>{error?.teamError}</Text>
                <Text style={styles.text}>Country</Text>
                <Picker style={styles.dropdown}
                        selectedValue={country_id} onValueChange={(itemValue) => setCountryId(itemValue)}>
                    {
                        countries?.map(country => <Picker.Item label={country.country} value={country.id} key={country.id}/>)
                    }
                </Picker> 
                <Text style={styles.error}>{error?.country_idError}</Text>         
                <ButtonLogin text={"Add"} onPress={add}/>
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
})

export default AddRider