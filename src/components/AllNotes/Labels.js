import React, { Component } from 'react';
import { View, Text, } from 'react-native';
import { Icon ,} from 'react-native-elements';
import styles from './LabelsStyles';
export default class Labels extends Component {
    constructor(props){
        super(props);
        this.state = {
            edit : false,
        }
    }
  render() {
    return (
      <View style = { styles.mainView }>
          <Icon
            name = {this.state.edit === false ? 'label-outline' : 'delete'}
            size = { 35 }
            iconStyle = {{ width : '100%'}}
            onPress = { ()=> this.setState({ edit : !this.state.edit })}
          />

          <Text
            style = {{ 
                fontSize : 25, width : '55%',
                marginLeft : '3%' }}
          >
              { this.props.labelName }
          </Text>

          <Icon
            name = { this.state.edit === false ? 'edit' : 'check'}
            color = { this.state.edit === false ? null : 'blue'}
            iconStyle = {{ marginLeft : '10%'}}
            onPress = { ()=> this.setState({ edit : !this.state.edit })}
          />
      </View>
    );
  }
}
