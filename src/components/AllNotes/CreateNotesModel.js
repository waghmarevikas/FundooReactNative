import React, { Component } from 'react';
import { View , Text, AsyncStorage} from 'react-native';
import firebase from '../FireBase';
import { createUserNote, getNotes, updateUserNote } from '../FirebaseServices';
 class UserNotesModel{
    constructor(data){
        console.log("Data"+data);   
    }

    handleCreateNotes = ( dataObj ) => {
        createUserNote(dataObj);
        
    }

    handleGetNote = (callback) => {
        getNotes(callback);
    }

    NoteCardsUpdate = (dataObj, key) => {
        updateUserNote(dataObj, key);
    }
    
}
module.exports.UserNotesModel = UserNotesModel;

