import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createDrawerNavigator} from 'react-navigation-drawer';
import Login from './src/components/login module/Login';
import CreateAccount from './src/components/login module/CreateAccount'
import ForgetPassword from './src/components/login module/ForgotPassword'
import AppNavigation from './src/Navigation/NavigationClass';
import  ValidationDemo from './src/components/login module/DemoProgram/ValidationDemo'
import Demo from './src/components/login module/DemoProgram/OuttextfieldDemo';
import Dashboard from './src/components/Dashboard';
import Home from '../fundookeep/src/components/login module/DemoProgram/Home';
import Home2 from '../fundookeep/src/components/login module/DemoProgram/Home2';
import AppDrawerNavigation from '../fundookeep/src/Navigation/DrawerNavigation';
import DragAndDropNotes from '../fundookeep/src/components/AllNotes/DragAndDropNotes'

export default class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }

  render() {
    return (
      <AppNavigation uriPrefix = "fundookeep://"/>
    );
  }
}
