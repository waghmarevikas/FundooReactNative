import React, { Component } from 'react';
import { View, Text, PermissionsAndroid , AsyncStorage, Image } from 'react-native';
import { Title, Paragraph} from 'react-native-paper';
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

    componentDidMount = async () => {
        getUserDetails(async (snapshot) => {
            console.log( " Profile Image : " ,snapshot);
            this.setState({
                userObj : snapshot,
                firstName : snapshot.firstName,
                lastName : snapshot.lastName,
                ProfileImage : snapshot.ProfileImage 
            })
        })
    }

  render() {
    return (
        <View>
            <Avatar
                type = { 'image' }
                size = { 35 }
                image = { <Image source = {{ uri : this.state.ProfileImage }}/>}
                onPress = { ()=>{ this.setState({ visible : !this.state.visible })}}
            />

            <Dialog
                visible = {this.state.visible}
                onTouchOutside = {() => this.setState({ visible: false })}
                style = {
                    {
                    width: 400,
                    padding: 10,
                    }
                }
                >

                <Avatar
                    type =  {   this.state.userObj === null || 
                                this.state.userObj.ProfileImage === undefined ? 
                                "text" : 'image'
                            }
                    content = { this.state.userObj !== null 
                                // && (this.state.userObj.firstName).charAt(0)
                              }
                    contentColor = { 'white' }
                    size = { 100 }
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
                        {   this.state.userObj.lastNamae !== undefined ?
                            this.state.userObj.firstName + ' ' + 
                            this.state.userObj.lastNamae : 
                            this.state.userObj.firstName 
                        }
                    </Title>

                    <Paragraph>
                        { this.state.userObj.emailId }
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
                        onPress = { () => onSignOut().then(() =>
                            this.setState({ visible: false }),
                            this.props.navigation.navigate('LoginPage'))
                        }
                    />
          </View>
        </Dialog>
        </View>
      
    );
  }
}

