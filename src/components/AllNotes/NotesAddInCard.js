import React, { Component } from 'react';
import { Card } from 'react-native-paper';
import { Text, View} from 'react-native';
import { getNotes } from '../FirebaseServices';
import { Chip } from 'material-bread'
import { Icon, Overlay } from 'react-native-elements'
import moment from 'moment';

import styles from './NotesAddInCardStyles';

class NotesAddInCard extends Component {
    constructor(props){
        super(props);        
        this.state = {
          chipVisible : this.props.Date === '' ? false : 
          this.props.Date !== undefined ? true : false,
          archive : this.props.ArchiveNotes,
        }
    }
     
  render() { 
    return (
      <View style = { this.props.GridStatus ? styles.gridTrueView :  styles.mainView }>
        <Card 
            onPress = { ()=>{
                this.props.navigateToCreateNotes(this.props.noteObj) 
            }} 
            >
                <Card.Title
                    title = { this.props.Title }
                    titleStyle = {{ fontSize : 15}}
                />
                <Card.Content>
                    <Text>{ this.props.Data }</Text>
                </Card.Content>
                <Card.Content>
                  <Chip
                    visible = { this.state.chipVisible }
                    text = { moment(this.props.Date).format('MMM Do YY') }
                    leftIcon = { <Icon name = 'alarm' type = 'material-community'/>}
                  /> 
                </Card.Content>
        </Card>
      </View>
    );
  }
}

export default NotesAddInCard;
