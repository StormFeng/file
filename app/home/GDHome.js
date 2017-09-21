import React,{Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    AsyncStorage,
    Modal,
    FlatList
}from 'react-native';
import GDCommunalNavBar from "../main/GDCommunalNavBar";
import * as Color from "../main/GDCommenColor";
import GDCommenStyle from "../main/GDCommenStyle";
import GDCommunalSiftMenu from "../main/GDCommunalSiftMenu";
import GDCommunalCell from "../main/GDCommunalCell";
import HomeData from '../data/HomeData.json';
import GDCommenLoadingView from "../main/GDCommenLoadingView";
import GDCommenErrorView from "../main/GDCommenErrorView";
import GDCommenEmptyView from "../main/GDCommenEmptyView";
import GDCommenLoadingMoreView from "../main/GDCommenLoadingMoreView";

export default class GDHome extends Component{
    constructor(props){
        super(props);
        this.state={
            dataSource:[],
            isLoading:true,
            error:false,
            refreshing:false,
            hasMoreData:false,
            modalVisible:false,
        };
        this._loadData = this._loadData.bind(this);
        this.params = {"count":10};
    }

    /**
     * 加载数据
     * @param resolve
     */
    _loadData(refresh,params){
        this.setState({refreshing:refresh});
        HttpBase.post('https://guangdiu.com/api/getlist.php',params)
            .then((result)=>{
                console.log(result);
                this.setState({
                    dataSource:result.data,
                    isLoading:false,
                    error:false,
                    refreshing:false,
                });
                if(result.data.length<10){
                    this.setState({hasMoreData:false});
                }else{
                    this.setState({hasMoreData:true});
                }
                let cnLastID = result.data[result.data.length-1].id;
                AsyncStorage.setItem('cnLastID',cnLastID.toString());
                let cnFirstID = result.data[0].id;
                AsyncStorage.setItem('cnFirstID',cnFirstID.toString());

            })
            .catch((error)=>{
                this.setState({
                    error:true,
                });
            });
    }

    /**
     * 加载更多
     */
    _loadMoreData(){
        AsyncStorage.getItem('cnLastID')
            .then((value)=>{
                let params = {"count":10,"sinceid":value};
                HttpBase.post('https://guangdiu.com/api/getlist.php',params)
                    .then((result)=>{
                        console.log(result);
                        this.setState({
                            dataSource:this.state.dataSource.concat(result.data),
                        });
                        let cnLastID = result.data[result.data.length-1].id;
                        AsyncStorage.setItem('cnLastID',cnLastID.toString());
                    });
            });
    }

    componentDidMount(){
        this._loadData(false,this.params);
    }

    /**
     * 跳转详情
     * @param id
     */
    jumpToDetail(id){
        this.props.navigation.navigate('GDCommenunalDetail',
            {url:'https://guangdiu.com/api/showdetail.php?id='+id});
    }

    /**
     * 渲染Item
     * @param rowData
     * @returns {XML}
     */
    renderRow({item}){
        return (
            <TouchableOpacity onPress={()=>this.jumpToDetail(item.id)}>
                <GDCommunalCell
                    pubtime={item.pubtime}
                    fromsite={item.fromsite}
                    mall={item.mall}
                    image={item.image}
                    title={item.title}/>
            </TouchableOpacity>
        );
    }

    /**
     * 显示/隐藏Modal
     * @param visible
     */
    setModalVisible(visible){
        this.setState({modalVisible:visible});
    }

    /**
     * 标题
     * @returns {XML}
     */
    renderTitleItem(){
        return(
            <TouchableOpacity onPress={()=>this.setModalVisible(!this.state.modalVisible)}>
                <Image source={{uri:this.state.modalVisible ? 'navtitle_home_up' : 'navtitle_home_down'}}
                       style={GDCommenStyle.navBarTitleImage}/>
            </TouchableOpacity>
        );
    }

    /**
     * 标题栏左边按钮
     * @returns {XML}
     */
    renderLeftItem(){
        return(
            <TouchableOpacity
                onPress={()=>{this.props.navigation.navigate('GDHalfHourHot')}}>
                <Image style={GDCommenStyle.navBarLeftButton} source={{uri:'icon_hot'}}/>
            </TouchableOpacity>
        );
    }

    /**
     * 标题栏右边按钮
     * @returns {XML}
     */
    renderRightItem(){
        return (
            <TouchableOpacity
                onPress={()=>this.props.navigation.navigate('GDSearch')}>
                <Image style={GDCommenStyle.navBarRightButton} source={{uri:'icon_search'}}/>
            </TouchableOpacity>
        );
    }

    /**
     * 加载分类数据
     * @param mall
     * @param cate
     */
    loadSiftData(mall,cate){
        this.setModalVisible(false);
        this.setState({isLoading:true});
        if(mall === "" && cate === ""){
            this._loadData(false,this.params);
            return;
        }
        if(mall === ""){
            this.params = {"cate":cate};
        }else{
            this.params = {"mall":mall};
        }
        this._loadData(false,this.params);
    }

    /**
     * 加载更多
     * @returns {*}
     * @private
     */
    _renderFooterView(){
        if(this.state.hasMoreData){
            return GDCommenLoadingMoreView;
        }
        return null;
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
     * 渲染列表
     * @returns {XML}
     */
    _renderListView(){
        return (
            <FlatList
                ListEmptyComponent={<GDCommenEmptyView title="暂无数据"/>}
                ListFooterComponent={this._renderFooterView()}
                onRefresh={() => this._loadData(true,this.params)}
                refreshing={this.state.refreshing}
                data={this.state.dataSource}
                keyExtractor={this._keyExtractor}
                renderItem={this.renderRow.bind(this)}
                onEndReachedThreshold={0.5}
                onEndReached={() => this._loadMoreData()}/>
        );
    }

    /**
     * 渲染主视图
     * @returns {XML}
     * @private
     */
    _renderMainView(){
        if(this.state.isLoading && !this.state.error){
            return <GDCommenLoadingView/>
        }else if(this.state.error){
            return <GDCommenErrorView/>
        }
        return this._renderListView()
    }

    render(){
        return(
            <View style={{flex:1,backgroundColor:Color.theme}}>
                <GDCommunalNavBar
                    titleItem={()=>this.renderTitleItem()}
                    leftItem={()=>this.renderLeftItem()}
                    rightItem={()=>this.renderRightItem()}
                    barStyle={{backgroundColor:Color.orange}}/>
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => this.setModalVisible(!this.state.modalVisible)}>
                    <GDCommunalSiftMenu
                        refreshData={(mall,cate) => this.loadSiftData(mall,cate)}
                        hideModal={() => this.setModalVisible(!this.state.modalVisible)}
                        data={HomeData}/>
                </Modal>
                {this._renderMainView()}
            </View>
        )
    }
}
