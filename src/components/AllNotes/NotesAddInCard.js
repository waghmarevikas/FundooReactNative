import React, { Component } from 'react';
import { Card } from 'react-native-paper';
import { Text, View} from 'react-native';
import { getNotes } from '../FirebaseServices';

import styles from './NotesAddInCardStyles';

class NotesAddInCard extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

   
  render() {
      console.log("Notes object ",this.props.noteObj);
      console.log("note obj",this.props.Data);
      
    return (
      <View style = { this.props.GridStatus ? styles.gridTrueView :  styles.mainView }>
        <Card 
            style = {{ height : 'auto' }} 
            onPress = { ()=>{
                this.props.navigateToCreateNotes(this.props.noteObj) 
            }} 
            >
                <Card.Title
                    title = { this.props.Title }
                    titleStyle = {{ fontSize : 15}}
                    subtitle = { this.props.Data }
                    subtitleStyle = {{fontSize : 15}}
                />
        </Card>
      </View>
    );
  }
}

export default NotesAddInCard;
