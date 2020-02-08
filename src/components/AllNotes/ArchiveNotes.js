import React, { Component } from 'react';
import { View, Text , ScrollView, AsyncStorage, FlatList } from 'react-native';
import styles from '../DashboardStyles';
import { Badge , Appbar, } from 'react-native-paper';
import NoteCard from './NotesAddInCard';
import { getArchiveNotes } from '../FirebaseServices';

export default class ArchiveNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
        list : true,
        isSearching : false,
        gridNotes : false,
        isVisible : false,
        reminders : false,
        signIn : false,
        notes : null,
        data : [], 
        ArchiveNotes : true,
    };
  }

  handleLoginPage = () => {
      this.setState({
          isVisible : false ,
          signIn : true,
        })
        AsyncStorage.setItem('uid',"null")
        this.props.navigation.navigate('LoginPage');
  }

  navigateToCreateNotes = (noteObj) => {
        this.props.navigation.navigate('CreateNotes', { 'noteObj': noteObj })
  }
  componentDidMount = () => {
    getArchiveNotes((notes)=>{
        if(notes != null ) { 
          this.setState({
              notes : notes,
          })
          var data = [];
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
      console.log(" Archive data",this.state.data);
    return (
      <View style = { styles.mainView }>
           
        <Appbar 
          style = {{ backgroundColor : 'black' ,
                      borderWidth : 1, 
                      borderRadius : 20,
                  }} >

                <Appbar.Action 
                  icon = 'menu' 
                  onPress = { ()=> this.props.navigation.openDrawer()} 
                  > 
                </Appbar.Action>

                <Appbar.Content 
                    title = 'Archive Notes'
                    style = {{ 
                        fountSize : 10 ,
                        marginRight : '1%'}}
                    > 
                </Appbar.Content>
                
                <Appbar.Action
                  icon = 'magnify'
                  size = { 24 }
                  onPress = { ()=>{ console.log("hiii");
                  }}
                  >
                </Appbar.Action>

                <Appbar.Action 
                    style = {{marginRight : '5%'}}
                    icon = {this.state.gridNotes ? 'view-grid' : 'view-stream' } 
                    onPress = { ()=> { 
                      this.setState({ gridNotes :!this.state.gridNotes })} }
                    >
                </Appbar.Action>

            </Appbar>
                
            <View style = { styles.cardView} >       
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
                                Date = { item.Date}
                                ArchiveNotes = { this.state.ArchiveNotes }
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

            </View>
            
        </View>

    );
    }
}

