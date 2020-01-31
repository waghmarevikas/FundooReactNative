import React, { Component } from 'react';
import { View, Text, ScrollView, AsyncStorage, FlatList } from 'react-native';
import styles from '../DashboardStyles';
import { Badge, Appbar, BottomNavigation, Drawer, FAB, Card } from 'react-native-paper';
import { SearchBar, Avatar, Overlay, Button } from 'react-native-elements';
import { Spinner } from 'native-base';


export default class TopAppbar extends Component{
    constructor (props){
        super(props);
        this.state = {

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
                    // onPress = {} 
                    style = {{
                        fountSize : 10,
                        marginRight : '1%'
                    }}
                >
                </Appbar.Content>

                <Appbar.Action
                    style = {{ marginRight: '5%' }}
                    icon = { this.props.gridNotes ? 'view-grid' : 'view-stream' }
                    onPress = { this.props.togglegridNotes }
                >
                </Appbar.Action>

                <Avatar
                    size = {'small'}
                    rounded
                    title = 'V'
                    activeOpacity = {0.7}
                    onPress = { this.props.toggleisVisible }
                >
                </Avatar>

            </Appbar>
            </View>
        );
    }
}