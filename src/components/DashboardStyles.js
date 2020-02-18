import { StyleSheet } from 'react-native';
export default styles = StyleSheet.create({
    mainView : {
        display : 'flex',
        flexDirection : 'column',
        backgroundColor : '#696969',
        flex : 1,
    },
    subView : {
        display : 'flex',
        height : 'auto',
        backgroundColor : 'blue',
        // width : 370
    },
    appbarStyle : {
            position : 'absolute',
            // left : 0,
            // right : 0,
            // bottom: -610,
            // top : 1,
            // marginTop : '1%',
            backgroundColor : 'black',
            borderRadius : null,
            borderBottomWidth : null,
        display : 'flex',
        flexDirection : 'row',
        bottom:0,
        height : 'auto',
        width:'100%',
        // position:'absolute',
        // justifyContent : "space-between",
        // marginLeft : '2%',
        // marginRight : '10%',

    },
    fabStyles : {
        position : 'absolute',
        marginLeft : 280,
        backgroundColor : '#d3d3d3',
        bottom: 30,
    },
    overlayView : {
        display : 'flex',
        flexDirection : 'column',
        height : '30%',
        // backgroundColor : '#696969',
    },
    avtarView : {
        display : 'flex',
        // marginLeft : '5%',
        alignItems : 'center'
    },
    overlayTitle : {
        display : 'flex',
        flexDirection : 'row',
        marginLeft : '35%',
        // justifyContent : 'space-around',
        width : '90%',
        height : '50%',
        marginTop : '3%',

    },
    overlaySubTitle : {
        display : 'flex',
        // backgroundColor : 'yellow',
        width : '90%',
        height : '30%',
        marginLeft : '40%',
        marginTop : '1%'
    },

    overlayText : {
        display : 'flex',
        flexDirection : 'column',
        // backgroundColor : 'yellow',
        marginTop : '2%',
        width : '70%',
        height : '80%',
    },

    overlayButton : {
        display : 'flex',
        height : 'auto',
        // width : '50%',
        alignItems : 'center',
        marginTop : '30%',
    },
    cardView : {
        display : 'flex',
        height : '83%',
        width : '96%',
        marginTop : '1%',
        marginLeft : '2%',
        // backgroundColor : 'blue',
        flexDirection : 'row',
        flexWrap : 'wrap',
    },
    gridTrueView : {
        display : 'flex',
        width : '97%',
        height : 'auto',
        marginTop : '2%',
        marginLeft : '2%',
        backgroundColor : 'red',
    },
    loaderView : {
        marginTop : '30%',
        display : 'flex',
        height : '100%',
        width : '100%',
        justifyContent:"center",
    },
    topbarView : {
        display : 'flex',
        flexDirection : 'column',
    },
   
})