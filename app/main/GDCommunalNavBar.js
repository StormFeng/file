import React,{Component,PropTypes} from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Platform,
} from 'react-native';
const {width,height} = Dimensions.get('window');

export default class GDCommunalNavBar extends Component{

    renderLeftItem() {
        if (this.props.leftItem === undefined)
            return;
        return this.props.leftItem();
    }

    renderTitleItem() {
        if (this.props.titleItem === undefined)
            return;
        return this.props.titleItem();
    }

    renderRightItem() {
        if (this.props.rightItem === undefined)
            return;
        return this.props.rightItem();
    }


    render(){
        return(
            <View style={[styles.container,this.props.barStyle]}>
                <View style={styles.left}>
                    {this.renderLeftItem()}
                </View>
                <View style={styles.center}>
                    {this.renderTitleItem()}
                </View>
                <View style={styles.right}>
                    {this.renderRightItem()}
                </View>
            </View>
        );
    }
}

GDCommunalNavBar.propTypes = {
    barStyle:PropTypes.object,
    leftItem:PropTypes.func,
    titleItem:PropTypes.func,
    rightItem:PropTypes.func,
};

const styles = StyleSheet.create({
    left:{
        flex:1,
        justifyContent:'flex-start',
    },
    center:{
        flex:3,
        justifyContent:'center',
        alignItems:'center',
    },
    right:{
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-end',
    },
    container:{
        width:width,
        height:Platform.OS === 'ios' ? 64:45,
        backgroundColor:'white',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderBottomWidth:0.1,
        borderBottomColor:'gray',
        paddingLeft:10,
        paddingRight:10,
    },
    title:{
        fontSize:16,
        color:'black'
    }
});