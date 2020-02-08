import React, { Component } from 'react';
import { View, Text, ScrollView, AsyncStorage, FlatList } from 'react-native';
import styles from '../DashboardStyles';
import { Badge, Appbar, BottomNavigation, Drawer, FAB, Card } from 'react-native-paper';
import { SearchBar, Avatar, Overlay, Button } from 'react-native-elements';
import { Spinner } from 'native-base';
import NoteCard from './NotesAddInCard';
import { getReminderNotes } from '../FirebaseServices';
import TopAppbar from '../../components/login module/TopAppbar';

class Reminders extends Component {
    constructor(props) {
        super(props);
        this.state = {
          gridNotes: false,
          isVisible: false,
          notes: null,
          data : [],
          appbarTitle : 'Reminders'
        };
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
    componentDidMount = () => {
        getReminderNotes((notes)=>{
            if(notes != null ) { 
              this.setState({
                  notes : notes,
              })
              var data = [];
              console.log( " notes.....................",this.state.notes);
              Object.keys(notes).map((key,index)=>{
                notes[key].noteId = key,
                data.push(notes[key])
              })
              this.setState({
                  data : data
              })
            }
          })

    }

    render() {
        console.log( " reminder data ...",this.state.data);
        return (
            <View style = { styles.mainView }>

                <TopAppbar
                    appbarTitle = { this.state.appbarTitle }
                    gridNotes = { this.state.gridNotes }
                    isVisible = { this.state.isVisible }
                    drawerOpen = { this.drawerOpen }
                    togglegridNotes = { this.togleGridNotes }
                    toggleisVisible = { this.avtarVisibility }
                />

                <View style = {{height: '83%'}} >
                    <ScrollView>
                    {
                    this.state.notes != null &&
                    this.state.gridNotes == false &&
                    <FlatList
                        numColumns = { 2 }
                        data = { this.state.data }
                        renderItem = {({ item })=> 
                            <NoteCard 
                                noteObj = { item }
                                Title = { item.title }
                                Data = { item.note }
                                GridStatus = { this.state.gridNotes }
                                navigateToCreateNotes = { this.navigateToCreateNotes }
                                Date = { item.Date }
                            /> 
                        }
                    />
                        
                }

                {
                    this.state.notes != null &&
                        this.state.gridNotes == true &&
                        <FlatList
                            data = { this.state.data }
                            renderItem = {({ item })=> 
                                <NoteCard 
                                    Title = { item.title }
                                    Data = { item.note }
                                    GridStatus = { this.state.gridNotes }
                                    navigateToCreateNotes = { this.navigateToCreateNotes }
                                    Date = { item.Date }
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
            </View>

        );
    }
}
export default Reminders;
