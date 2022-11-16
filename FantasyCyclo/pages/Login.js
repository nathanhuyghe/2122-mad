import {
    ScrollView,
    Platform,
    Image,
    StatusBar,
    StyleSheet,
    Text
} from "react-native"
import Input from "../components/Input"
import ButtonLogin from "../components/ButtonLogin"
import ButtonRegister from "../components/ButtonRegister"
import Logo from "../components/Logo"
import React, {useEffect, useState} from "react"
import { auth } from "../firebase"



function Login({ navigation }) {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(user){
                if (user.uid === 'd0kL0Eix9YS4q54LLneiYV2ZymD3') {
                    navigation.replace('Home')
                }
                else {
                    navigation.replace('Home')
                }
            }
            
        })
    }, [])

    const handleLogin = () => {
        if(validate()){
            auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user
                if (user.uid === 'd0kL0Eix9YS4q54LLneiYV2ZymD3') {
                    navigation.replace('Home')
                }
                else {
                    navigation.replace('Home')
                }
            })
            .catch(error => alert(error.message))
        }
    }


    const handleSignUp = () => {
        navigation.replace('Register')
    }

    function validate(){
        let emailError = ""
        let passwordError = ""
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (!email || reg.test(email) === false) {
          emailError = "Email field is invalid "
        }
        if (!password) {
          passwordError = "Password field is required"
        }
        if (emailError || passwordError) {
            setError({ emailError, passwordError })
            return false
        }
        
        return true
    }


    
    return (
        <ScrollView style={styles.container}>
            <Logo />
            <Input
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text) }
            secureTextEntry={false}
            />
            <Text style={styles.error}>{error?.emailError}</Text>

            <Input
                placeholder="Password"
                secureTextEntry={true}
                value={password}
                onChangeText={text => setPassword(text) }
            />
            <Text style={styles.error}>{error?.passwordError}</Text>
            <ButtonLogin text={"Sign in"} onPress={handleLogin}/>
            <ButtonRegister text={"Sign up"} onPress={handleSignUp}/>
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

export default Login