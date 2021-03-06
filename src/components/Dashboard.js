import React, { Component } from 'react';
import { View, Text, ScrollView, AsyncStorage, FlatList } from 'react-native';
import styles from './DashboardStyles';
import { Badge, Appbar, BottomNavigation, Drawer, FAB, Card } from 'react-native-paper';
import { SearchBar, Avatar, Overlay, Button, } from 'react-native-elements';
import { Spinner } from 'native-base';
import { Chip } from 'material-bread';
import PushNotification from 'react-native-push-notification'
import NoteCard from '../../src/components/AllNotes/NotesAddInCard';
import { getNotes, getUid } from './FirebaseServices';
import TopAppbar from '../../src/components/login module/TopAppbar';
import ProfilePic from '../components/AllNotes/ProfilePic';
import moment from 'moment';

const grid = require('../../src/Asset/grid.png')
const accountIcon = require('../../src/Asset/account.png')
var dateTime, note, title, systemTime;
const URL = "https://www.google.com/"
// var SendIntentAndroid = require("react-native-send-intent");

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.fetchTitle = this.props.navigation.getParam('title',null)
        this.state = {
            searchText: '',
            list: true,
            isSearching: false,
            gridNotes: false,
            isVisible: false,
            reminders: false,
            signIn: false,
            notes: null,
            pinData: [],
            unpinData:[],
            loader: true,
            ArchiveTouch : false,
            appbarTitle : this.fetchTitle,
            currentTime : '',
            dialogVisible: false,
            profileVisible: false,
        };
    }
    
    logout = () => {
        console.log(" logout in dashboard .... ");
        this.setState({
            isVisible: false,
            signIn: true,
        },()=>{ 
        AsyncStorage.setItem('uid', "null")
        this.props.navigation.navigate('LoginPage')
        console.log(" Log out ")})  
    }

    navigateToCreateNotes = (noteObj) => {
        this.props.navigation.navigate('CreateNotes', { 'noteObj': noteObj })
    }
    
    togleGridNotes = () => {
        this.setState({
            gridNotes :! this.state.gridNotes
        })
    }
    
    avtarVisibility = () => {
        this.setState({ isVisible : !this.state.isVisible })
    }

    drawerOpen = () => {
        this.props.navigation.openDrawer()
    }

    showNotification = (dateTime, note, title) => {

        if (this.state.currentTime === dateTime) {
          PushNotification.localNotification({
            title : title,
            message : note,
            color : 'white',
            vibrate : true,
          })
        }
    }

    //Remove listeners allocated in createNotificationListeners()
    componentWillUnmount() {
            this.notificationListener
            this.notificationOpenedListener
    }

    async createNotificationListeners() {
        /*
        * Triggered when a particular notification has been received in foreground
        *
    */
        console.log('notification'),

      this.notificationListener = firebase.notifications().onNotification((notification) => {
        const { title, body } = notification;
        this.showAlert(title, body);
      });

    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
    });

    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      console.log(JSON.stringify(message));
    });
  }

    showAlert(title, body) {
        Alert.alert(
        title, body,
        [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
        );
    }

    handleCancel = () =>{
        this.setState({ dialogVisible: false, profileVisible: false  })

    }

    componentDidMount = () => {
        //Get user Id from firebase services
        // getUid()
        this.showNotification(dateTime, note, title)
        var date = moment()
          .utcOffset('+05:30')
          .format('YYYY-MM-DD LT');
        this.setState({
          currentTime: date
        });
        getNotes((notes) => {
            var pinData = [],unpinData=[];
            if(notes !== null){ 
                Object.keys(notes).map((key, index) => {
                    notes[key].noteId = key;
                    if(notes[key].pin === false && 
                        notes[key].date !== undefined && notes[key].time !== undefined &&
                        notes[key].trash === false)
                    {
                        unpinData.push(notes[key])
                    }
                    if(notes[key].pin === true && notes[key].trash === false)
                    {
                        pinData.push(notes[key])
                    }
                })
                this.setState({
                    pinData: pinData,
                    unpinData:unpinData,
                    loader: false
                })  
            }
        })

    }

    render() {

        return (

            <View style = { styles.mainView }>

                <TopAppbar
                    appbarTitle = { this.state.appbarTitle }
                    gridNotes = { this.state.gridNotes }
                    isVisible = { this.state.isVisible }
                    drawerOpen = { this.drawerOpen }
                    togglegridNotes = { this.togleGridNotes }
                    toggleisVisible = { this.avtarVisibility }
                    {...this.props}
                />

                <View style = {{height: '83%'}} >
                    <ScrollView>
                        {
                            this.state.loader == true ?
                                <View style = { styles.loaderView }>
                                    <Spinner />
                                </View>
                                :
                                this.state.pinData != null &&
                                this.state.gridNotes == false &&
                                <FlatList
                                    ListHeaderComponent = {
                                        <Text style = {{ fontSize : 20, fontStyle : 'italic'}} > 
                                            Pin 
                                        </Text>
                                    }
                                    numColumns = {2}
                                    data = { this.state.pinData }
                                    renderItem = {({ item }) =>
                                        <NoteCard
                                            noteObj = { item }
                                            Title = { item.title }
                                            Data = { item.note }
                                            color = { item.color }
                                            image = { item.imgURL }
                                            GridStatus = { this.state.gridNotes }
                                            navigateToCreateNotes = { this.navigateToCreateNotes }
                                            Date = { item.date }
                                        />
                                    }
                                />

                        }

                        {

                            this.state.pinData != null &&
                            this.state.gridNotes == true &&
                            <FlatList
                                ListHeaderComponent = { 
                                    <Text style = {{ fontSize : 20, fontStyle : 'italic'}}> 
                                        Pin 
                                    </Text>
                                }
                                data = { this.state.pinData }
                                renderItem = {({ item }) =>
                                    <NoteCard
                                        Title = { item.title }
                                        Data = { item.note }
                                        color = { item.color }
                                        image = { item.imgURL }
                                        GridStatus = {this.state.gridNotes}
                                        navigateToCreateNotes = {this.navigateToCreateNotes}
                                        noteObj = {item}
                                        Date = { item.date }
                                    />
                                }
                            />

                        }
                        {
                            this.state.loader == true ?
                                <View style = { styles.loaderView }>
                                    <Text> Fundoo Keep </Text>
                                    <Spinner />
                                </View>
                                :
                                this.state.unpinData != null &&
                                this.state.gridNotes == false &&
                                <FlatList
                                    ListHeaderComponent = { 
                                        <Text style = {{ fontSize : 20, fontStyle : 'italic'}} > 
                                            Other 
                                        </Text>
                                    }
                                    numColumns = {2}
                                    data = {this.state.unpinData}
                                    renderItem = {({ item }) =>
                                        <NoteCard
                                            noteObj = {item}
                                            Title = { item.title }
                                            Data = { item.note }
                                            color = { item.color }
                                            image = { item.imgURL }
                                            GridStatus = {this.state.gridNotes}
                                            navigateToCreateNotes = {this.navigateToCreateNotes}
                                            Date = { item.date }
                                        />
                                    }
                                />

                        }

                        {

                            this.state.unpinData != null &&
                            this.state.gridNotes == true &&
                            <FlatList
                                ListHeaderComponent = { 
                                    <Text style = {{ fontSize : 20, fontStyle : 'italic'}} > 
                                        other
                                    </Text>}
                                data = { this.state.unpinData }
                                renderItem = {({ item }) =>
                                    <NoteCard
                                        Title = { item.title }
                                        Data = { item.note }
                                        color = { item.color }
                                        image = { item.imgURL }
                                        GridStatus = {this.state.gridNotes}
                                        navigateToCreateNotes = {this.navigateToCreateNotes}
                                        noteObj = {item}
                                        Date = { item.date }
                                    />
                                }
                            />

                        }
                    </ScrollView>
                </View>

                
                    <Appbar style = {styles.appbarStyle} >

                        <Appbar.Action
                            style = {{ marginLeft: '5%' }}
                            icon = 'check-box-outline'
                        >
                        </Appbar.Action>

                        <Appbar.Action
                            style = {{ marginLeft: '2%' }}
                            icon = 'brush'
                        >
                        </Appbar.Action>

                        <Appbar.Action
                            style = {{ marginLeft: '2%' }}
                            icon = 'microphone'
                        >
                        </Appbar.Action>

                        <Appbar.Action
                            style = {{ marginRight: '5%' }}
                            icon = 'image'
                        >
                        </Appbar.Action>

                    </Appbar>

                    <FAB
                        style = {styles.fabStyles}
                        icon = "plus"
                        onPress = {() => {
                            this.props.navigation.navigate('CreateNotes')
                        }}
                        >
                    </FAB>
                
                {/* <Overlay
                    isVisible = {this.state.isVisible}
                    windowBackgroundColor = " rgba(255, 255, 255, .5) "
                    overlayBackgroundColor = "#696969"
                    width = '80%'
                    height = '30%'
                    overlayStyle = {{ borderRadius: 15, }}
                    onBackdropPress = {() => {
                        this.setState({
                            isVisible: false
                        })
                    }}
                > */}
                    {/* <View style = {styles.overlayView}> */}

                        {/* <View style = { styles.avtarView} >
                            {/* <Avatar
                                size = {'medium'}
                                rounded
                                title = 'V'
                                titleStyle = {{ color: 'black', fontSize : 35}}
                                // avatarStyle = {{ backgroundColor : 'blue' }}
                                activeOpacity = {0.7}
                                >
                            </Avatar> */}
                            {/* <ProfilePic
                                logOut = { this.logout }
                                {...this.props}
                            /> */}
                        {/* </View> */} 

                        

                        {/* <View style = {styles.overlayText}>

                            <View style = {styles.overlayTitle}>
                                <Text style = {{ fontSize: 20, }}>
                                    vikas waghmare
                                </Text>
                            </View>

                            <View style = {styles.overlaySubTitle}>
                                <Text style = {{ fontSize: 15, }}>
                                    vikas@gmail.com
                                </Text>
                            </View>

                        </View> */}

                    {/* </View> */}

                    {/* <View style = {styles.overlayButton}>
                        <Button
                            title = '  SIGN OUT  '
                            type = { this.state.signIn ? 'solid' : 'solid' }
                            onPress = { this.logout } 
                        >
                        </Button>
                    </View> */}

                {/* </Overlay> */}
            </View>

        );
    }
}
export default Dashboard;
