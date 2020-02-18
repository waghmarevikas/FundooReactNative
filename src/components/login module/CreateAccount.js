import React , {Component} from 'react';
import {
    Text,
    View,
    Image,
    CheckBox,
    Button, 
    TouchableOpacity,
    ScrollView, 
} from 'react-native';
import {
    TextInput ,
} from 'react-native-paper';
import styles from '../login module/CreateAccountStyle';
import LoginPage from '../login module/Login';
import {
    FilledTextField,
    OutlinedTextField,
  } from 'react-native-material-textfield';
  
import firebase from '../FireBase';
import { createUser } from '../FirebaseServices';
// import { Colors } from 'react-native/Libraries/NewAppScreen';
// import { red50 } from 'react-native-paper/lib/typescript/src/styles/colors';

const visibilityOnIcon = require('../../Asset/visible.png')
const visibilityOffIcon = require ('../../Asset/visibleOff.png')

export default class CreateAccount extends Component {
    constructor (props) {
        super(props)
        this.state = {
            firstName : '',
            lastName : '',
            errorFirstName : '',
            errorLastName : '',
            emailId :'',
            errorEmailId : '',
            password : '',
            confirmPassword : '',
            errorPassword : '',
            errorConfirm : '',
            showPassword : false,
        }
        
    }

    handleRegistration = () => {
        if(!this.state.firstName){
            this.setState({
                errorFirstName : 'First Name is required...'
            })
        }
        if(!this.state.lastName){
            this.setState({
                errorLastName : 'Last Name is required... '
            })
        }
        if(!this.state.password){
            this.setState({
                errorPassword : 'Password is required...'
            })
        }
        if(!this.state.emailId){
            this.setState({
                errorEmailId : 'EmailId is required...'
            })
        }
        if(this.state.password != this.state.confirmPassword){
            return this.setState({
                errorConfirm : 'Password Not Match...'
            })
        }
        else { 
            var obj = {
                firstName : this.state.firstName,
                lastName : this.state.lastName,
                emailId : this.state.emailId
            }
            createUser(this.state.emailId, this.state.password, obj, (responce) =>{
                alert(responce)
            },()=>{ 
            this.setState({
                firstName : '',
                lastName : '',
                emailId : '',
                password : '',
                confirmPassword : '',
            })});
        }
    }

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
        return(
            
            <View style = { styles.mainView } >
                <View style = { styles.subView }>
                <ScrollView>
                <Text style = { styles.heading }>
                    <Text style = {{ color : '#4285f4',}}>f</Text>   
                    <Text style = {{ color : '#ea4335',}}>u</Text> 
                    <Text style = {{ color : '#fbbc05',}}>n</Text> 
                    <Text style = {{ color : '#4285f4',}}>d</Text> 
                    <Text style = {{ color : '#34a853',}}>o</Text> 
                    <Text style = {{ color : '#ea4335',}}>o</Text> 
                </Text>
                <Text style = { styles.subHeading }>
                         Create your fundoo account             
                </Text>
                <View style = { styles.nameView}>
                    <OutlinedTextField
                            label =' First Name '
                            error = { this.state.errorFirstName }
                            onSubmitEditing = { this.onSubmit }
                            ref = {this.fieldRef}
                            onChangeText = {(text)=>{
                                this.setState({
                                    firstName : text
                                },()=>{
                                    console.log( this.state.firstName ); 
                                })
                                }} 
                            >  
                    </OutlinedTextField>

                    <OutlinedTextField
                            label =' Last Name '
                            error = { this.state.errorLastName }
                            onSubmitEditing = { this.onSubmit }
                            // ref = {this.fieldRef}
                            onChangeText = {(text)=>{
                                this.setState({
                                    lastName : text
                                },()=>{
                                    console.log( this.state.lastName ); 
                                })
                                }} 
                            >  
                    </OutlinedTextField>

                    <OutlinedTextField
                            label =' Email Id '
                            error = { this.state.errorEmailId }
                            onSubmitEditing = { this.onSubmit }
                            ref = {this.fieldRef}
                            onChangeText = {(text)=>{
                                this.setState({
                                    emailId : text
                                },()=>{
                                    console.log( this.state.emailId ); 
                                })
                                }} 
                            >  
                    </OutlinedTextField>

                </View>
                <View style = {styles.passwordView}>
                    <View style = { styles.password}>
                        <OutlinedTextField
                            label =' Password '
                            error = { this.state.errorPassword }
                            onSubmitEditing = { this.onSubmit }
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
                    <View style = { styles.confirm }>
                    <OutlinedTextField
                            label =' Confirm '
                            error = { this.state.errorConfirm }
                            onSubmitEditing = {this.onSubmit}
                            secureTextEntry = { !this.state.showPassword }
                            ref = {this.fieldRef}
                            onChangeText = {(text)=>{
                                this.setState({
                                    confirmPassword : text
                                },()=>{
                                    console.log(this.state.confirmPassword); 
                                })
                                }} 
                            >  
                        </OutlinedTextField>
                        <View style = { styles.show}>
                        <CheckBox value={this.state.showPassword} 
                            onChange = {()=>this.setState({showPassword : !this.state.showPassword})} >
                        </CheckBox>
                        <Text 
                            style = {{fontSize : 17, marginTop : 4, color : '#a9a9a9'}}>
                            Show Password
                        </Text>
                        </View>
                        <View style = { styles.buttons }>
                            <TouchableOpacity style = { styles.registretion } onPress = {this.handleColor}>
                            <View >
                                <Button 
                                    mode = 'outlined' 
                                    title = 'Registretion' 
                                    onPress = { this.handleRegistration }>        
                                </Button>
                            </View>
                            </TouchableOpacity>
                            <TouchableOpacity style = { styles.login } >
                            <View>
                                <Button mode = 'outlined' title = 'sign in'
                                    onPress = {() =>this.props.navigation.navigate('LoginPage')}
                                    >       
                                </Button>
                            </View>
                            </TouchableOpacity>
                            
                        </View>
                        
                    </View>
                </View>
                </ScrollView>
                </View>
            </View>
            
        )
    }
}