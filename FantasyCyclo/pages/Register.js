import {
    Image,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native"
import Input from "../components/Input"
import ButtonRegister from "../components/ButtonRegister"
import React, {useState} from "react"
import Logo from "../components/Logo"
import {auth, db} from '../firebase'
import ButtonLogin from "../components/ButtonLogin"


function Register({ navigation }) {

    const [firstname, setFirstname] = useState()
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState()

    const goLogin = () => {
        navigation.navigate('Login')
    }
    const dbRegister = () => {       
        if(validate()){
            auth
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user
                

            })
            .catch(error => alert(error.message))

        auth.onAuthStateChanged(user => {
            if (user) {                
                db.collection('users').doc(user.uid)
                    .set({
                        firstname: firstname,
                        name: name,
                        email: email,
                        password: password,
                        credits: 5000,
                        role_id: '1nEKMjypdXVPsHOgFL96',
                        points: 0
                    })
                    .then(result => console.log(result))
                    .catch(error => console.log(error))
                   
                navigation.replace('Home')
            }
        })       
        }            
    }

    function validate(){
        let emailError = ""
        let passwordError = ""
        let firstnameError = ""
        let nameError = ""

        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (!email || reg.test(email) === false) {
          emailError = "Email field is invalid "
        }
        if (!password) {
          passwordError = "Password field is required"
        }
        if (!firstname) {
            firstnameError = "Firstname field is required"
        }
        if (!name) {
            nameError = "Name field is required"
        }
        if (emailError || passwordError || nameError || firstnameError) {
            setError({ emailError, passwordError, nameError, firstnameError })
            return false
        }
        
        return true
      }     

    return (
        <ScrollView style={styles.container}>
            <Logo/>
            <Input placeholder={"firstname"}
                   onChangeText={(name) => setFirstname(name)}
                   defaultValue={firstname}
                   secureTextEntry={false}/>
            <Text style={styles.error}>{error?.firstnameError}</Text>
            <Input placeholder={"name"}
                   onChangeText={(name) => setName(name)}
                   defaultValue={name}
                   secureTextEntry={false}/>
            <Text style={styles.error}>{error?.nameError}</Text>
            <Input placeholder={"email"} onChangeText={(email) => setEmail(email)}
                   defaultValue={email}
                   secureTextEntry={false}/>
            <Text style={styles.error}>{error?.emailError}</Text>
            <Input placeholder={"password"} onChangeText={(password) => setPassword(password)}
                   defaultValue={password}
                   secureTextEntry={true}/>
            <Text style={styles.error}>{error?.passwordError}</Text>
            <ButtonRegister text={"Sign up"} onPress={dbRegister}/>
            <ButtonLogin text={"Sign in"} onPress={goLogin}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    error: {
        color: '#E71D36',
        fontSize: 18,
        marginLeft: "5%",
        width: "90%",
        marginBottom: '5%'     
    }
})

export default Register