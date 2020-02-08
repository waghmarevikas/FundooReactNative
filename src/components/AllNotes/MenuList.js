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


  openMenu = () => this.setState({ visible: true },()=>{
      console.log("styatye:",this.state);  
  });

  handleColor = () => {
    this.setState({
      selectedColor : color
    })
  }


  closeMenu = () =>{
    console.log("sdtate:",this.state); 
    this.setState({ visible : false },()=>{ 
    this.props.handleTrashNoteSubmit})
  };

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
              onPress = { this.closeMenu } 
              title = 'Labels' icon = 'label-outline' 
            />
            <ColorPalette
              title = { '' }
              onChange = { color => this.props.handleColor(color)}
              defaultColor = { '#ffff' }
              colors = {['#ffff' ,
               '#20b2aa', '#E74C3C', '#ffa500', 
                '#8E44AD', '#40e0d0','#008000',
              ]}
            />

          </Menu>
        </View>
      </Provider>
    );
  }
}