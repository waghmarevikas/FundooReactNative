import React, { Component } from 'react';
import { View , Text , Image , TextInput, Button } from 'react-native';
import { Icon, Overlay } from 'react-native-elements'
import { Menu, Provider } from 'react-native-paper'
import styles from './CreateNotesStyles';
import firebase from '../FireBase'; 
import { createUserNote , } from '../FirebaseServices'
import MenuList from './MenuList';
import LabelAdd from './AddLabelOnCard';
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import Moment from 'moment';
import { Chip } from 'material-bread';
import moment from 'moment';

var util = require('../AllNotes/CreateNotesModel');
var objNotesModel = new util.UserNotesModel();

class CreateNotes extends Component {
    constructor(props){
        super(props);
        this.fetchNote = this.props.navigation.getParam('noteObj',null) 
        this.fetchLabel = this.props.navigation.getParam('labelIs',null) 
        console.log( " lables ",this.fetchLabel );
    
        this.state = {
            title : this.fetchNote === null ? '': this.fetchNote.title,
            note : this.fetchNote === null ? '': this.fetchNote.note,
            pin : this.fetchNote === null ? false : this.fetchNote.pin,
            archive : this.fetchNote === null ? false : this.fetchNote.archive,
            trash : this.fetchNote === null ? false : this.fetchNote.trash,
            color : this.fetchNote === null ? '' : this.fetchNote.color,
            label : this.fetchNote === null ? null : this.fetchNote.label,

            date : this.fetchNote === null ? '' : 
            this.fetchNote.date !== undefined ? this.fetchNote.date : '',

            time : this.fetchNote === null ? '' : 
            this.fetchNote.time !== undefined ? this.fetchNote.time : '',

            isMenu : true,
            ofMenu : true,
            isVisible : false,
            isDatePickerVisible : false,
            isTimePickerVisible : false,
            chipVisible : false,
            reminderDate : false,
            checkLabelVisible : false,
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
                trash : this.state.trash,
                color : this.state.color,
                date : this.state.date,
                time : this.state.time,
                reminderDate  : this.state.reminderDate,
                label : this.state.label,
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
                trash : this.state.trash,
                color : this.state.color,
                date : this.state.date,
                time : this.state.time,
                reminderDate  : this.state.reminderDate,
                label : this.state.label,
            }
        objNotesModel.NoteCardsUpdate(obj, this.fetchNote.noteId);
        this.props.navigation.navigate('Dashboard')
    }

    handleArchiveNoteSubmit = () => { 
        console.log("Archive notes ");
        if(!this.state.title && !this.state.note)
        {
            alert(" Empty...")
        }
        else
        {
            this.setState({ archive : true },()=>{
                var obj = {
                    title : this.state.title,
                    note : this.state.note,
                    pin : this.state.pin,
                    archive : this.state.archive,
                    trash : this.state.trash,
                    color : this.state.color,
                    date : this.state.date,
                    time : this.state.time,
                    reminderDate  : this.state.reminderDate,
                    label : this.state.label,
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
            trash : this.state.trash,
            color : this.state.color,
            date : this.state.date,
            time : this.state.time,
            reminderDate  : this.state.reminderDate,
            label : this.state.label,
        }
        objNotesModel.NoteCardsUpdate(obj, this.fetchNote.noteId);
        this.props.navigation.navigate('Dashboard')
    }

    updateTrashNoteSubmit = () => {
        if(!this.state.title && !this.state.note)
        {
            alert(" Empty...")
        }
        else
        {
            this.setState({ archive : false, pin : false,},()=>{
                var obj = {
                    title : this.state.title,
                    note : this.state.note,
                    pin : this.state.pin,
                    archive : this.state.archive,
                    trash : this.state.trash,
                    color : this.state.color,
                    date : this.state.date,
                    time : this.state.time,
                    reminderDate  : this.state.reminderDate,
                    label : this.state.label,
                }
                console.log("obj....",obj);
                objNotesModel.NoteCardsUpdate(obj, this.fetchNote.noteId);
            })  
        }
        this.props.navigation.navigate('Dashboard') 
    }

    handleTrashNoteSubmit = () => { 
        console.log("Trash notes ");
        if(!this.state.title && !this.state.note)
        {
            alert(" Empty...")
        }
        else
        {
            this.setState({ archive : true },()=>{
                var obj = {
                    title : this.state.title,
                    note : this.state.note,
                    pin : this.state.pin,
                    archive : this.state.archive,
                    trash : this.state.trash,
                    color : this.state.color,
                    date : this.state.date,
                    time : this.state.time,
                    reminderDate  : this.state.reminderDate,
                    label : this.state.label,
                }
                objNotesModel.handleCreateNotes(obj)
            })  
        }
        this.props.navigation.navigate('Dashboard')
    }

    handleIsMenu = () =>{
        this.setState({isMenu :! this.state.isMenu},()=>{
            console.log("asdftyfsddf",this.state.isMenu);
            
        }) 
    }

    handleDateTime = () =>{
        if(this.state.date !== null && this.state.time !== null ){
            this.setState({
                isDatePickerVisible : false,
                isVisible : false,
                chipVisible : true,
                reminderDate  : true,
            })
        }  
    }

    handleSetColor = (takeColor) =>{
        this.setState({ color : takeColor },
            ()=>{console.log("Color is",takeColor)})
    }

    navigateForaddLabel = () => {
        this.setState({ isMenu : false},()=>{
            console.log(" is me",this.state.isMenu);
            this.props.navigation.navigate('AddLabels');
        })
      
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
                    onPress = { ()=>{this.setState({ isVisible :! this.state.isVisible})}}
                    >
                </Icon>
             </View>

            <View style = { styles.archiveView }>
                <Icon
                    name = { this.state.archive ? 'unarchive' : 'archive'}
                    type = 'Foundation'
                    onPress = { ()=>{
                        if(this.fetchNote == null){
                            console.log("nuul fetch date ");
                            this.handleArchiveNoteSubmit()
                        }
                        else{
                            this.setState({
                                archive :! this.state.archive
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

        {/* <View style = {{ backgroundColor : 'color'}}>  </View> */}

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
      

          <View style = { styles.chipView }>
                <Chip
                    visible = { this.state.chipVisible }
                    text = { moment(this.state.date).format('MMM Do YY') }
                    leftIcon = { <Icon name = 'alarm' type = 'material-community'/>}
                />
          </View>

          <View style = { styles.checkLabelChip }>
              <Chip
                visible = { this.state.checkLabelVisible }
                leftIcon = { <Icon name = 'label'/> }
              />
          </View>

                <MenuList
                        visible = { this.state.isMenu }
                        closeMenu = { ()=> this.setState({ isMenu : false}) }
                        openMenu = { ()=> this.setState({ isMenu : !this.state.isMenu}) }
                        moreRef = { this.moreRef }
                        handleTrashNoteSubmit = { ()=>{
                                    if( this.fetchNote === null ){
                                        console.log(" Add trash ..");
                                        this.handleTrashNoteSubmit()
                                    }
                                    else{
                                        console.log(" Update trash ..");
                                        this.setState({ trash :! this.state.trash },
                                            ()=>{this.updateTrashNoteSubmit()})   
                                    }
                        }}
                        handleColor = { this.handleSetColor }
                        navigateForaddLabel = { this.navigateForaddLabel }  
                 />

             <Overlay
                isVisible = {this.state.isVisible}
                windowBackgroundColor = " rgba(255, 255, 255, .5) "
                overlayBackgroundColor = "white"
                width = '90%'
                height = '30%'
                overlayStyle = {{ borderRadius: 15, }}
                onBackdropPress = {() => {
                    this.setState({
                        isVisible : false,
                        isDatePickerVisible :false,
                        isTimePickerVisible : false,
                    })
                }}
                >
                <View>
                    <View style = { styles.dateView }>
                        <Button 
                            color = '#808080'
                            title = "  Date Picker " 
                            onPress = { ()=>this.setState({ isDatePickerVisible : true })} 
                        />
                    </View>

                    <View style = { styles.timeView }>
                        <Button
                            title = '  Time Picker '
                            color = '#808080'
                            onPress = { ()=>{ this.setState({ isTimePickerVisible : true })}}
                        />
                    </View>

                    <View style = { styles.saveDate }>
                        <Button
                            title = 'cancle'
                            onPress = { ()=> 
                                this.setState({ 
                                    isDatePickerVisible : false,
                                    isVisible : false,
                                })
                            }
                        />
                         <Button
                            title = 'save'
                            onPress = { this.handleDateTime }
                        />
                    </View>
                   
                    <DateTimePickerModal
                        isVisible = { this.state.isDatePickerVisible}
                        mode = "date"
                        onConfirm = { (date)=>{
                            console.log('Date is...',date);
                            this.setState({ isDatePickerVisible : false, 
                                date : moment(date).format() })           
                        }}
                    />
                    <DateTimePickerModal
                        isVisible = { this.state.isTimePickerVisible}
                        mode = "time"
                        onConfirm = {(time)=>{
                            console.log("Time is ...",time);
                            this.setState({ isTimePickerVisible : false, 
                            time : moment(time).format('hh : mm a') })
                        }}
                    />
                </View>  
            </Overlay> 
      </View>
        
     
    );
  }
}

export default CreateNotes;