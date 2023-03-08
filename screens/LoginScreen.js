import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Home from '../screens/HomeScreen';

import * as firebase from 'firebase';
//import using react, component form react-native and react-navigation
//using firebase to connect login and register account
const firebaseConfig = {
    apiKey: "AIzaSyBEClNiJpFlocSvu0arU4aGVUBSPVjdhBQ",
    authDomain: "reactnativeproject-b3efc.firebaseapp.com",
    databaseURL: "https://reactnativeproject-b3efc.firebaseio.com",
    projectId: "reactnativeproject-b3efc",
    storageBucket: "",
};
firebase.initializeApp(firebaseConfig);

import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
class LoginSreen extends React.Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props)
        this.state = ({
            email: '',
            password: ''
        })
    }
    //create function to change another screen. However get problem when call it. I don't know
    //How to fix that so i comment and not using that
  //  gotohomepage = (screen) =>{
 //       this.props.navigation.navigate(screen).bind(this)
 //   }


    //method for create account using firebase
    signUpUser = (email, password) => {
        try {
            if (this.state.password.length < 6) {
                alert("Please enter atleast 6 characters")
                return;
            }
            firebase.auth().createUserWithEmailAndPassword(email, password)
            alert("Create account successful");
            return;
        } catch (error) {
            console.log(error.toString());
        }
    }
    //method for login account
    loginUser = (email, password) => {
        try {
            if (this.state.email == "" || this.state.password == "") {
                alert("Please put email and password");
                return;
            }
            firebase.auth().signInWithEmailAndPassword(email, password).then(function (user) {
                alert("Login successful");
                //this.gotohomepage('Home').bind('Home')
            })
        } catch (error) {
            console.log(error.toString());
        }
    }
    //View for login screen
    render() {
        return (
            <Container style={styles.container}>
                <View>
                    <Text style={styles.titlelogin}>Login Account</Text>
                </View>
                <Form>
                    <Item floatingLabel>
                        <Label>Email</Label>
                        <Input
                            autoCorrect={false}
                            autoCapitalize='none'
                            onChangeText={(email) => this.setState({ email })}
                        />
                    </Item>

                    <Item floatingLabel>
                        <Label>Password</Label>
                        <Input
                            secureTextEntry={true}
                            autoCorrect={false}
                            autoCapitalize='none'
                            onChangeText={(password) => this.setState({ password })}
                        />
                    </Item>

                    <Button style={{ marginTop: 10 }}
                        full
                        rounded
                        success
                        onPress={() => [this.loginUser(this.state.email, this.state.password)] && (this.props.navigation.navigate('Home'))}
                    >
                        <Text style={styles.forbutton}>Login</Text>
                    </Button>

                    <Button style={{ marginTop: 10 }}
                        full
                        rounded
                        primary
                        onPress={() => this.signUpUser(this.state.email, this.state.password)}
                        
                    >
                        <Text style={styles.forbutton}>Sign Up</Text>
                    </Button>
                </Form>
            </Container>
        );
    }
}

export default LoginSreen;
//some style for container, text and button
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        padding: 10
    },
    titlelogin: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 30,
        padding: 70
    },
    forbutton: {
        color: 'white',
        fontWeight: 'bold',
    }
});
