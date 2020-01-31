import React, { Component } from 'react';
import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from 'react-native-material-textfield';
 import {Button , View} from 'react-native';
export default class Example extends Component {
    constructor (props){
        super(props);
        this.state = {
            email : '',
            emailError : '',
        }
    }
  fieldRef = React.createRef();
  handleEmail = () => {
      console.log("hgfd");
      
      if(this.state.email === ""){ 
            
            this.setState({
                emailError : 'errrrrr...'
            })

        }
        else{
            this.setState({
                emailError : null
            })
        }
    
  }
  onSubmit = () => {
    let { current: field } = this.fieldRef;
 
    console.log(field.value());
  };
 
  formatText = (text) => {
    return text.replace(/[^+\d]/g, '');
  };
 
  render() {
    return (
        <View>


      <OutlinedTextField
        label='Phone number'
        keyboardType='phone-pad'
        // formatText={this.formatText}
        error = { this.state.emailError }
        onSubmitEditing={this.onSubmit}
        ref={this.fieldRef}
        onChangeText = {(text)=>{
            this.setState({
                email : text
            },()=>{
                console.log(this.state.emailId); 
            })
            }} 
      />
              <Button title = 'press' onPress = { this.handleEmail } > </Button>
              </View>
    );
  }
}