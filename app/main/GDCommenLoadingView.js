import React,{Component} from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    View,
    Dimensions
} from 'react-native'

const {width,height} = Dimensions.get('window');
export default class GDCommenLoadingView extends Component{
    render(){
        return(
            <View style={styles.loadingViewStyle}>
                <ActivityIndicator
                    size="large"
                    color="#F6533E"/>
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