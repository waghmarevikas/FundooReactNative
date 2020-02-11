import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Icon ,} from 'react-native-elements';
import styles from './LabelsStyles';
import { removeLabels, updateLabels } from '../FirebaseServices';
export default class Labels extends Component {
    constructor(props){
        super(props);
        this.state = {
            edit : false,
            labelName : this.props.labelName ,
        }
    }

    deleteLabels = () => {
        removeLabels(this.props.labelId)
        this.setState({ edit : false })
    }

    handleEditLabels = () => {
        let labelObj = { label : this.state.labelName }
        updateLabels(this.state.labelName, this.props.labelId )
        this.setState({ edit : ! this.state.edit })
    }

  render() {
    return (
      <View style = { styles.mainView }>
          <Icon
            name = {this.state.edit === false ? 'label-outline' : 'delete'}
            size = { 35 }
            iconStyle = {{ width : '100%'}}
            onPress = { this.state.edit === false ? "" : this.deleteLabels }
            iconStyle = { this.state.edit === false ? '' : { marginTop : 8}}
          />

            {
                this.state.edit === false ?
                <Text
                    style = {{ 
                        fontSize : 25, width : '55%',
                        marginLeft : '3%' }}
                    >
                    { this.props.labelName }
                </Text>
                :
                <TextInput
                    style = {{ 
                        fontSize : 25,
                        marginRight : '3%',
                        color : 'black',
                        width : '55%'
                    }}
                    multiline = { true }
                    value = { this.state.labelName }
                    onChangeText = { (text) => {
                        this.setState({ labelName : text })
                    }}
                  >
                </TextInput>
            }

          <Icon
            name = { this.state.edit === false ? 'edit' : 'check'}
            color = { this.state.edit === false ? null : 'blue'}
            iconStyle = {{ marginLeft : '10%', marginTop : 8}}
            onPress = { this.handleEditLabels }
          />
      </View>
    );
  }
}
