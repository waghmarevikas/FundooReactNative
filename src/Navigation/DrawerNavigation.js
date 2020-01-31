
import React, { Component } from 'react';
import { View , Text } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import Dashboard from '../components/Dashboard'
import { Icon , Image } from 'react-native-elements';
import Reminder from '../../src/components/login module/Reminders';
import ArchiveNotes from '../components/AllNotes/ArchiveNotes';
import TrashNotes from '../components/login module/TrashNotes';
import SettingMenu from '../components/login module/SettingMenu';
import HelpAndFeedback from '../components/login module/Help&feedbach'

const reminderImage = require('../Asset/reminder.png')
const notesImage = require('../Asset/notes.png')
const archiveImage = require('../Asset/archive.png');
const trashImage = require('../Asset/trash.png')
const settingImage = require('../Asset/setting.png');
const helpImage = require('../Asset/help.png');
const DrawerNavigation = createDrawerNavigator({


    Notes: { screen: Dashboard, params : { 'title' : 'Search your Notes'}, navigationOptions : 
        { drawerIcon : <Image source = { notesImage } 
        style = {{ width: 20, height: 20, }}></Image> }},

    
    Reminders: { screen : Dashboard, params : { 'title' : 'Reminders'},navigationOptions : 
        { drawerIcon : <Image source = { reminderImage } 
         style ={{ width : 20 , height : 20}}></Image>} },
    
    ArchiveNotes: { screen : ArchiveNotes,params : { 'title' : 'Archive Notes'} ,navigationOptions : 
        { drawerIcon : <Image source = { archiveImage } 
        style ={{ width : 20 , height : 20}}></Image>}},

    TrashNotes: { screen : Dashboard, params : { 'title' : 'Trash Notes'},navigationOptions :
        { drawerIcon: <Image source = { trashImage } 
        style ={{ width : 20 , height : 20}}></Image>}},

    SettingMenu: { screen : SettingMenu, navigationOptions :
        { drawerIcon: <Image source = { settingImage } 
        style ={{ width : 20 , height : 20}}></Image>}},

    HelpAndFeedback: { screen : HelpAndFeedback, navigationOptions : 
        { drawerIcon: <Image source = { helpImage } 
        style ={{ width : 20 , height : 20}}></Image>}}
      
},{
    initialRouteName:'Notes'
})
const AppDrawerNavigation = createAppContainer(DrawerNavigation);
export default AppDrawerNavigation;




