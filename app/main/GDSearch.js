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
    FlatList,
    AsyncStorage,
} from 'react-native';
import GDCommunalNavBar from "./GDCommunalNavBar";
import GDCommenStyle from "./GDCommenStyle";
import GDCommunalCell from "./GDCommunalCell";
import GDCommenEmptyView from "./GDCommenEmptyView";
import GDCommenLoadingMoreView from "./GDCommenLoadingMoreView";
import * as GDCommenColor from "./GDCommenColor";

const {width,height} = Dimensions.get('window');
const dismissKeyboard = require('dismissKeyboard');

export default class GDSearch extends Component{
    constructor(props){
        super(props);
        this.state={
            isLoading:false,
            refreshing: false,
            error:false,
            dataSource:[],
            hasMoreData:false,
        };
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
                    color={GDCommenColor.orange}/>
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

    /**
     * 正在加载
     * @returns {XML}
     * @private
     */
    _renderLoadingView(){
        return (
            <View style={styles.loadingViewStyle}>
                <ActivityIndicator size="large"/>
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

    /**
     * 主键绑定
     * @param item
     * @param index
     * @private
     */
    _keyExtractor(item,index){
        return item.id;
    }

    /**
     * 跳转详情
     * @param id
     * @private
     */
    _jumpToDetail(id){
        this.props.navigation.navigate("GDCommenunalDetail",{url:'https://guangdiu.com/api/showdetail.php?id='+id});
    }

    /**
     * 渲染Item
     * @param item
     * @returns {XML}
     * @private
     */
    _renderRow({item}){
        return (
            <TouchableOpacity onPress={()=>this._jumpToDetail(item.id)}>
                <GDCommunalCell
                    pubtime={item.pubtime}
                    fromsite={item.fromsite}
                    mall={item.mall}
                    image={item.image}
                    title={item.title}/>
            </TouchableOpacity>
        );
    }

    _renderFooterView(){
        if(this.state.hasMoreData){
            return GDCommenLoadingMoreView;
        }
        return null;
    }

    /**
     * 渲染列表
     * @returns {XML}
     * @private
     */
    _renderListView() {
        return (
            <View style={styles.container}>
                <FlatList
                    ListEmptyComponent={<GDCommenEmptyView title="没有搜索到数据"/>}
                    ListFooterComponent={this._renderFooterView()}
                    onRefresh={this._refreshData.bind(this)}
                    refreshing={this.state.refreshing}
                    onEndReachedThreshold={0.5}
                    onEndReached={()=>this._loadMoreData()}
                    data={this.state.dataSource}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderRow.bind(this)}/>
            </View>
        );
    }

    /**
     * 渲染主视图
     * @returns {XML}
     * @private
     */
    _renderMainView(){
        if(this.state.isLoading && !this.state.error){
            return this._renderLoadingView();
        }else if(this.state.error){
            return this._renderErrorView();
        }
        return this._renderListView();
    }

    /**
     * 加载数据
     * @private
     */
    _loadData(){
        this.setState({
            isLoading:true,
        });
        if(this.changeText !== '') {
            let params = {
                "count": 10,
                "q": this.changeText,
            };
            HttpBase.get('http://guangdiu.com/api/getresult.php', params)
                .then((result) => {
                    console.log(result);
                    this.setState({
                        dataSource: result.data,
                        isLoading: false,
                        error: false,
                    });
                    if(result.data.length<10){
                        this.setState({hasMoreData:false});
                    }else{
                        this.setState({hasMoreData:true});
                    }
                    let searchLastID = result.data[result.data.length-1].id;
                    AsyncStorage.setItem("searchLastID",searchLastID.toString());
                }).catch((error) => {
                    this.setState({
                        error:true,
                    })
            });
        }
    }

    /**
     * 刷新
     * @private
     */
    _refreshData(){
        this.setState({
            refreshing:true,
        });
        if(this.changeText !== '') {
            let params = {
                "count": 10,
                "q": this.changeText,
            };
            HttpBase.get('http://guangdiu.com/api/getresult.php', params)
                .then((result) => {
                    this.setState({
                        dataSource: result.data,
                        refreshing: false,
                        error: false,
                    });
                    if(result.data.length<10){
                        this.setState({hasMoreData:false});
                    }else{
                        this.setState({hasMoreData:true});
                    }
                    let searchLastID = result.data[result.data.length-1].id;
                    AsyncStorage.setItem("searchLastID",searchLastID.toString());
                }).catch((error) => {
                alert(error);
                this.setState({
                    error:true,
                })
            });
        }
    }

    /**
     * 加载更多
     * @private
     */
    _loadMoreData(){
        if(this.state.hasMoreData){
            AsyncStorage.getItem('searchLastID')
                .then((value)=>{
                    if(this.changeText !== '') {
                        let params = {
                            "count": 10,
                            "q": this.changeText,
                            'sinceid':value,
                        };
                        HttpBase.get('http://guangdiu.com/api/getresult.php', params)
                            .then((result) => {
                                this.setState({
                                    dataSource: this.state.dataSource.concat(result.data),
                                    isLoading: false,
                                    error: false,
                                });
                                if(result.data.length<10){
                                    this.setState({hasMoreData:false});
                                }else{
                                    this.setState({hasMoreData:true});
                                }
                                let searchLastID = result.data[result.data.length-1].id;
                                AsyncStorage.setItem("searchLastID",searchLastID.toString());
                            }).catch((error) => {
                            alert(error);
                            this.setState({
                                error:true,
                            })
                        });
                    }
                });
        }
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
                            secureTextEntry={false}
                            placeholder="请输入搜索商品关键字"
                            placeholderTextColor="gray"
                            autoFocus={true}
                            underlineColorAndroid="transparent"
                            onChangeText={(text)=>{this.changeText=text}}
                            onEndEditing={()=>{this._loadData()}}
                            style={styles.textInputStyle}/>
                    </View>
                    <TouchableOpacity onPress={()=>dismissKeyboard()}>
                        <Text style={styles.textCancelStyle}>取消</Text>
                    </TouchableOpacity>
                </View>
                {this._renderMainView()}
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
        marginRight:5,
        backgroundColor:'#99999999',
        flexDirection:'row',
        alignItems:'center',
        borderRadius:5,
        padding:3
    },
    textInputStyle:{
        flex:1,
        padding:0,
        color:'white'
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
