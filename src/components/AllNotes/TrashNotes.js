import React, { Component } from 'react';
import { View, Text , ScrollView, AsyncStorage, FlatList } from 'react-native';
import styles from '../DashboardStyles';
import { Badge , Appbar, } from 'react-native-paper';
import NoteCard from './NotesAddInCard';
import { getArchiveNotes, getTrashNotes } from '../FirebaseServices';

export default class TrashNotes extends Component {
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
    };
  }

  navigateToCreateNotes = (noteObj) => {
        this.props.navigation.navigate('CreateNotes', { 'noteObj': noteObj })
  }
  componentDidMount = () => {
    getTrashNotes((notes)=>{
        if( notes != null ){ 
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
                    title = 'Trash Notes'
                    style = {{ 
                        fountSize : 10 ,
                        marginRight : '1%'}}
                    > 
                </Appbar.Content>

                <Appbar.Action 
                    style = {{marginRight : '5%'}}
                    icon = {this.state.gridNotes ? 'dots-vertical' : 'dots-vertical' }
                    >
                </Appbar.Action>

            </Appbar>
                
            <View style = { styles.cardView} >       
                {

                    this.state.data.length !== 0 &&
                    
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
                        /> 
                        }
                    />
                        
                }

            </View>

        </View>

    );
    }
}

