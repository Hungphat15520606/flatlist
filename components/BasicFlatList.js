import React, { Component } from 'react';
import { AppRegistry , FlatList , StyleSheet, Text, View, Image, Alert } from 'react-native';
import FlatListData from '../data/FlatListData';
import Swipeout from 'react-native-swipeout';
class FlatListItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            activeRowKey:null
        };
    }
    render(){
        const swipeSettings = {
            autoClose : true,
            onClose: (secId, rowId, direction)=>{
                if(this.state.activeRowKey != null) {
                    this.setState ({activeRowKey: null});
                }
            },
            onOpen: (secId, rowId, direction)=>{
                this.setState({activeRowKey: this.props.item.key});
            },
            right: [
                {
                    onPress: () =>{
                        Alert.alert(
                            'Alert',
                            'Are you sure want to delete?',
                            [
                                {text: 'No', onPress: () => console.log('cancle pressed'), style:'cancle'},
                                {text: 'Yes', onPress:()=> {
                                        FlatListData.splice(this.props.index, 1);
                                }},
                            ],
                            {canclelable: true}
                        );

                    },
                    text :'Delete', type: 'delete'
                }
            ],
            rowId: this.props.index,
            sectionId: 1
        };
        return(
        <Swipeout {...swipeSettings}>
        <View style={{
            flex:1,
            flexDirection:"column",
        }}>
            <View style={{
                flex:1,
                flexDirection:"row",
               // backgroundColor: this.props.index % 2 == 0 ? 'mediumseagreen':'tomato'
                backgroundColor: 'mediumseagreen',
            }}>
            <Image source={{uri: this.props.item.imageUrl}}
                   style={{width:100, height:100, margin:5}}> 
            </Image>
                <View style={{
                    flex:1,
                    flexDirection:"column",
                }}>
                    <Text style={style.FlatListItem}>{this.props.item.name}</Text>
                    <Text style={style.FlatListItem}>{this.props.item.foodDescription}</Text>
                </View>
            </View>
            <View style={{
                height:1,
                backgroundColor:'white',
            }}>

            </View>
            </View>
            </Swipeout>
        );
        
    }
}

const style = StyleSheet.create({
    FlatListItem: {
        color: 'white',
        padding: 10,
        fontSize: 16,
    }
})

export default class BasicFlatList extends Component {
    render() {
        return (
            <View style={{flex:1, marginTop: 22}}>
                <FlatList
                        data={FlatListData}
                        renderItem={({item, index})=>{
                       // console.log(`Item= ${JSON.stringify(item)},index=${index}`);
                       return(
                           <FlatListItem item={item} index={index}>
                           </FlatListItem>);
                }}>
                </FlatList>
            </View>
        );
    }
}