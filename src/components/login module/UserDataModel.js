import React, { Component } from 'react';
import { View , Text, AsyncStorage} from 'react-native';
import firebase from '../FireBase';
import { createUserNote } from '../FirebaseServices';
 class UserDataModel{
    constructor(data){
        console.log("Data"+data);   
    }

    handleUserLoginAuth = (emailId, password,callback) => {
        firebase.auth().signInWithEmailAndPassword(emailId,password).then((success)=>{
            console.log("success:",success);
            AsyncStorage.setItem('uid',success.user.uid)
            callback()
        })
        .catch((error)=>{
            console.log("error:",error);
            alert( " Error....Invalid User ")
        })  
    }

    handleCreateNotes = ( dataObj ) => {
        createUserNote(dataObj);
    }
    
    // handleMod = (data) => {
    //     console.log(data+" Printed...");
        
    // }
}
module.exports.UserDataModel = UserDataModel;

