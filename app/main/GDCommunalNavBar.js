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
                <View>
                    {this.renderLeftItem()}
                </View>
                <View>
                    {this.renderTitleItem()}
                </View>
                <View>
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
    container:{
        width:width,
        height:Platform.OS === 'ios' ? 64:45,
        backgroundColor:'white',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderBottomWidth:0.5,
        borderBottomColor:'gray',
        paddingLeft:10,
        paddingRight:10,
    },
    title:{
        fontSize:16,
        color:'black'
    }
});