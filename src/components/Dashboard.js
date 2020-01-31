import React, { Component } from 'react';
import { View, Text, ScrollView, AsyncStorage, FlatList } from 'react-native';
import styles from './DashboardStyles';
import { Badge, Appbar, BottomNavigation, Drawer, FAB, Card } from 'react-native-paper';
import { SearchBar, Avatar, Overlay, Button } from 'react-native-elements';
import { Spinner } from 'native-base';
import NoteCard from '../../src/components/AllNotes/NotesAddInCard';
import { getNotes } from './FirebaseServices';
import TopAppbar from '../../src/components/login module/TopAppbar';

const grid = require('../../src/Asset/grid.png')
const accountIcon = require('../../src/Asset/account.png')


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.fetchTitle = this.props.navigation.getParam('title',null)
        console.log('fetchhhh.....',this.fetchTitle);
        this.state = {
            searchText: '',
            list: true,
            isSearching: false,
            gridNotes: false,
            isVisible: false,
            reminders: false,
            signIn: false,
            notes: null,
            data: [],
            loader: true,
            ArchiveTouch : false,
            appbarTitle : this.fetchTitle,
        };
    }

    handleLoginPage = () => {
        this.setState({
            isVisible: false,
            signIn: true,
        })
        console.log(" Enter Login Page ");
        AsyncStorage.setItem('uid', "null")
        this.props.navigation.navigate('LoginPage');
    }

    navigateToCreateNotes = (noteObj) => {
        this.props.navigation.navigate('CreateNotes', { 'noteObj': noteObj })
    }

    handleGridNotes = () => {
        this.setState({
            gridNotes :! this.state.gridNotes
        })
    }

    handleIsVisibility = () => {
        this.setState({ isVisible : !this.state.isVisible })
    }

    drawerOpen = () => {
        this.props.navigation.openDrawer()
    }
    componentDidMount = () => {
        getNotes((notes) => {
            this.setState({
                notes: notes,
            })
            var data = [];
            Object.keys(notes).map((key, index) => {
                notes[key].noteId = key,
                    data.push(notes[key])
            })
            this.setState({
                data: data,
                loader: false
            }, () => {
                console.log("array data :", this.state.data);
            })
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
                    togglegridNotes = { this.handleGridNotes }
                    toggleisVisible = { this.handleIsVisibility }
                />

                <View style={{height: '83%'}} >
                    <ScrollView>
                        {
                            this.state.loader == true ?
                                <View style = { styles.loaderView }>
                                    <Spinner />
                                </View>
                                :
                                this.state.notes != null &&
                                this.state.gridNotes == false &&
                                <FlatList
                                    numColumns = {2}
                                    data = {this.state.data}
                                    renderItem = {({ item }) =>
                                        <NoteCard
                                            noteObj = {item}
                                            Title = { item.title }
                                            Data = { item.note }
                                            GridStatus = {this.state.gridNotes}
                                            navigateToCreateNotes = {this.navigateToCreateNotes}
                                        />
                                    }
                                />

                        }

                        {

                            this.state.notes != null &&
                            this.state.gridNotes == true &&
                            <FlatList
                                data = { this.state.data }
                                renderItem = {({ item }) =>
                                    <NoteCard
                                        Title = {item.title}
                                        Data = {item.note}
                                        GridStatus = {this.state.gridNotes}
                                        navigateToCreateNotes = {this.navigateToCreateNotes}
                                        noteObj = {item}
                                    />
                                }
                            />

                        }
                    </ScrollView>
                </View>

                <View>
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
                            console.log("Fab pressed...");
                            this.props.navigation.navigate('CreateNotes')
                        }}
                    >
                    </FAB>
                </View>
                <Overlay
                    isVisible = {this.state.isVisible}
                    windowBackgroundColor = " rgba(255, 255, 255, .5) "
                    overlayBackgroundColor = "white"
                    width = '80%'
                    height = '30%'
                    overlayStyle = {{ borderRadius: 15, }}
                    onBackdropPress = {() => {
                        this.setState({
                            isVisible: false
                        })
                    }}
                >
                    <View style = {styles.overlayView}>

                        <Avatar
                            size = {'medium'}
                            rounded
                            title = 'V'
                            activeOpacity = {0.7}
                        >
                        </Avatar>

                        <View style = {styles.overlayText}>
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
                        </View>

                    </View>

                    <View style = {styles.overlayButton}>
                        <Button
                            title = '  SIGN OUT  '
                            type = { this.state.signIn ? 'solid' : 'outline' }
                            onPress = { this.handleLoginPage }
                        >
                        </Button>
                    </View>

                </Overlay>
            </View>

        );
    }
}
export default Dashboard;
