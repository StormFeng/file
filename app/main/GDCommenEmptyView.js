import React,{Component,PropTypes} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    Platform
}from 'react-native'
const {width,height} = Dimensions.get('window');
export default class GDCommenEmptyView extends Component{
    render() {
        return (
            <View style={styles.container}>
                <Image source={{uri:'icon_empty'}} style={styles.imageStyle}/>
                <Text style={styles.textStyle}>{this.props.title}</Text>
            </View>
        );
    }
}

GDCommenEmptyView.propTypes={
    title:PropTypes.string,
};

const styles = StyleSheet.create({
    container:{
        width:width,
        height:height/3*2,
        justifyContent:'center',
        alignItems:'center',
    },
    imageStyle:{
        width:100,
        height:100,
    },
    textStyle:{
        color:'#F6533E',
        marginTop:10,
    }
});