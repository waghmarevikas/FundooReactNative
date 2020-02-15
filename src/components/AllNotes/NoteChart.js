import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { LineChart, BarChart, PieChart} from 'react-native-chart-kit';
import { getNotes, getArchiveNotes, getTrashNotes,  getReminderNotes} from '../FirebaseServices';
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
export default class NoteChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
        pinNotes : [],
        archiveNotes : [],
        unpinNotes : [],
        trashNotes : [],
        reminderNotes : [],
        notes : '',
        data : '',
        lineData : '',
    };
  }

  backDashboard = () =>{
    this.props.navigation.navigate('Notes');
  }

  componentDidMount = () =>{

    getNotes((notes) => {
        var pinNotes = [],unpinNotes=[];
        if(notes !== null){ 
            Object.keys(notes).map((key, index) => {
                notes[key].noteId = key;
                if(notes[key].pin === false && 
                    notes[key].date !== undefined && 
                    notes[key].time !== undefined &&
                    notes[key].trash === false)
                {
                    unpinNotes.push(notes[key])
                }
                if(notes[key].pin === true && notes[key].trash === false)
                {
                    pinNotes.push(notes[key])
                }
            })
            this.setState({
                pinNotes : pinNotes,
                unpinNotes : unpinNotes,
            })  
        }
    })

    getArchiveNotes((notes)=>{
        if(notes != null ) { 
          this.setState({
              notes : notes,
          })
          var archiveNotes = [];
          Object.keys(notes).map((key,index)=>{
            notes[key].noteId = key,
            archiveNotes.push(notes[key])
          })
          this.setState({
              archiveNotes : archiveNotes
          })
        }
      })

      getTrashNotes((notes)=>{
        if( notes != null ){ 
          this.setState({
              notes : notes,
          })
          var trashNotes = [];
          Object.keys(notes).map((key,index)=>{
            notes[key].noteId = key,
            trashNotes.push(notes[key])
          })
          this.setState({
              trashNotes : trashNotes
          })
        }
      })

      getReminderNotes((notes)=>{
        if(notes != null ) { 
          this.setState({
              notes : notes,
          })
          var reminderNotes = [];
          Object.keys(notes).map((key,index)=>{
            notes[key].noteId = key,
            reminderNotes.push(notes[key])
          })
          this.setState({
              reminderNotes : reminderNotes 
          })
        }
      })

  }

  render() {
     
    const data = [ 
      {
          name : "Pin Notes ",
          population : this.state.pinNotes.length,
          color : "#7fff00",
          legendFontColor : "#7F7F7F",
          legendFontSize : 15,
          count : this.state.pinNotes.length,
      },
      {
          name : "Unpin Notes ",
          population : this.state.unpinNotes.length,
          color : "#b8860b",
          legendFontColor : "#7F7F7F",
          legendFontSize : 15,
          count : this.state.unpinNotes.length,
      },
      {
          name : "Archive Notes ",
          population : this.state.archiveNotes.length,
          color : "#8b008b",
          legendFontColor : "#7F7F7F",
          legendFontSize : 15,
          count : this.state.archiveNotes.length,
      },
      {
          name : "Trash Notes ",
          population : this.state.trashNotes.length,
          color : "#556b2f",
          legendFontColor : "#7F7F7F",
          legendFontSize : 15,
          count : this.state.trashNotes.length,
      },
      {
          name : "Reminder Notes ",
          population :  this.state.reminderNotes.length,
          color : "#ffd700",
          legendFontColor : "#7F7F7F",
          legendFontSize : 15,
          count : this.state.reminderNotes.length,
      },
  ]

   this.state.data = data 

   const chartConfig = {
      backgroundGradientFrom : "#1E2923",
      backgroundGradientFromOpacity : 0,
      backgroundGradientTo : "#08130D",
      backgroundGradientToOpacity : 0.5,
      color : (opacity = 1) => `rgba(26, 255, 146, ${ opacity })`,
      strokeWidth : 3, // optional, default 3
      barPercentage : 0.5
    };

    const lineData = { 
      datasets : [
        {
          data : [
            this.state.pinNotes.length,
            this.state.unpinNotes.length,
            this.state.archiveNotes.length,
            this.state.trashNotes.length,
            this.state.reminderNotes.length,
          ]
        }
      ]
     }

     this.state.lineData = lineData
    return (
      
      <View style = { styles.mainView }>
          <View style ={{ marginLeft : 2, width : 50}}>
            <Icon
                  size = { 35 }
                  name = 'keyboard-backspace'
                  color = 'black'
                  type = 'material-community'
                  onPress = { this.backDashboard }
                  iconStyle = {{ marginTop : 6,}}
              />
          </View>

          <Text style = {{ fontSize : 20, marginLeft : 20, }}>
            Pie Chart of Notes
          </Text>

        <View>
          <PieChart
            data = { data }
            width = { 340 }
            height = { 220 }
            chartConfig = { chartConfig }
            accessor = "population"
            backgroundColor = "transparent"
            paddingLeft = "15"
            absolute
          />
        </View>

        <Text style = {{ fontSize : 20, marginLeft : 20, }} >
          Line Chart of Notes
        </Text>

        <View>
            <LineChart
                data = { lineData }
                width = { 300 }
                height = { 220 }
                chartConfig = {{
                  backgroundColor: "#e26a00",
                  backgroundGradientFrom: "#ff69b4",
                  backgroundGradientTo: "#696969",
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16
                  },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#ffa726"
                  }
                }}
                bezier
                style = {{
                  marginVertical : 8,
                  borderRadius : 16,
                  marginLeft : 10,
                }}
            />
        </View>

      </View>
     
    );
  }
}


const styles = StyleSheet.create({
    mainView : {
        display : 'flex',
        flex : 1,
        backgroundColor : '#dcdcdc',
    },
    pieView : {
      marginLeft : '2',
      width : '80%',
      height : '10%',
      backgroundColor : 'red',
    },
})
