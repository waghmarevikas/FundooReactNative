import React, { Component } from 'react';
import { View , Text , Image , TextInput } from 'react-native';
import { Icon } from 'react-native-elements'
import { Menu } from 'react-native-paper'
import styles from './CreateNotesStyles';
import firebase from '../FireBase'; 
import { createUserNote , } from '../FirebaseServices'

var util = require('../AllNotes/CreateNotesModel');
var objNotesModel = new util.UserNotesModel();

class CreateNotes extends Component {
    constructor(props){
        super(props);
        this.fetchNote = this.props.navigation.getParam('noteObj',null)
        this.state = {
            title : this.fetchNote === null ? '': this.fetchNote.title,
            note : this.fetchNote === null ? '': this.fetchNote.note,
            pin : this.fetchNote === null ? false: this.fetchNote.pin,
            archive : this.fetchNote === null ? false: this.fetchNote.archive,
            isMenu : false,
        }

        this.moreRef = React.createRef();
    }

    handleNoteSubmit = () => {
        if(!this.state.title && !this.state.note)
        {
            console.log("Node is empty...")
        }
        else
        {
            var obj = {
                title : this.state.title,
                note : this.state.note,
                pin : this.state.pin,
                archive : this.state.archive,
            }
            objNotesModel.handleCreateNotes(obj)    
        }
        this.props.navigation.navigate('Dashboard')
    }

    handleNoteCardsUpdate = () =>{
            var obj = {
                title : this.state.title,
                note : this.state.note,
                pin : this.state.pin,
                archive : this.state.archive,
            }
        objNotesModel.NoteCardsUpdate(obj, this.fetchNote.noteId);
        this.props.navigation.navigate('Dashboard')
    }

    handleArchiveNoteSubmit = () => { 
        if(!this.state.title && !this.state.note)
        {
            console.log(" Node is empty... ")
        }
        else
        {
            this.setState({ archive : true },()=>{
                var obj = {
                    title : this.state.title,
                    note : this.state.note,
                    pin : this.state.pin,
                    archive : this.state.archive,
                }
                objNotesModel.handleCreateNotes(obj)
            })
            
        }
        this.props.navigation.navigate('Dashboard')
    }

    updateArchiveNotes = () => {
        var obj = {
            title : this.state.title,
            note : this.state.note,
            pin : this.state.pin,
            archive : this.state.archive,
        }
    objNotesModel.NoteCardsUpdate(obj, this.fetchNote.noteId);
    this.props.navigation.navigate('Dashboard')
    }

    handleIsMenu = () =>{
        console.log( " isssssssssssssssssssssssssssssssssmmmmmmmmmmmmmm");
        this.setState({isMenu :! this.state.isMenu})
    }
  render() {
    return (
      <View style = { styles.mainView } >

          <View style = { styles.iconView }>

            <View style = { styles.backArrowView }>
                <Icon
                    name = 'keyboard-backspace'
                    color = 'black'
                    type = 'material-community'
                    onPress = { 
                        this.fetchNote === null ? 
                        this.handleNoteSubmit : this.handleNoteCardsUpdate }
                    >
                </Icon>
            </View>

            <View style = { styles.pinView }>
                <Icon
                    name = { this.state.pin ?  'pin' : 'pin-outline'}
                    type = 'material-community'
                    onPress = { ()=> this.setState({pin :! this.state.pin})}
                    >
                </Icon>
             </View>

            <View style = { styles.reminderView }>
                <Icon
                    name = 'bell-plus-outline'
                    type = 'material-community'
                    >
                </Icon>
             </View>

            <View style = { styles.archiveView }>
                <Icon
                    name = { this.state.archive ? 'archive' : 'archive'}
                    type = 'Foundation'
                    onPress = { ()=>{
                        if(this.state.archive === false)
                        this.setState({
                            archive : true
                        },()=>{
                            this.updateArchiveNotes()
                        })
                        else{
                            this.setState({
                                archive : false
                            },()=>{
                                this.updateArchiveNotes()
                            }) 
                        }
                    }
                        } 
                    >    
                </Icon>
            </View>

          </View>

          <View style = { styles.textInputView }>

                <TextInput
                    style = {{ 
                        fontSize : 20,
                        marginRight : '3%',
                        color : 'black'
                    }}
                    placeholder =  'title'
                    multiline = { true }
                    value = { this.state.title }
                    onChangeText = { (text)=>{
                        this.setState({ title : text })
                    }}
                    >
                </TextInput>

                <TextInput
                    style = {{ 
                        fontSize : 20,
                        marginRight : '3%'
                    }}
                    placeholder = 'Note'
                    multiline = { true }
                    value = { this.state.note }
                    onChangeText = { (text)=>{
                        this.setState({ note : text })
                    }}
                    >

                </TextInput>
          </View>

          <View style = { styles.bottumIconView }>

                <View >
                    <Icon
                        style = {{ marginTop : 10,}}
                        name = 'plus-box-outline'
                        type = 'material-community'
                        
                        >
                    </Icon>
                </View>

                <View >
                    <Icon
                        ref = { this.moreRef }
                        name = 'dots-vertical' 
                        type = 'material-community'
                        onPress = {
                            ()=>{
                                console.log("ttttttttttttttttttttttt");  
                            }
                        }
                        >
                    </Icon>
                </View>

            </View>

            <View>
                <Menu 
                    visible = { this.state.isMenu  }
                    onDismiss = { this.handleIsMenu }
                    anchor = { this.moreRef.current}
                    >
                </Menu>
            </View>

      </View>
    );
  }
}

export default CreateNotes;