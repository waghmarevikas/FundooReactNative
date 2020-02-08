import React, { Component } from 'react';
import { View, Text, TextInput, FlatList, ScrollView } from 'react-native';
import { Icon, Divider } from 'react-native-elements';
import styles from './EditeLabelsStyles';
import Labels from './Labels';
import { createLabels, getLabels } from '../FirebaseServices';
export default class EditLabels extends Component {
  constructor (props){
    super(props);
    this.state = {
      createLable : false,
      check : false,
      labelName : '',
      labelId : '',
      labelArray : [],
    }
  }

  handleChecks = () =>{
    createLabels( this.state.labelName )
    this.setState({ check : !this.state.check,
    labelName : '' })
  }

  backDashboard = () =>{
    this.props.navigation.navigate('Notes');
  }

  componentDidMount = () => {
    getLabels((labels) => {
      let labelsArray = []
      Object.keys(labels).map((key,index)=>{
        var obj = {};
        obj.labelId = key;
        obj.labelName = labels[key];
        labelsArray.push(obj)
      })
      this.setState({labelArray:labelsArray.reverse()})
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
              onPress = { this.backDashboard }
            />

            <View style = { styles.editView }>
              <Text style = {{ fontSize : 20}}>
                Edit labels
              </Text>
            </View>

          </View>

          <View style = { styles.subView }>
          <View style = { styles.createView }>
            {
              this.state.createLable === false ? 
              null :
              <Divider style = {{ backgroundColor : 'red', marginTop : '10%', }} />
            }

            <View style = { styles.plusIcon }>
              <Icon
                name = { this.state.createLable === false ? 'plus' : 'close'}
                type = 'material-community'
                size = { 35 }
                iconStyle = { this.state.createLable === false ? 
                          {marginTop : 0} : {marginTop : '25%'}
                        }
                onPress = { ()=>{ 
                  this.setState({ createLable : !this.state.createLable},
                    )}}
                />
            </View>

            <View 
              style = {{ marginLeft : '3%', 
                          marginTop : '1%', 
                          width : '60%',
                      }} 
              >
              { 
                this.state.createLable === false ? 
                <Text 
                  style = {{ fontSize : 20, color : '#808080'}}
                  onPress = { ()=>{ this.setState({ createLable : true })}}
                  >
                    Create new label 
                </Text>
                :
                <TextInput
                    style = {{ 
                        fontSize : 20,
                        marginRight : '3%',
                        color : 'black',
                    }}
                    placeholder =  'Create new lable '
                    multiline = { true }
                    value = { this.state.labelName }
                    onChangeText = { (text)=>{
                        this.setState({ labelName : text })
                    }}
                  >
                </TextInput>
                
              }

            </View>
              <View style = { styles.checkView }>
                  {
                      this.state.createLable === false ? null :
                        <Icon
                          name = 'check'
                          size = { 35 }
                          onPress = {  this.handleChecks }
                        />
                  }
              </View>

              {
                  this.state.createLable === false ? 
                  null :
                  <Divider style = {{ backgroundColor : 'black' }} />
              }

              
          </View>
          </View>
              
          <ScrollView>
              <View style = { styles.labelView }>
                  <FlatList
                      data = { this.state.labelArray }
                      renderItem = { ({ item })=>
                          <Labels
                            labelObj = { item }
                            labelName = { item.labelName }
                          />
                        }
                    />
              </View>
          </ScrollView>

      </View>
    );
  }
}


