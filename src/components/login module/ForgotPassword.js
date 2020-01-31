import React, { Component } from 'react';
import { 
    Text,
    View,
    Image,
    TouchableOpacity,
    Button     
} from 'react-native';
import {
    TextInput,
} from 'react-native-paper'
import styles  from './ForgotPasswordStyles' ;
import {
    FilledTextField,
    OutlinedTextField,
  } from 'react-native-material-textfield';
const cross = require ('../../Asset/cross.png');
const right = require ('../../Asset/tickincircle.jpg');
export default class ForgotPassword  extends Component {
   constructor(props){
       super(props)
       this.state = {
            emailId : '',
            errorEmailId : '',
            pressed : false,
       }
   }

   handlePressed = () => {
       if(!this.state.emailId){
         return this.setState({
               errorEmailId : 'Enter Email Id ...',
            //    emailId : ' ',
           })
       }
        this.setState({
            pressed : true,
        })
   }

    fieldRef = React.createRef();

    onSubmit = () => {
        let { current: field } = this.fieldRef;
     
        console.log(field.value());
      };
      
      formatText = (text) => {
        return text.replace(/[^+\d]/g, '');
      };

   render(){
       return(
            <View style = { styles.mainView }>
            
                <View style = { styles.subView}>

                    <Image style = {{ width : 150 , height : 150 ,
                                        marginLeft : '25%', marginTop : '5%'}}
                        source = {this.state.pressed ? right : cross }                
                        >
                        
                    </Image>

                <View style = { styles.mainTitle }>
                        <Text style ={{ fontSize : 30}}>
                            Forgot Password
                        </Text>
                </View>

                <View>
                    <Text style = { styles.subTitle }>
                            Enter your recovery email id 
                    </Text>
                </View>

                <View style = { styles.input }>
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

                <TouchableOpacity >
                    <View style = { styles.button }>
                        <Button title = "Send" onPress = {this.handlePressed} >
                        </Button>
                    </View>
                </TouchableOpacity>
                
                <View style = { styles.button}>
                    <Button title = 'sign in' 
                        onPress = {() =>this.props.navigation.navigate('LoginPage')}
                        >
                    </Button>
                </View>    
               
                </View>
            </View>
       )
   } 
}