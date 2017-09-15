import React,{Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    Dimensions,
    ActivityIndicator,
    FlatList
} from 'react-native';
import GDCommunalNavBar from "./GDCommunalNavBar";
import GDCommenStyle from "./GDCommenStyle";
import * as GDCommenColor from "./GDCommenColor";
const {width,height} = Dimensions.get('window');
export default class GDSearch extends Component{
    constructor(props){
        super(props);
        this.changeText='';
    }

    /**
     * 返回按钮
     * @returns {XML}
     */
    renderLeftItem(){
        return (
            <View>
                <TouchableOpacity
                    onPress={()=>this.props.navigation.goBack()}
                    style={GDCommenStyle.navBarLeft}>
                    <Image source={{uri:'icon_back_white'}} style={GDCommenStyle.navBarLeftButton}/>
                    <Text style={GDCommenStyle.navBarLeftText}>返回</Text>
                </TouchableOpacity>
            </View>
        );
    }

    /**
     * 标题
     * @returns {XML}
     */
    renderTitleItem(){
        return (
            <Text style={GDCommenStyle.navBarTitle}>搜索全网折扣</Text>
        );
    }

    /**
     * 正在加载
     * @returns {XML}
     * @private
     */
    _renderLoadingView(){
        return(
            <View style={styles.loadingViewStyle}>
                <ActivityIndicator
                    size="large"
                    color={GDCommenColor.orange}
                />
            </View>
        );
    }

    /**
     * 加载失败
     * @returns {XML}
     * @private
     */
    _renderErrorView(){
        return (
            <View style={styles.loadingViewStyle}>
                <Text>
                    网络加载失败
                </Text>
            </View>
        );
    }

    _renderListView() {
        return (
            <View style={styles.container}>
                <FlatList

                />
            </View>
        );
    }


    render(){
        return(
            <View style={styles.container}>
                <GDCommunalNavBar
                    barStyle={{backgroundColor:'#F6533E'}}
                    titleItem={()=>this.renderTitleItem()}
                    leftItem={()=>this.renderLeftItem()}/>
                <View style={styles.topViewStyle}>
                    <View style={styles.inputViewStyle}>
                        <Image source={{uri:'icon_search'}} style={styles.imageSearchView}/>
                        <TextInput
                            keyboardType="default"
                            secureTextEntry={true}
                            placeholder="请输入搜索商品关键字"
                            placeholderTextColor="gray"
                            autoFocus={true}
                            underlineColorAndroid="transparent"
                            onChangeText={(text)=>{this.changeText=text}}
                            onEndEditing
                            style={styles.textInputStyle}/>
                    </View>
                    <TouchableOpacity>
                        <Text style={styles.textCancelStyle}>取消</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    topViewStyle:{
        flexDirection:'row',
        alignItems:'center',
        width:width,
        padding:6,
    },
    inputViewStyle:{
        flex:8,
        marginRight:10,
        backgroundColor:'#99999999',
        flexDirection:'row',
        alignItems:'center',
        borderRadius:5,
        padding:3
    },
    textInputStyle:{
        flex:1,
        padding:0
    },
    imageSearchView:{
        width:25,
        height:25,
        marginRight:5,
    },
    textCancelStyle:{
        color:GDCommenColor.orange,
    },
    loadingViewStyle:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
});
