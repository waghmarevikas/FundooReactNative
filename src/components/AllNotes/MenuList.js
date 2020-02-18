import * as React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Button, Paragraph, Menu, Divider, Provider } from 'react-native-paper';
import ColorPalette from 'react-native-color-palette'

export default class MyComponent extends React.Component {
constructor(props) {
  super(props)
  this.state = {
      visible : false,
      selectedColor : null,
  };
};


  openMenu = () => this.setState({ visible: true });

  handleColor = () => {
    this.setState({
      selectedColor : color
    })
  }

  closeMenu = () =>{
    this.setState({ visible : false },()=>{ 
    this.props.handleTrashNoteSubmit})
  };

  AddLabelOnNotes = () =>{
    console.log( " Add labels calls... ");
    this.setState({ visible : false })
    this.props.labelsFun
    this.props.navigation.navigate('AddLabels');
    // this.props.addLabelsOnNotes
    // this.props.labelArray
  } 

  render() {
    return (
      <Provider>
        <View
          style={{
            bottom:0,
            position : 'absolute',
            flexDirection: 'row',
            width : '98%',
            justifyContent : 'space-between'
            // ,backgroundColor : 'red'
          }}>
               <View >
                    <Icon
                        style = {{ marginTop : 10,}}
                        name = 'plus-box-outline'
                        type = 'material-community'
                        
                        >
                    </Icon>
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