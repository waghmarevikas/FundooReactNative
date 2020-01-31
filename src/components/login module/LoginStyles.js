import {StyleSheet} from 'react-native';
 export default styles = StyleSheet.create({
    mainView : {
        display :'flex',
        flex : 1,
        // backgroundColor : 'yellow',
        flexDirection : 'column',
    },
    subView : {
        display : 'flex',
        flexDirection : 'column',
        width : '80%',
        // backgroundColor : 'red',
        paddingBottom: 30,
        height : '100%',
        marginLeft : '10%',
        marginTop : '6%',
    },
    email : {
        display : 'flex',
        marginTop : '10%',
        width : '80%',
        marginLeft : '10%',
        height : 'auto',
    },

    password : {
        display : 'flex',
        marginTop : '10%',
        width : '80%',
        marginLeft : '10%',
        paddingRight : '13%',
    },
    passwordView : {

       display : 'flex',
        flexDirection : 'row',
        width : '99%'
    },
    login : {
        display : 'flex',
        marginTop : '6%',
        width : '80%',
        // marginBottom : '15%',
        justifyContent : 'center',
        // backgroundColor : '#4f9deb',
        // alignItems :'flex-end',
        marginLeft : '11%',
    },
    emailPassword : {
        display : 'flex',
        flexDirection : 'column',
        flexWrap : 'wrap',
        // color :'#4f9deb',
        // marginTop : '20%',
        // backgroundColor : '#4f9deb',
    },
    loginIcon : {
        marginTop : '-10%',
        display : 'flex',
        flexDirection : 'column',
    },
    imageView : {
        display : 'flex',
        marginTop : '16%',
        marginRight : '20%',
        marginLeft : '-10%',
    },
    registration : {
        display : 'flex',
        flexDirection : 'column',
        marginTop : '5%',
        width : '80%',
        marginLeft : '11%'
    },
    title : {
        display : 'flex',
        flexDirection : 'row',
        // backgroundColor : 'green',
        marginTop : '5%',
        width : '80%',
        alignContent : 'center',
        alignItems : 'center',
        justifyContent : 'center',
        fontSize : 30
    },
    
})