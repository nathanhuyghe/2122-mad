import {
    Image,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    Button,
    View
} from "react-native"
import Input from "../components/Input"
import React, {useState} from "react"
import { db} from '../firebase'
import ButtonLogin from "../components/ButtonLogin"
import H2 from "../components/H2"
import Icon from "react-native-vector-icons/FontAwesome"
import DateField from 'react-native-datefield'
import DateTimePicker from '@react-native-community/datetimepicker'

function AddRaces({ navigation }) {

    const [category, setCategory] = useState()
    const [name, setName] = useState()
    const [error , setError] = useState()
    const [date, setDate] = useState(new Date())
    const [mode, setMode] = useState('date')
    const [show, setShow] = useState(false)

    const add = () => {   
        if(validate()){
            db.collection('races')
                .add({
                    class: category,
                    name: name,
                    date: date
                })                
            navigation.replace('Home') 
        }             
    }

    function validate(){
        let categoryError = ""
        let nameError = ""
        let dateError = ""
        if (!date) {
          dateError = "date field is required"
        }
        if (!category) {
            categoryError = "category field is required"
        }
        if (!name) {
            nameError = "name field is required"
        }
        if (categoryError || nameError || dateError) {
            setError({ categoryError, dateError, nameError })
            return false
        }
        
        return true
      }

      const showDatepicker = () => {
        showMode('date')
      }

      const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date
        setShow(Platform.OS === 'ios')
        setDate(currentDate)
      }

      const showMode = (currentMode) => {
        setShow(true)
        setMode(currentMode)
      }

    return (
        <View style={{flex : 1}}>
        <ScrollView style={styles.container}>
            <H2 h2={"Update races"}/>
            <Text style={styles.text}>Category</Text>
            <Input placeholder={"category"}
                   onChangeText={(category) => setCategory(category)}
                   defaultValue={category}
                   secureTextEntry={false}/>
            <Text style={styles.error}>{error?.categoryError}</Text>
            <Text style={styles.text}>Race name</Text>
            <Input placeholder={"name"}
                   onChangeText={(name) => setName(name)}
                   defaultValue={name}
                   secureTextEntry={false}/>
            <Text style={styles.error}>{error?.nameError}</Text>
            <Text style={styles.text}>Date</Text>
            <View>
                <ButtonLogin onPress={showDatepicker} text="Show date picker!" />
            </View>
            {show && (
                <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
                />
            )}    
            <Text style={styles.error}>{error?.dateError}</Text>
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
    date : {
        height: 61,
        borderWidth: 3,
        marginLeft: "5%",
        marginRight: '5%',
        borderColor: "#011627",
        borderRadius: 5,
        textAlign: "center",
        fontSize: 24,
    }

    
})

export default AddRaces