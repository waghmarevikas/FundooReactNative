import {StyleSheet} from 'react-native';
export default styles = StyleSheet.create({
    mainView : {
        display : 'flex',
        flex : 1,
        // backgroundColor : 'red',
    },
    subView : {
        display : 'flex',
        marginTop : '8%',
        // marginRight : '19%',
        marginLeft : '5%',
        width : '90%',
        height : '90%',
        // backgroundColor : 'green',
    },
    mainTitle : {
        display : 'flex',
        flexDirection : 'column',
        // backgroundColor : 'yellow',
        // justifyContent : 'center',
        alignItems : 'center',
    },
    subTitle : {
        display : 'flex',
        flexDirection : 'column',
        // backgroundColor : 'blue',
        fontSize : 20,
        alignItems : 'center',
        // justifyContent : 'center',
        marginLeft : '8%',
    },
    input : {
        display : 'flex',
        flexDirection : 'column',
        width : '90%',
        alignContent : 'center',
        justifyContent : 'center',
    },
    button : {
        display : 'flex',
        flexDirection : 'column',
        width : '90%',
        marginTop : '8%',
        // alignItems : 'center',
        justifyContent : 'center',
        alignContent : 'center',
    },
})