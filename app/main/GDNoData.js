import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
}from 'react-native';
export default class GDNoData extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.textStyle}>无数据</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
});