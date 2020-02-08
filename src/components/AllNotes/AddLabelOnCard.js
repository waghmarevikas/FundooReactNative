import React, { Component } from 'react';
import { View, Text, TextInput} from 'react-native';
// import { } from 'react-native-paper';
import { Icon, Divider } from 'react-native-elements';
import styles from './AddLabelOnCardStyles';
export default class AddLabelOnCard extends Component {
  constructor (props){
    super(props);
    this.state = {
      createLable : false,
    }
  }

  backDashboard = () =>{
    this.props.navigation.navigate('Notes');
  }
  render() {
    return (
          <View style = { styles.mainView }>
            <Icon
              size = { 35 }
              name = 'keyboard-backspace'
              color = 'black'
              type = 'material-community'
              onPress = { this.backDashboard }
            />
            <View 
              style = {{ marginLeft : '3%', 
                          marginTop : '1%', 
                          width : '60%',
                      }} 
              >

                <TextInput
                    style = {{ 
                        fontSize : 20,
                        marginRight : '3%',
                        color : 'black',
                    }}
                    placeholder =  'Create new lable '
                    multiline = { true }
                    value = { this.state.createLable }
                    onChangeText = { (text)=>{
                        this.setState({ title : text })
                    }}
                  >
                </TextInput>
                
          </View>

      </View>
    );
  }
}


