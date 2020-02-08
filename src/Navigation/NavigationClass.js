
import CreateAccount from '../components/login module/CreateAccount'
import ForgotPassword from '../components/login module/ForgotPassword';
import { createNavigationContainer, createNavigator, createAppContainer } from 'react-navigation';
import LoginPage from '../components/login module/Login';
import CreateNotes from '../components/AllNotes/CreateNotes';
import { createStackNavigator } from 'react-navigation-stack';
import Dashboard from '../components/Dashboard';
import AppDrawerNavigation from './DrawerNavigation';
import AccountInfo from '../components/login module/AccountInfo';

const NavigationStack = createStackNavigator({
    LoginPage : {screen : LoginPage ,navigationOptions : {header : null}},
    CreateAccount : {screen : CreateAccount ,navigationOptions : {header : null}},
    ForgotPassword : {screen : ForgotPassword ,navigationOptions : {header : null}},
    CreateNotes : { screen : CreateNotes , navigationOptions : {header : null}},
    Dashboard : { screen : AppDrawerNavigation , navigationOptions : { header : null }},
},{
    initialRouteName : 'Dashboard'
})

const AppNavigation = createAppContainer(NavigationStack)
export default AppNavigation