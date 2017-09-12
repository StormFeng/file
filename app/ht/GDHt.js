import React,{Component} from 'react';
import GDCommunalNavBar from '../main/GDCommunalNavBar';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text
} from 'react-native';
import * as Color from "../main/GDCommenColor";
export default class GDHt extends Component{

    renderTitleItem(title){
        return(
            <TouchableOpacity>
                <Text style={styles.navBarTitle}>{title}</Text>
            </TouchableOpacity>
        );
    }

    renderLeftItem(item){
        return(
            <TouchableOpacity>
                <Text style={styles.navBarRightText}>{item}</Text>
            </TouchableOpacity
        >);
    }

    render(){
        return(
            <View style={styles.container}>
                <GDCommunalNavBar
                    titleItem={this.renderTitleItem('近半小时热门')}
                    rightItem={this.renderTitleItem('关闭')}
                    barStyle={{backgroundColor:Color.orange}}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue',
    },
    navBarTitle:{
        fontSize:18,
        color:'white',
    },
    navBarRightText:{
        fontSize:16,
        color:'#22BB11',
    }
});