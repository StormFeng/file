import React,{Component,PropTypes} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    Dimensions
} from 'react-native';
const {width,height} = Dimensions.get('window');
export default class GDCommunalHotCell extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Image source={{uri:this.props.image === ''?'icon_default':this.props.image}} style={styles.imageStyle}></Image>
                <View>
                    <Text style={styles.titleStyle}>{this.props.title}</Text>
                </View>
                <Image source={{uri:'icon_arrow_r'}} style={styles.arrowStyle}></Image>
            </View>
        );
    }
}

GDCommunalHotCell.propTypes = {
    image:PropTypes.string,
    title:PropTypes.string,
};

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:'white',
        padding:8,
        borderBottomColor:'gray',
        borderBottomWidth:0.5,
    },
    titleStyle:{
        fontSize:13,
        width:width*0.7,
    },
    imageStyle:{
        width:70,
        height:70,
        resizeMode:'contain'
    },
    arrowStyle:{
        width:10,
        height:12,
        resizeMode:'center'
    }
});