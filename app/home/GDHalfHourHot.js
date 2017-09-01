import React,{Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';
import GDCommunalNavBar from "../main/GDCommunalNavBar";
export default class GDHalfHourHot extends Component{

    renderTitleItem(){
        return(
            <Text style={styles.title}>近半小时热门</Text>
        );
    }
    renderRightItem(){
        return(
            <TouchableOpacity>
                <Text style={styles.title}>关闭</Text>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <GDCommunalNavBar
                    titleItem={()=>this.renderTitleItem()}
                    rightItem={()=>this.renderRightItem()}/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    title:{
        fontSize:18,
        color:'white',
    },
    rightText:{
        fontSize:16,
        color:'white',
    }
});