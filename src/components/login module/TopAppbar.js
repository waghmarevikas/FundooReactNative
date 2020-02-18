import React, { Component } from 'react';
import { View, Text, ScrollView, AsyncStorage, FlatList } from 'react-native';
import styles from '../DashboardStyles';
import { Badge, Appbar, BottomNavigation, Drawer, FAB, Card } from 'react-native-paper';
import { SearchBar, Avatar, Overlay, Button, Icon } from 'react-native-elements';
import { Spinner } from 'native-base';
import ProfilePic from '../AllNotes/ProfilePic';


export default class TopAppbar extends Component{
    constructor (props){
        super(props);
        this.state = {
            title1 : 'Search Notes',
            title2 : 'Reminders'
        }              
    }
    render(){
        return(
            <View style = { styles.topbarView }>
            <Appbar
                style = {{
                    backgroundColor : 'black',
                    borderWidth : 1,
                    borderRadius : 20,
                }}>

                <Appbar.Action 
                    icon = 'menu' 
                    onPress = { this.props.drawerOpen }
                    > 
                </Appbar.Action>

                <Appbar.Content
                    title = { this.props.appbarTitle }
                    style = {{
                        fountSize : 8,
                        marginRight : '1%',
                        marginLeft : '-1%',
                        // backgroundColor : 'red',
                        width : 200
                    }}
                >
                </Appbar.Content>
                {
                    this.state.title2 == this.props.appbarTitle ?
                    <Appbar.Action 
                        icon = 'magnify' 
                        onPress = { this.props.drawerOpen }
                    > 
                    </Appbar.Action> 
                    : 
                    null
                }

                    <Appbar.Action
                        style = {{ marginRight: '5%' }}
                        icon = { this.props.gridNotes ? 'view-grid' : 'view-stream' }
                        onPress = { this.props.togglegridNotes }
                    >
                    </Appbar.Action>
                

                {
                   this.state.title2 == this.props.appbarTitle ? 
                    null :
                    <ProfilePic {...this.props}/>
                }
                
            </Appbar>
            </View>
        );
    }
}