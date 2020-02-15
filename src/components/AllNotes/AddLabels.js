import React, { Component } from 'react';
import { View, Text, TextInput, FlatList, ScrollView } from 'react-native';
import { Icon, Divider } from 'react-native-elements';
import { Chip } from 'material-bread';
import CheckBoxLabels from './CheckBoxLabels'
import { getLabels } from '../FirebaseServices';
import styles from './AddLabelsStyles';

export default class AddLabels extends Component {
  constructor(props) {
    super(props);
    this.state = {
        labelArray : [],
        newLabel : '',
        labelName : '',
        labelId : '',
        selectedLabels : [],
        addSelected : [],
    };
  }

backCreateNotes = (labelId) => {

    this.props.navigation.navigate('CreateNotes',{ 'labelId' : labelId });
}

selectLabels = (labelId) =>{
  this.state.selectedLabels.push(labelId)
    console.log("Mark labels ",labelId);
    console.log(" selected labels ",this.state.selectedLabels );
    this.setState({
      // addSelected : this.state.selectedLabels.filter(sel)
    })
}

componentDidMount = () => {
    getLabels((labels) => {
      let labelsArray = []
      Object.keys(labels).map((key,index)=>{
        var obj = {};
        obj.labelId = key;
        this.setState({ labelId : obj.labelId },
            console.log('labels id...',this.state.labelId)
            )
        obj.labelName = labels[key];
        labelsArray.push(obj)
      })
      this.setState({ labelArray : labelsArray.reverse() },
      console.log("ASrrraa"),
      )
    })
}

  render() {
    return (
      <View style = { styles.mainView }>
            <View style = { styles.backArrow }>
                <Icon
                    size = { 35 }
                    name = 'keyboard-backspace'
                    color = 'black'
                    type = 'material-community'
                    onPress = { this. backCreateNotes }
                    iconStyle = {{ marginTop : 6, marginLeft : 3 }}
                />
                <TextInput
                    style = {{ fontSize : 25,}}
                    value = { this.state.newLabel }
                    multiline = { true }
                    onChangeText = { (text)=>{
                        this.setState({ newLabel : text})
                    }}
                />
            </View>
            <Divider style = {{ marginTop :5 }} />
                    
            <ScrollView>
              <View style = { styles.labelView }>
                  <FlatList
                      data = { this.state.labelArray }
                      renderItem = { ({ item })=>
                        <CheckBoxLabels
                            labelName = { item.labelName }
                            labelId = { item.labelId }
                            selectLabels = { this.selectLabels }
                        />
                        }
                    />
              </View>
          </ScrollView>
      </View>
    );
  }
}
