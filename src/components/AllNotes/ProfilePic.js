import React, { Component } from 'react';
import { View, Text, PermissionsAndroid , AsyncStorage, Image } from 'react-native';
import { Title, Paragraph, Avatar as AvatarP} from 'react-native-paper';
import { getUid, saveProfile, getUserDetails } from '../FirebaseServices';
import ImagePicker from 'react-native-image-picker';
import { Dialog, Avatar, Button } from 'material-bread';
import * as Permissions from './Permissions';
//import Authenticate user navigation.

const Option = {
    title : 'Select Avter',
    storageOptions : {
        skipBackup : true,
        noDate : true
    }
}
export default class ProfilePic extends Component {
    constructor(props){
        super(props);
        this.state = {
            visible : false,
            image : null,
            userObj : null,
            firstName : '',
            lastName : '',
            ProfileImage : null,
            user : null,
        }
    }

    uploadProfileImage = async () =>{

        const grantCam = await PermissionsAndroid.check( 
            PermissionsAndroid.PERMISSIONS.CAMERA)

        const grantRead = await PermissionsAndroid.check( 
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)

        const grantWrite = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)

        if( grantCam && grantRead && grantWrite){
            this.selectImage();
        }
        else{
            await Permissions.requestCameraPermission();
            await Permissions.requestExternalStoragePermission();
            this.uploadProfileImage();
        }

    }

    selectImage = () =>{
        ImagePicker.showImagePicker( Option,
            async ( Response ) => {
                if( Response.uri ){
                    await this.setState({
                        image : Response
                    })
                    //Firebase Method
                    saveProfile(Response.uri)
                }
            });
    }

    randomColor = () => {
        let colorArray = [
            '#4f2da6', '#cc405c', '#cf6017', '#d1d119', '#54d421',
            '#4d41d4', '#1acfd9', '#25465e', '#625f63', '#2f8f7c',
            '#027b99', '#eb4949', '#bd8b02', '#32a88f', '#655dcf'
        ];
        let random = Math.floor(Math.random()*colorArray.length)
        return colorArray[random];
    }

    logOutUser = () => {
        this.setState ({ visible : false },
            this.props.navigation.navigate('LoginPage')
        )

    }
    componentDidMount = async () => { 
        console.log("componentDidMount of Profile Pic");    
        getUserDetails(async (snapshot) => {
            this.setState({
                userObj : snapshot,
                firstName : snapshot.firstName,
                lastName : snapshot.lastName,
                ProfileImage : snapshot.ProfileImage ,
                user : snapshot.userData
            },()=>{
                console.log("state of Profile Pic",this.state);
                
            })
        })
    }
    componentWillUnmount = async () =>{
        getUserDetails(async(snapshot)=>{
            this.setState({ ProfileImage : snapshot.ProfileImage },()=>{
                console.log("hhhhhhhhhhhhhhhhhh");  
            })
        })
    }

  render() {
      console.log("picture is...",this.state.ProfileImage);
    return (
        <View>
                <Avatar
                    type =  {   
                                this.state.userObj === null || 
                                this.state.userObj.ProfileImage === undefined ? 
                                "text" : 'image'
                            }
                    content = { 
                                this.state.userObj !== null 
                                && (this.state.userObj.firstName).charAt(0)
                              }
                    contentColor = { 'white' }
                    size = { 45 }
                    color = { this.randomColor() }
                    image = { this.state.ProfileImage !== null && this.state.ProfileImage !== undefined
                        && <Image source = {{ uri: this.state.ProfileImage }} />}
                    onPress = { ()=>{ this.setState({ visible : !this.state.visible })}}
                />
            {/* {
                this.state.userObj !== null && this.state.userObj !== undefined ?
                
                this.state.userObj.ProfileImage === null || this.state.userObj.ProfileImage === undefined ? 
                <AvatarP.Text 
                        size = { 50 } 
                        label = { this.state.userObj.firstName !== null && 
                            this.state.userObj.firstName !== undefined ? 
                            this.state.userObj.firstName.charAt(0) : '' 
                        }
                        onPress = { ()=>{ this.setState({ visible : !this.state.visible })}}
                />
                :
                <AvatarP.Image 
                        size = { 50 } 
                        source = {this.state.userObj.ProfileImage}
                        // source = {{ 
                        //     uri : this.state.userObj.ProfileImage !== null && 
                        //     this.state.userObj.ProfileImage !== undefined ?
                        //     this.state.userObj.ProfileImage : ''
                        // }}
                        onPress = { ()=>{ this.setState({ visible : !this.state.visible })}}
                />
                : null
            } */}

            <Dialog
                visible = {this.state.visible}
                onTouchOutside = {() => this.setState({ visible: false })}
                style = {
                    {
                        width: 300,
                        padding: 10,
                    }
                }
                >

                <Avatar
                    type =  {   
                                this.state.userObj === null || 
                                this.state.userObj.ProfileImage === undefined ? 
                                "text" : 'image'
                            }
                    content = { 
                                this.state.userObj !== null 
                                && (this.state.userObj.firstName).charAt(0)
                              }
                    contentColor = { 'white' }
                    size = { 150 }
                    color = { this.randomColor() }
                    image = { this.state.ProfileImage !== null 
                        && <Image source = {{ uri: this.state.userObj.ProfileImage }} />}
                    style = {
                    {
                        alignSelf : 'center',
                    }
                    }
                    onPress = { this.uploadProfileImage }
                />

                {
                    this.state.userObj !== null &&
                    <View style = {{ alignItems : 'center' }}>
                    <Title>
                        {   
                            this.state.userObj.lastNamae !== undefined ?
                            this.state.userObj.firstName + ' ' + 
                            this.state.userObj.lastNamae : 
                            this.state.userObj.firstName 
                        }
                    </Title>

                    <Paragraph>
                        { 
                            this.state.userObj.emailId 
                        }
                    </Paragraph>

                    </View>
                }

                <View
                    style = {{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        paddingVertical: 20
                    }}
                  >

                    <Button
                        text = {'cancel'}
                        onPress = { () => this.setState({ visible: false }) }
                    />
                    <Button
                        text = {'Sign out'}
                        onPress = { this.logOutUser }
                    />
          </View>
        </Dialog>
        </View>
      
    );
  }
}

