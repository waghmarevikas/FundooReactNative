import firebase from 'firebase';
import { AsyncStorage } from 'react-native'
export  function createUser(email,password,obj,callback) {
     firebase.auth().createUserWithEmailAndPassword(email,password)
     .then((success) => {
         console.log("success",JSON.stringify(success));
        // localStorage.setItem('uid', success.user.uid)
        AsyncStorage.setItem('uid', success.user.uid)
         callback(JSON.stringify(success))
         putUserData(obj, success.user.uid)
         var actionCodeSettings = {
            url: 'https://www.example.com/finishSignUp?cartId=1234',
            iOS: {
              bundleId: 'com.example.ios'
            },
            android: {
              packageName: 'com.example.android',
              installApp: true,
              minimumVersion: '12'
            },
            // This must be true.
            handleCodeInApp: true
          };
        firebase.auth().sendSignInLinkToEmail(email,actionCodeSettings).then((success)=>{
            alert("Email send on Register email Id")
            callback(JSON.stringify(success))

        });
     })
     .catch((error)=>{
         console.log("error:",JSON.stringify(error));
         callback(error);
     })
 }

 function putUserData( obj , uid ){  
     firebase.database().ref('/users/'+uid+'/userData/').set(obj)
 }

 export async function createUserNote( obj ) {
  const uid = await AsyncStorage.getItem('uid')
  console.log(uid + ' : uid ');
  console.log(" Archive " + obj.archive)
  console.log(" Pin " + obj.pin)
  firebase.database().ref('/users/' + uid + '/notes/').push(obj);
 }
 
 export async function getUid(callback){
   const uid = await AsyncStorage.getItem('uid');
   console.log("uid:",uid);
   callback(uid);
 }

 export async function updateUserNote( obj , key ) {
  const uid = await AsyncStorage.getItem('uid');
  console.log(uid + ' : uid ');
  console.log(" Archive " + obj.archive)
  console.log(" Pin " + obj.pin)
  console.log(" Title " + obj.title);
  console.log(" Data " + obj.note)
  firebase.database().ref('/users/'+uid+'/notes/'+key).update(obj);
 }
 
 export async function getNotes(callback) {
  const uid = await AsyncStorage.getItem('uid');
  console.log( "UID is : " + uid );
    firebase.database().ref('/users/'+uid+'/notes/')
    .orderByChild('archive').equalTo(false)
    .on('value',(snapshot)=>{
    console.log("get Notes NOtes:",snapshot.val());
      callback(snapshot.val())
   })
 }

 export async function getArchiveNotes(callback) {
  const uid = await AsyncStorage.getItem('uid');
    firebase.database().ref('/users/'+uid+'/notes/')
     .orderByChild('archive').equalTo(true)
    .on('value',(snapshot)=>{
      callback(snapshot.val())
   })
 }
 
 export async function getTrashNotes(callback){
  const uid = await AsyncStorage.getItem('uid');
  firebase.database().ref('/users/'+uid+'/notes/')
      .orderByChild('trash').equalTo(true)
      .on('value',(snapshot)=>{
      console.log("get trash Notes NOtes:",snapshot.val());
        callback(snapshot.val())
})
 }
//  export function updateNote(key , obj) {
//    const uid = localStorage.getItem('uid');
//    console.log(uid + " Uid is ")
//    console.log(" Key is : " + key)
//    console.log("Object "+JSON.stringify(obj));
//    firebase.database().ref('/users/'+uid+'/notes/'+key).update(obj)
//  }


  // export function getArchiveNotes (callback) {
  //  const uid = localStorage.getItem('uid');
  //  console.log(uid + " Uis is ");
  //  firebase.database().ref('/users/' + uid + '/notes/').orderByChild('ArchiveStatus')
  //  .equalTo(true).on('value',(snapshot)=>{
  //    snapshot.val()
  //    callback(snapshot.val())
  //  })
  //}