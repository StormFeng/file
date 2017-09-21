import React,{Component,PropTypes} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
}from 'react-native'

export default class GDCommenLoadingMoreView extends Component{
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator/>
                <Text>加载更多</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        height:100,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
});