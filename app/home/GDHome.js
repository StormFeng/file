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

    renderTitleItem(){
        return(
            <TouchableOpacity>
                <Text style={styles.navBarTitle}>首页</Text>
            </TouchableOpacity>
        );
    }

    renderLeftItem(){
        return(
            <TouchableOpacity
                onPress={()=>{this.props.navigation.navigate('GDHalfHourHot')}}>
                <Image style={styles.navBarLeftButton} source={{uri:'icon_hot'}}/>
            </TouchableOpacity>
        );
    }

    render(){
        return(
            <View style={{flex:1,backgroundColor:'gray'}}>
                <GDCommunalNavBar
                    titleItem={()=>this.renderTitleItem()}
                    leftItem={()=>this.renderLeftItem()}
                    barStyle={{backgroundColor:'#F6533E'}}/>
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