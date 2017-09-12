import React,{Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
}from 'react-native';
import GDCommunalNavBar from "../main/GDCommunalNavBar";
import GDHalfHourHot from "./GDHalfHourHot";

export default class GDHome extends Component{

    render(){
        return(
            <View style={{flex:1,backgroundColor:'gray'}}>
                <Text>hello</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    navBarTitle:{
        fontSize:18,
        color:'white',
    },
    navBarLeftButton:{
        width:18,
        height:18,
    }
});