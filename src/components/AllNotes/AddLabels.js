import React, { Component } from 'react';
import { View, Text, TextInput, FlatList, ScrollView } from 'react-native';
import { Icon, Divider } from 'react-native-elements';
import { Chip } from 'material-bread';
import CheckBoxLabels from './CheckBoxLabels'
import { getLabels } from '../FirebaseServices';
import styles from './AddLabelsStyles';

var labelsObj = {}
var totalLabels = {}
var totalLabelId = {}
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
        totalLabelId : [],
        totalLabels : [],
    };
  }

backCreateNotes = () => {
  totalLabelId = this.state.totalLabelId
  totalLabels = this.state.totalLabels
  console.log(" lllllllll .... ",totalLabelId);
  console.log("Name of Labels ...",totalLabels);
  
  this.props.navigation.navigate('CreateNotes',{ 'totalLabels' : this.state.totalLabels });
}

selectLabels = (labelId ,labelName) =>{
  this.state.selectedLabels.push(labelId, labelName) 
    this.state.totalLabelId.push(labelId)
    this.state.totalLabels.push(labelName)
    console.log("Mark labels ",labelId);
    this.props.labelsFun
    console.log(" selected labels ..... ",this.state.selectedLabels );
    // this.props.labelArray(labelId, labelName)
    labelsObj = this.state.selectedLabels
    console.log(" sessssssss",labelsObj);
    
}

componentDidMount = () => {
  var labelsArray = []
    getLabels((labels) => {
      
      Object.keys(labels).map((key,index)=>{

        var obj = {};
        obj.labelId = key;
        // console.log("iiiiiiiiiiiiiiiiiiiiiiidddddddddddd",obj.labelId);
        this.setState({ labelId : obj.labelId },()=>{ 
            console.log('labels id...',this.state.labelId)})

        obj.labelName = labels[key];

        this.setState({ labelName : obj.labelName},()=>{ 
          console.log(" labels name : ",this.state.labelName)})

        labelsArray.push(obj)

      })
      this.setState({ labelArray : labelsArray.reverse() })
    })

    // labelsObj = labelsArray
}

  render() {
    // console.log(" oooooobbbbbbbbbjjjjjjj",labelsObj);
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
