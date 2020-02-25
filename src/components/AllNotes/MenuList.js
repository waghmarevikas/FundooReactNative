import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { List, ListItem, ListExpand } from 'material-bread';
import { Button, Paragraph, Menu, Divider, Provider } from 'react-native-paper';
import ColorPalette from 'react-native-color-palette'
import moment from 'moment';
import ImagePicker from 'react-native-image-picker';
import RBSheet from 'react-native-raw-bottom-sheet';


const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
      skipBackup: true,
      path: 'images',
  },
};


export default class MyComponent extends React.Component {
constructor(props) {
  super(props)
  this.state = {
      visible : false,
      visiblePlus : false,
      selectedColor : null,
      currentTime : '',

      filepath: {
        data: '',
        uri: ''
      },

        fileData: '',
        fileUri: ''
  };
};


  openMenu = () => this.setState({ visible: true });

  openMenuPlus = () => this.setState({ visiblePlus : true })

  handleColor = () => {
    this.setState({
      selectedColor : color
    })
  }

  closeMenu = () =>{
    this.setState({ visible : false },()=>{ 
    this.props.handleTrashNoteSubmit})
  };

  closeMenuPlus = () =>{
    this.setState({ visiblePlus : false })
  }

  AddLabelOnNotes = () =>{
    console.log( " Add labels calls... ");
    this.setState({ visible : false })
    this.props.labelsFun
    this.props.navigation.navigate('AddLabels');
    // this.props.addLabelsOnNotes
    // this.props.labelArray
  } 

  componentDidMount() {
    var date = moment()
      .utcOffset('+05:30')
      .format(' hh:mm A');
    this.setState({
      currentTime: date
    })
  }

  launchCamera = () => {
        
    ImagePicker.launchCamera(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
        } else {
            const source = { uri: response.uri };
            console.log('response', JSON.stringify(response));
            this.setState({
                filePath: response,
                fileData: response.data,
                fileUri: response.uri
            }, () => {
                this.props.handleCaptureImage(this.state.fileUri)
            });
        }
    });

}
launchImageLibrary = () => {
   
    ImagePicker.launchImageLibrary(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
        } else {
            const source = { uri: response.uri };
            console.log('response', JSON.stringify(response));
            this.setState({
                filePath: response,
                fileData: response.data,
                fileUri: response.uri
            },()=>{
                this.props.handleImage(this.state.fileUri)
            });
        }
    });
  }
  render() {
    return (
      <Provider>
        <View style = { styles.mainView }>
               <View>
                  <Icon 
                      style = {{ marginTop : 10,}} 
                      name = 'plus-box-outline' 
                      type = 'material-community'
                      onPress = { ()=>{
                          this.RBSheet.open();
                      } }
                      size = { 30 } 
                  > 
                  </Icon>
                      
                    <RBSheet
                        ref = {ref => {
                            this.RBSheet = ref;
                        }}
                        height = { 270 }
                        duration = { 250 }
                        customStyles = {{
                            container : {
                                justifyContent : 'space-around',
                                alignItems : 'flex-start'
                            }
                        }}
                    >
                    <List style = {{ width : 500 }}>
                        <ListItem
                            text = { 'Take Photo' }
                            onPress = { this.launchCamera }
                            icon = { 
                                <Icon name = { 'camera' } size = { 25 } /> 
                            }
                        />
                        
                        <ListItem
                            text = { 'Choose image' }
                            onPress = { this.launchImageLibrary }
                            icon = { 
                                <Icon name = { 'image' } size = { 25 } />
                            }
                        />

                        <ListItem
                            text = { 'Drawing' }
                            icon = {
                                <Icon name = { 'brush' } size = { 25 } type = 'material-community' />
                            }
                            onPress = { ()=>{
                              this.RBSheet.close();
                            }}
                        />

                        <ListItem
                            text = { 'Recording' }
                            icon = { 
                                <Icon name = { 'microphone' } size = { 25} />
                            }
                            onPress = { ()=>{
                              this.RBSheet.close();
                            }}
                        />

                        <ListItem
                            text = {'Tick boxes'}
                            icon = {
                                <Icon name = { 'check-box-outline' } size = {25} />
                            }
                            onPress = { ()=>{
                              this.RBSheet.close();
                            }}
                        />   
                    </List>
                </RBSheet>
                 </View>

                <View>
                    <Text style = {{ fontSize : 18}}> Edit { this.state.currentTime }</Text>
                </View>

          <Menu
                style = {{ width : '100%', marginBottom : '30%', }}
                visible = { this.state.visible }
                onDismiss =  {this.closeMenu}
                anchor = {
                    <Icon
                        onPress = {this.openMenu} 
                        style = {{ marginTop : 10,}}
                        name = 'dots-vertical'
                        type = 'material-community'  
                        size = { 30 }  
                    />      
                }
            >

            <Menu.Item 
              onPress = { this.props.handleTrashNoteSubmit }  
              title = 'delete' icon = "delete"
            />

            <Menu.Item 
              onPress = { this.closeMenu } 
              title = 'Make a copy' icon = 'image-filter-none' 
            />

            <Menu.Item 
              onPress = { this.closeMenu } 
              title = 'Send' icon = 'share-variant' 
            />

            <Menu.Item 
              onPress = { this.closeMenu } 
              title = 'Collaborator' icon = 'account-plus-outline' 
            />

            <Menu.Item 
              title = 'Labels' icon = 'label-outline' 
              onPress = {()=>{ this.setState({visible : false},this.AddLabelOnNotes )}   }
            />

            <ColorPalette
              title = { '' }
              onChange = { color => this.props.handleColor(color)}
              defaultColor = { '#ffff' }
              colors = {['#ffff' ,
              '#bdb76b', '#ffc0cb', '#d8bfd8', 
                '#8E44AD', '#40e0d0','#9acd32',
                ,
              ]}
            />

          </Menu>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  mainView : {
            bottom:0,
            position : 'absolute',
            flexDirection: 'row',
            width : '98%',
            justifyContent : 'space-between'
            // ,backgroundColor : 'red'
  },
})