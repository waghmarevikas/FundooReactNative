import {StyleSheet} from 'react-native';
export default StyleSheet.create({
    mainView : {
        display : 'flex',
        flexDirection : 'column',
        // backgroundColor : 'yellow',
        flex : 1,
        marginTop : '10%',
    },
    subView : {
        display : 'flex',
        flexDirection : 'column',
        width : '90%',
        // backgroundColor : 'red',
        paddingBottom : 30,
        marginLeft : '5%',
        marginRight : '8%',
    },
    nameView : {
        display : 'flex',
        flexDirection : 'column',
        width : '80%',
        marginLeft : '8%'
    },
    passwordView : {
        display : 'flex',
        flexDirection : 'column',
        width : '80%',
        // alignItems : 'center',
        // justifyContent :'space-between',
        marginLeft :'8%'
    },
    password : {
        display : 'flex',
        flexDirection : 'column',
        width : '100%'
    },
    confirm : {
        display : 'flex',
        flexDirection : 'column',
        width : '100%',
    },
    show : {
        display : 'flex',
        flexDirection : 'row',
        marginTop : '3%',
    },
    buttons : {
        display : 'flex',
        flexDirection : 'row',
        width : '100%',
        // backgroundColor:'red',
        alignItems : 'center',
        justifyContent : 'space-between',
    },
    registretion : {
        display : 'flex',
        flexDirection : 'column',
        width : '50%',
        
    },
    login : {
        display : 'flex',
        flexDirection : 'column',
        width : '30%',
    },
    heading : {
        display : 'flex',
        flexDirection : 'row',
        fontSize : 40,
        alignContent : 'center',
        marginLeft : '8%',
        // backgroundColor : 'green'
    },
    subHeading : {
        display : 'flex',
        flexDirection : 'column',
        fontSize : 20,
        alignContent : 'center',
        marginLeft : '8%',
    }
    
    
})