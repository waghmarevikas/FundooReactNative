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
            position: 'absolute',
            left: 0,
            right: 0,
            // bottom: -610,
            // top : 1,
            marginTop : '1%',
            backgroundColor : 'black',
            borderRadius : null,
            borderBottomWidth : null,
    },
    fabStyles : {
        position : 'absolute',
        // margin: -80,
        // right: 100,
        marginTop : '-6%',
        marginLeft : 280,
        backgroundColor : '#d3d3d3',
        // bottom: 10,
    },
    overlayView : {
        display : 'flex',
        flexDirection : 'row',
        // backgroundColor : 'red',
        height : '30%',
    },
    overlayTitle : {
        display : 'flex',
        flexDirection : 'row',
        // backgroundColor : 'blue',
        marginLeft : '7%',
        width : '90%',
        height : '50%',
        // fontSize : '20%'
        marginTop : '-2%',
    },
    overlaySubTitle : {
        display : 'flex',
        // backgroundColor : 'yellow',
        width : '90%',
        height : '30%',
        marginLeft : '10%',
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
        marginTop : '20%',
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
        display : 'flex',
        height : '83%',
        width : '96%',
        justifyContent:"center",
        alignItems:'center'
    },
    topbarView : {
        display : 'flex',
        flexDirection : 'column',
    }
})