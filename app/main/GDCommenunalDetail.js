import React,{Component,PropTypes} from 'react';
import {
    WebView,
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import * as Color from "../main/GDCommenColor";
import GDCommunalNavBar from "./GDCommunalNavBar";
import GDCommenStyle from "../main/GDCommenStyle";
export default class GDCommenualDetail extends Component{
    constructor(props){
        super(props);
        this.renderLeftItem = this.renderLeftItem.bind(this);
        this.renderTitleItem = this.renderTitleItem.bind(this);
        console.log(props);
    }

    renderLeftItem(){
        return(
            <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                <Text style={GDCommenStyle.navBarLeftText}>返回</Text>
            </TouchableOpacity>
        );
    }

    renderTitleItem(){
        return(
            <TouchableOpacity>
                <Text style={GDCommenStyle.navBarTitle}>商品详情</Text>
            </TouchableOpacity>
        );
    }

    render(){
        const {state} = this.props.navigation;
        return(
            <View style={styles.container}>
                <GDCommunalNavBar
                    barStyle={{backgroundColor:Color.orange}}
                    leftItem={this.renderLeftItem}
                    titleItem={this.renderTitleItem}/>
                <WebView
                    style={styles.webViewStyle}
                    source={{uri:state.params.url,method:'GET'}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    scalesPageToFit={false}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    webViewStyle:{
        flex:1,
    }
});