import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from './CheckBoxLabelsStyles';
export default class CheckBoxLabels extends Component {
  constructor(props) {
    super(props);
    this.state = {
        checkLabel : false,
        selected : [],
        
    };
  }

  addLabelsOnNote =()=>{
      let selected = []
        if(this.state.checkLabel === true){
            // this.props.selectLabels(this.props.labelId)
            //selected.push(this.props.labelId)
            // this.state.selected.push(this.props.labelId)
            // console.log('selected ttttts',this.state.selected);
            // selected.push(this.props.labelId)
            this.props.selectLabels(this.props.labelId, this.props.labelName)
            
        }
        // this.setState({ selected : selected },()=> console.log('selected ....',this.state.selected)
        // )   
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

        <Icon
            name = {  
                      this.state.checkLabel === false ? 
                      'check-box-outline-blank' : 'check-box' 
                    }
            type = 'MaterialIcons'
            size = { 30 }  
            iconStyle = { 
                            this.state.checkLabel === false ? 
                            { marginLeft : 5, paddingBottom : 5 } : 
                            { marginLeft : 5, paddingBottom : 5, color : 'blue'}
                        } 
            onPress = { ()=>{ 
                this.setState({ checkLabel :! this.state.checkLabel}, this.addLabelsOnNote )}} 
        />

      </View>
    );
  }
}
