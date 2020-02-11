import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from './CheckBoxLabelsStyles';
export default class CheckBoxLabels extends Component {
  constructor(props) {
    super(props);
    this.state = {
        checkLabel : false,
        
    };
  }

  addLabelsOnNote =()=>{
     this.setState({ checkLabel : !this.state.checkLabel },()=>{ 
        if(this.state.checkLabel === true){
            this.props.selectLabels(this.props.labelId)
        }}
        )   
  }
  render() {
    return (
      <View style = { styles.mainView }>
        <Icon 
            name = 'label-outline'
            type = 'MaterialCommunityIcons'
            size = { 30 }
            iconStyle = {{ marginLeft : 5, paddingBottom : 7}} 
        />
        <Text
            style = {{ fontSize : 20, marginLeft : 5, width : '75%'}}
            > 
            { this.props.labelName } 
        </Text>

        {/* <Text> { this.props.labelId }</Text> */}

        <Icon
            name = { this.state.checkLabel === false ? 
                'check-box-outline-blank' : 'check-box' }
            type = 'MaterialIcons'
            size = { 30 }  
            iconStyle = { this.state.checkLabel === false ? 
                { marginLeft : 5, paddingBottom : 5} : 
                { marginLeft : 5, paddingBottom : 5, color : 'blue'}} 
            onPress = { this.addLabelsOnNote }     
        />

      </View>
    );
  }
}
