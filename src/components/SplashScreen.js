import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { getUid } from '../../src/components/FirebaseServices'

const off = require('../Asset/off.png')
const on = require('../Asset/on.png')

export default class SplashScreen extends Component {
    constructor (props){
        super(props);
        this.state = {
            isData : false,
            Uid : '',
        }
    }

    componentDidMount = () =>{
        getUid((id)=>{
            if(id !== "null"){
                this.setState({ Uid : id})
                console.log(" Not empty id ");
                this.setState({ isData : true })
                this.props.navigation.navigate('Dashboard')
            }
            else {
                
                console.log(" Empty id ... ");
            }
        })
        
    }
  render() { 
      console.log("hhhhh");
    return (
      <View style = {{ flex : 1, alignContent : 'center',}}>
          
          {
              this.state.isData === false ?

              <View style = {{ 
                            alignItems : 'center',
                            alignContent : 'center', 
                            width : '100%',height : '90%',
                            // backgroundColor : 'red',
                            marginTop : '60%'
                            }}>
                <Image 
                    source = { off } 
                    style = {{ width : 200, height : 200}}
                />
              </View>
                :
            <View style={{ flexDirection: 'row', alignItems : 'center', marginLeft : '20%', marginTop : '20%'}}>
                <View ><Text style={{ color: '#4285F4', fontSize: 60, fontWeight: 'bold', }}>F</Text></View>
                <View><Text style={{ color: '#DB4437',    fontSize: 60, fontWeight: 'bold' }}>u</Text></View>
                <View ><Text style={{ color: '#F4B400', fontSize: 60, fontWeight: 'bold' }}>n</Text></View>
                <View ><Text style={{ color: '#4285F4', fontSize: 60, fontWeight: 'bold' }}>D</Text></View>
                <View ><Text style={{ color: '#0F9D58', fontSize: 60, fontWeight: 'bold' }}>o</Text></View>
                <View ><Text style={{ color: '#DB4437', fontSize: 60, fontWeight: 'bold' }}>o</Text></View>
            </View>
          }
           <View style = {{ 
                alignItems : 'center',
                alignContent : 'center', 
                width : '100%',
                // backgroundColor : 'red',
                marginTop : '20%'
                }}>
                <Image 
                    source = { on }
                    style = {{ width : 200, height : 300,}}
                />
            </View>  
      </View>
    );
  }
}
