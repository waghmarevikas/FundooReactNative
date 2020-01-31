import { StyleSheet} from 'react-native'
export default styles = StyleSheet.create({
    mainView : {
        display : 'flex',
        flex : 1,
        backgroundColor : 'white',

    },
    iconView : {
        display : 'flex',
        height : '6%',
        flexDirection : 'row',
        marginTop : '3%',
        marginLeft : '3%',
        marginRight : '2%',

    },
    bottumIconView : {
        display : 'flex',
        flexDirection : 'row',
        bottom:10,
        height : '6%',
        width:'98%',
        position:'absolute',
        justifyContent : "space-between",
        marginLeft : '2%',
        marginRight : '10%',

    },
    backArrowView : {
        display : 'flex',
        // backgroundColor : 'blue',
        width : '10%',
        marginTop : '2%',
    },
    pinView : {
        display : 'flex',
        // backgroundColor : 'green',
        marginLeft : '50%',
        width : '10%',
        marginTop : '2%',
    },
    reminderView : {
        display : 'flex',
        // backgroundColor : 'blue',
        marginLeft : '3%',
        width : '10%',
        marginTop : '2%',
    },
    archiveView : {
        display : 'flex',
        // backgroundColor : 'white',
        marginLeft : '3%',
        width : '10%',
        marginTop : '2%',
    },
    plusIconView : {
        display : 'flex',
        backgroundColor : 'blue',
        width : '10%',
        marginTop : '3%',
    },
    moreIconView : {
        display : 'flex',
        backgroundColor : 'red',
        marginLeft : '80%',
        width : '10%',
        marginTop : '3%',
    },
    textInputView : {
        display : 'flex',
        flexDirection : 'column',
        // backgroundColor : 'white',
        marginTop : '2%',
        marginLeft : '3%',
        marginRight : '2%',
        height : '20%'
    },
})