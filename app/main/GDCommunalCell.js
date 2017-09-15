import React,{Component,PropTypes} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    Dimensions
} from 'react-native';
import * as GDCommenColor from './GDCommenColor';
const {width,height} = Dimensions.get('window');
export default class GDCommunalHotCell extends Component{

    formatTime(pubtime,fromsite){
        let temp = Date.parse(new Date(pubtime.replace(/-/gi,"/")));
        let now = Date.parse(new Date());
        let reducer = now - temp;

        let minute = 60*1000;
        let hour = minute*60;
        let day = hour*24;
        let week = day*7;
        let month = day*30;

        if(reducer<0){
            return;
        }
        if(reducer/month>1){
            return parseInt(reducer/month)+"月前 • "+fromsite;
        }else if(reducer/week>1){
            return parseInt(reducer/week)+"周前 • "+fromsite;
        }else if(reducer/day>1){
            return parseInt(reducer/day)+"天前 • "+fromsite;
        }else if(reducer/hour>1){
            return parseInt(reducer/hour)+"小时前 • "+fromsite;
        }else if(reducer/minute>1){
            return parseInt(reducer/minute)+"分钟前 • "+fromsite;
        }else{
            return "刚刚"+fromsite;
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <Image source={{uri:this.props.image === ''?'icon_default':this.props.image}} style={styles.imageStyle}></Image>
                <View style={styles.centerViewStyle}>
                    <View>
                        <Text style={styles.titleStyle}>{this.props.title}</Text>
                    </View>
                    <View style={styles.detailViewStyle}>
                        <Text style={styles.mallTextStyle}>{this.props.mall}</Text>
                        <Text style={styles.timeTextStyle}>{this.formatTime(this.props.pubtime,this.props.fromsite)}</Text>
                    </View>
                </View>
                <Image source={{uri:'icon_arrow_r'}} style={styles.arrowStyle}></Image>
            </View>
        );
    }
}

GDCommunalHotCell.propTypes = {
    image:PropTypes.string,
    title:PropTypes.string,
    mall:PropTypes.string,
    pubtime:PropTypes.string,
    fromsite:PropTypes.string,
};

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:'white',
        padding:8,
        borderBottomColor:'#999999',
        borderBottomWidth:0.2,
    },
    centerViewStyle:{
        width:width*0.65,
        height:75,
        justifyContent:'space-around'
    },
    detailViewStyle:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    mallTextStyle:{
        color:GDCommenColor.orange,
        fontSize:12,
    },
    timeTextStyle:{
        color:GDCommenColor.c_99,
        fontSize:12,
    },
    titleStyle:{
        fontSize:13,
    },
    imageStyle:{
        width:70,
        height:75,
        resizeMode:'contain'
    },
    arrowStyle:{
        width:10,
        height:12,
        resizeMode:'center'
    }
});