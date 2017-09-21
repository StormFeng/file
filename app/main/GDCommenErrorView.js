import React,{Component} from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    View,
    Dimensions,
    Text
} from 'react-native'

const {width,height} = Dimensions.get('window');
export default class GDCommenErrorView extends Component{
    render(){
        return(
            <View style={styles.loadingViewStyle}>
                <Text>
                    网络加载失败
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loadingViewStyle:{
        width:width,
        height:height/3*2,
        justifyContent:'center',
        alignItems:'center',
    }
});