import React, { Component } from 'react';
import { View , Text , Image , TextInput, Button } from 'react-native';
import { Icon, Overlay } from 'react-native-elements'
import { Menu, Provider } from 'react-native-paper'
import styles from './CreateNotesStyles';
import firebase from '../FireBase'; 
import { createUserNote , } from '../FirebaseServices'
import PushNotification from "react-native-push-notification"
import MenuList from './MenuList';
import LabelAdd from './AddLabelOnCard';
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import Moment from 'moment';
import { Chip } from 'material-bread';
import moment from 'moment';
import FastImage from 'react-native-fast-image';

var util = require('../AllNotes/CreateNotesModel');
var objNotesModel = new util.UserNotesModel();

class CreateNotes extends Component {
    constructor(props){
        super(props);
        
        this.fetchNote = this.props.navigation.getParam('noteObj',null) 
        this.fetchLabel = this.props.navigation.getParam('totalLabels',null) 
        
        this.state = {
            title : this.fetchNote === null ? '' : this.fetchNote.title,
            note : this.fetchNote === null ? '': this.fetchNote.note,
            pin : this.fetchNote === null ? false : this.fetchNote.pin,
            archive : this.fetchNote === null ? false : this.fetchNote.archive,
            trash : this.fetchNote === null ? false : this.fetchNote.trash,
            color : this.fetchNote === null ? '' : this.fetchNote.color,
            imgURL : this.fetchNote === null ? '' : this.fetchNote.imgURL,

            label : this.fetchNote === null ? '' : 
            this.fetchNote.label !== undefined ? this.fetchNote.label : '',

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
            labelArray : [],
            dialogVisible: false,
            dateTime : '',
            date2:'',
            time2 : '',
        }

        this.moreRef = React.createRef();
        this.moreRefPlus = React.createRef();
    }

    handleNoteSubmit = () => {
        if(!this.state.title && !this.state.note)
        {
            alert("Node is empty...")
        }
        else
        {
            // PushNotification.localNotificationSchedule({
            //     //... You can use all the options from localNotifications
            //     message : this.state.title,
            //     subText : this.state.note,
            //     date : this.state.dateTime
            //   });

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
                imgURL : this.state.imgURL,
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
                imgURL : this.state.imgURL
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
                    imgURL : this.state.imgURL,
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
            imgURL : this.state.imgURL,
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
                    imgURL : this.state.imgURL,
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
            alert(" Empty trash notes ... ")
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
                    imgURL : this.state.imgURL,
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

    addLabelsOnNotes = () => { 
        if(this.state.label !== null){
            this.setState({ checkLabelVisible : true })
        }
    }

    addLabelsInArray = (labelId, labelName) => {
        this.state.labelArray.push(labelId, labelName)
        console.log(" Labelid And Name :- ",labelId ,"  ", labelName);
        
    }

    labelsFun = () =>{
        console.log(" call from add labels ...");
        
    }

    handleImage = (uri) =>{
        this.setState({ imgURL : uri })
    }

    handleCaptureImage = (uri) =>{
        this.setState({ imgURL : uri })
    }

    handleShowDialog = (status) => {
        this.setState({ dialogVisible: status })
    };

    handleCloseDialog = (status, date, time, dateTime) => {
        this.setState({ dialogVisible : status, date: date, time: time, dateTime : dateTime })
    };

    setDate = () => {
        var time1 =
        this.setState({ date: false });
    };
    
    setTime = () => {
        this.setState({ date: false });
    };
    
    
    handleDatePicked = (date) => {
        var mj = JSON.stringify(date)
        var Date1 = mj.slice(1, 11)
        this.setState({ date: Date1 , isDatePickerVisible : false,
            date2 : moment(date).format()
        },()=>{ console.log( "Date is idjf'lj'.......",this.state.date);
        })
    };
    
    handleTimePicked = (date) => {
        var d = " " + date
        var dm = d.slice(17, 25)
        this.convert12hour(dm);
        var mj = JSON.stringify(date)
        var Time1 = mj.slice(11, 25)
        this.setState({ isTimePickerVisible : false, time : Time1,
            time2 : moment(Time1).format('hh : mm a')
         },
            ()=>{ console.log(" Time is.....",this.state.time )})
    };
    
    handleNotification = () => {
        var date = this.state.date + this.state.time
        var date23 = new Date(date)

        this.setState({ dateTime : date23 },()=>{
            // console.log(date23);
            // if (this.state.time !== null && this.state.date !== null) {
            //   this.handleSave(this.state.date, this.state.setTime, date23)
            // }
            // else {
            //   alert('entrer all details')
            // }
            PushNotification.localNotificationSchedule({
                //... You can use all the options from localNotifications
                message : this.state.title,
                subText : this.state.note,
                date : this.state.dateTime
              });
        });
        
    }

    convert12hour = (dm) => {
        var timeString = dm;
        var H = +timeString.substr(0, 2);
        var h = H % 12 || 12;
        var ampm = (H < 12 || H === 24) ? "AM" : "PM";
        timeString = h + timeString.substr(2, 3) + ampm;
        this.setState({ setTime: timeString })
    }

    handleDateTime = () =>{
        if(this.state.date !== null && this.state.time !== null ){

            // PushNotification.localNotificationSchedule({
            //         //... You can use all the options from localNotifications
            //     message : this.state.title,
            //     subText : this.state.note,
            //     date : this.state.dateTime
            // });

            this.setState({
                isDatePickerVisible : false,
                isVisible : false,
                chipVisible : true,
                reminderDate  : true,
            },()=>{
                this.handleNotification();
            })
        }  
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
                    onPress = { ()=> this.setState({ pin :! this.state.pin })}
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

          <View 
                style = {{ 
                    display : 'flex',
                    flexDirection : 'column',
                    backgroundColor : this.state.color,
                    marginTop : '2%',
                    marginLeft : '3%',
                    marginRight : '2%',
                    height : '20%'
                }}
                >

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

        {
            this.state.imgURL !== undefined && this.state.imgURL !== '' ? 
            <View 
                style = {{ 
                    // backgroundColor : 'blue' , 
                    width : '80%', 
                    height : '60%', 
                    marginLeft : 35 
                }} 
                >
                <FastImage
                    style = {{ width : 150, height : 150, }}
                    source = {{
                        uri : this.state.imgURL,
                        headers : { Authorization : 'someAuthToken' },
                        priority : FastImage.priority.normal,
                    }}
                    resizeMode = { FastImage.resizeMode.stretch }
                />
            </View> 
            : null
        }
  

          <View style = { styles.chipView }>
                <Chip
                    visible = { this.state.chipVisible }
                    text = { moment(this.state.date).format('MMM Do YY') }
                    leftIcon = { <Icon name = 'alarm' type = 'material-community'/>}
                />
          </View>

          <View style = { styles.checkLabelChip }>
              {
                  this.fetchLabel === null ?
                  false  :
                  <Chip
                    visible = { true }
                    
                    text = { this.fetchLabel[2] }
                    leftIcon = { <Icon name = 'label'/> }
                />
              }
             
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
                        addLabelsOnNotes = { this.addLabelsOnNotes } 
                        labelArray = { this.addLabelsInArray } 
                        // { ...this.props }
                        labelsFun = { this.labelsFun }
                        handleImage = { this.handleImage }
                        handleCaptureImage = { this.handleCaptureImage }
                        moreRefPlus = { this.moreRefPlus }
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
                        isVisible = { this.state.isDatePickerVisible }
                        mode = "date"
                        onConfirm = { this.handleDatePicked }
                    />
                    <DateTimePickerModal
                        isVisible = { this.state.isTimePickerVisible }
                        mode = "time"
                        onConfirm = { this.handleTimePicked }
                    />
                </View>  
            </Overlay> 
      </View>
        
     
    );
  }
}

export default CreateNotes;