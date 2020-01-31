import React, { Component } from 'react';
import styles  from './LoginStyles' ;
import { 
    Text ,
    View,Image,
    TouchableOpacity, 
    Button,
    ScrollView,    
} from 'react-native';
import { TextField } from 'material-bread';
import ValidationComponent from 'react-native-form-validator'
import CreateAccount from '../login module/CreateAccount';
import {
    FilledTextField,
    OutlinedTextField,
  } from 'react-native-material-textfield';

import firebase from '../FireBase'; 
import { getUid } from '../FirebaseServices';

const visibilityOnIcon = require('../../Asset/visible.png')
const visibilityOffIcon = require ('../../Asset/visibleOff.png')
const loginIcon = require('../../Asset/Userlogin.png')

var util = require('./UserDataModel')
var objDataModel = new util.UserDataModel()

export default class LoginPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            emailId : '',
            password : '',
            emailIdError : '',
            passwordError : '',
            showPassword : false,
            pressed : false,
        }
    }

    componentDidMount = () => {
        getUid((id)=>{
            console.log("Id user is.."+id); 
            var key = id;
            if(key !== "null"){
                this.props.navigation.navigate('Dashboard')
            }
            else{
                this.props.navigation.navigate('LoginPage')
            }  
        })
    }
    
    handleLoginSubmit = () => {
        console.log("yes")
        if(!this.state.emailId){
            console.log(" email yes")
            this.setState({
                emailIdError : 'Email id is require...'
            })
            console.log(this.state.emailIdError)
        }
        if(!this.state.password){
            this.setState({
                passwordError : 'Password is require...'
            })
        }
        else {
            //this.checkEmailIdPasswordAuth(this.state.emailId , this.state.password);
           // objDataModel.handleUserLoginAuth(this.state.emailId, this.state.password);
           objDataModel.handleUserLoginAuth(this.state.emailId, this.state.password,()=>{
            this.props.navigation.navigate('Dashboard') 
           })
            // alert(" Authenticate user...")

        }

    }

    // chacheEmailPasswordAuto = ( email , password ) => {
    //     firebase.auth().signInWithEmailAndPassword(email,password).then((sucess)=>{
    //         alert("Authentic user...")
    //     })
    //     .catch((error)=>{
    //         alert( " Error....Invalid User ")
    //     })
    // }

    fieldRef = React.createRef();
    onSubmit = () => {
        let { current: field } = this.fieldRef;
     
        console.log(field.value());
      };
      formatText = (text) => {
        return text.replace(/[^+\d]/g, '');
      };


    render()
    {
        return (
            
           <View style = { styles.mainView }>
                <ScrollView>
               <View style = { styles.subView }>
               <View style = {styles.loginIcon}>
                    <Image
                        style = {{ width : 150 , height : 150
                            , marginLeft : '25%',
                            marginTop : '20%'
                        }}
                        source = {loginIcon}
                    />
               </View>

               <View style = { styles.title }>
                    <Text style = {{ color : '#4285f4', fontSize : 30}}>F</Text>   
                    <Text style = {{ color : '#ea4335', fontSize : 30}}>u</Text> 
                    <Text style = {{ color : '#fbbc05', fontSize : 30}}>n</Text> 
                    <Text style = {{ color : '#4285f4', fontSize : 30}}>d</Text> 
                    <Text style = {{ color : '#34a853', fontSize : 30}}>o</Text> 
                    <Text style = {{ color : '#ea4335', fontSize : 30}}>o</Text> 
                    <Text style = {{ fontSize : 30 , }}> Login </Text>
               </View>

               <View style = { styles.emailPassword}>
               <View style = { styles.email}>
                    <OutlinedTextField
                        label =' Email Id '
                        error = { this.state.emailIdError }
                        onSubmitEditing={this.onSubmit}
                        ref={this.fieldRef}
                        onChangeText = {(text)=>{
                            this.setState({
                                emailId : text
                            },()=>{
                                console.log(this.state.emailId); 
                            })
                            }} 
                        >  
                    </OutlinedTextField>
                    
               </View>

                <View style = { styles.passwordView}>
                    <View style = {styles.password}>
                        <OutlinedTextField
                            label =' Password '
                            error = { this.state.passwordError }
                            onSubmitEditing = {this.onSubmit}
                            secureTextEntry = { !this.state.showPassword }
                            ref = {this.fieldRef}
                            onChangeText = {(text)=>{
                                this.setState({
                                    password : text
                                },()=>{
                                    console.log(this.state.password); 
                                })
                                }} 
                            >  
                        </OutlinedTextField>
                    </View>

                <View style = {styles.imageView}>
                    <TouchableOpacity onPress = {()=>this.setState({showPassword:!this.state.showPassword})} >
                        <Image
                            style = {{ height : 30 , width : 30 , }}
                            source =  { this.state.showPassword ? 
                                visibilityOnIcon : visibilityOffIcon
                            } 
                        />
                </TouchableOpacity>

                </View>
                </View>
                </View>
                <TouchableOpacity >
                    <View style = { styles.login }>
                        <Button 
                            onPress = { this.handleLoginSubmit } 
                            title = "Login" > 
                        </Button>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style = { styles.registration }>
                        <Button title = 'forgotpassword'
                            onPress = 
                                {() =>this.props.navigation.navigate('ForgotPassword')}
                            >
                        </Button>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style = { styles.registration }>
                        <Button title = 'registration'
                            onPress = 
                                {() =>this.props.navigation.navigate('CreateAccount')}
                            >
                        </Button>
                    </View>
                </TouchableOpacity>

                </View>
                </ScrollView>
           </View>

        )
    }

}
 