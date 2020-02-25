import * as React from 'react';
import { StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { View } from 'native-base';
import firebase from '../FireBase'
import { AsyncStorage } from "react-native";
import { Chip } from 'react-native-paper';
import { SearchBar, Icon} from 'react-native-elements';

export default class SearchNotes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes : null,
            dataSource : [],
            search : '',
            arrayholder : [],
        };
    }

    backToDashboard = () =>{
        this.props.navigation.navigate('Notes')
        
    }
    searchFilterFunction = text => {
        this.setState({
            value: text,
        });

        const newData = this.state.arrayholder.filter(item => {
            const itemData = `${item.title.toUpperCase()} ${item.note.toUpperCase()} `;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            dataSource : newData,
        });
    };

    componentDidMount() {
        AsyncStorage.getItem('uid', (error, result) => {
            // .orderByChild('Archive').equalTo(false)
            firebase.database().ref('/users/' + result + '/notes/')
                .on('value', (snapshot) => {
                    console.log("Data is   ",snapshot);
                    var data = snapshot.val();
                    this.setState({
                        dataSource : data,
                        listView: true,
                    }, () => {
                        var arrayholder = [];
                        this.state.dataSource !== null ?
                            Object.keys(this.state.dataSource).map(async (key) => {
                                var Key = key
                                var data = this.state.dataSource[key]
                                this.state.dataSource[key].noteId = key
                                arrayholder.push(this.state.dataSource[key])
                                await this.setState({ arrayholder: arrayholder })
                            })
                            : null
                    })
                });
        })
    }

    render() {
        return (
            <View style={{ flex: 1, width: '100%', height: "100%" }}>
                <View style = {{ flexDirection : 'row', width : '100%'}}>
                <View style = {{ width : '13%'}}>
                <Icon
                    size = { 35 }
                    name = 'keyboard-backspace'
                    color = 'black'
                    type = 'material-community'
                    onPress = { this.backToDashboard }
                    iconStyle = {{ marginTop : 15, marginLeft : 3 }} 
                />
                </View>
                <View style = {{ width : '87%'}}>
                <SearchBar
                    placeholder="Search here your notes..."
                    lightTheme
                    // round
                    onChangeText={text => this.searchFilterFunction(text)}
                    autoCorrect={false}
                    value={this.state.value}
                    
                />
                </View>
                </View>
                
                <FlatList
                    data = {Object.keys(this.state.dataSource) }
                    renderItem={({ item }) =>
                        <TouchableOpacity style={{ width: this.state.listView ? '95%' : '45%', height: this.state.listView ? 'auto' : 'auto', margin: 10 }}
                            onPress={() => this.props.navigation.navigate('EditNote', { 'inform': this.state.dataSource[item], "currentNoteId": this.state.dataSource[item].noteId })} a >
                            <View style={{ backgroundColor: this.state.dataSource[item].color, paddingTop: 10, paddingBottom: 10, width: '100%', position: "relative", borderRadius: 7, borderWidth: .3, display: 'flex', }}>
                                <View>
                                    <Text style={styles.subText}>{this.state.dataSource[item].title}</Text>
                                    <Text style={styles.subText}>{this.state.dataSource[item].note}</Text>
                                    {
                                        this.state.dataSource[item].Date !== undefined && this.state.dataSource[item].Time !== undefined ?
                                            <Chip icon="alarm" style={{ bottom: 17, width: 175, marginLeft: 6,backgroundColor:'transparent',borderWidth:.1 }}>{this.state.dataSource[item].Date}{'  '}{this.state.dataSource[item].Time}</Chip>
                                            : null
                                    }
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    subText: {
        marginLeft: 20
    },
});