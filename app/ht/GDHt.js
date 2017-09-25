import React,{Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    ActivityIndicator,
    AsyncStorage,
}from 'react-native';
import GDCommunalNavBar from "../main/GDCommunalNavBar";
import * as Color from "../main/GDCommenColor";
import GDCommenStyle from "../main/GDCommenStyle";
import GDCommunalCell from "../main/GDCommunalCell";
import GDCommenLoadingView from "../main/GDCommenLoadingView";
import GDCommenErrorView from "../main/GDCommenErrorView";
import GDCommenEmptyView from "../main/GDCommenEmptyView";
import GDCommenLoadingMoreView from "../main/GDCommenLoadingMoreView";

export default class GDHt extends Component{
    constructor(){
        super(...arguments);
        this.state = {
            dataSource:[],
            isLoading:true,
            error:false,
            refreshing:false,
            hasMoreData:false,
        };
        this.params = {count:'10',country:'us'}
    }

    componentDidMount(){
        this._loadData(false,this.params);
    }

    /**
     * 加载数据
     * @param isRefresh
     * @param params
     * @private
     */
    _loadData(isRefresh,params){
        this.setState({refreshing:isRefresh});
        HttpBase.get('https://guangdiu.com/api/getlist.php',params)
            .then((result)=>{
                this.setState({
                    isLoading:false,
                    dataSource:result.data,
                    error:false,
                    refreshing:false,
                });
                if(result.data.length<10){
                    this.setState({hasMoreData:false});
                }else{
                    this.setState({hasMoreData:true});
                }
                let usLastID = result.data[result.data.length-1].id;
                AsyncStorage.setItem('usLastID',usLastID.toString());
                let usFirstID = result.data[0].id;
                AsyncStorage.setItem('usFirstID',usFirstID.toString());
            }).catch((error)=>{
                this.setState({error:true});
            })
    }


    _loadMoreData(){
        AsyncStorage.getItem('usLastID')
            .then((value)=>{
                let params = {"count":10,"sinceid":value,"country":"us"};
                HttpBase.get('https://guangdiu.com/api/getlist.php',params)
                    .then((result)=>{
                        this.setState({
                            isLoading:false,
                            dataSource:this.state.dataSource.concat(result.data),
                            error:false,
                            refreshing:false,
                        });
                        if(result.data.length<10){
                            this.setState({hasMoreData:false});
                        }else{
                            this.setState({hasMoreData:true});
                        }
                        let usLastID = result.data[result.data.length-1].id;
                        AsyncStorage.setItem('usLastID',usLastID.toString());
                    }).catch((error)=>{
                    this.setState({error:true});
                })
            });
    }

    _jumpToDetail(id){
        this.props.navigation.navigate('GDCommenunalDetail', {url:'https://guangdiu.com/api/showdetail.php?id='+id});
    }

    /**
     * 渲染Item
     * @param item
     * @returns {XML}
     * @private
     */
    _renderItem({item}){
        return <TouchableOpacity onPress={() => this._jumpToDetail(item.id)}>
            <GDCommunalCell
                mall={item.mall}
                title={item.title}
                image={item.image}
                pubtime={item.pubtime}
                fromsite={item.fromsite}
            />
        </TouchableOpacity>
    }

    /**
     * 绑定主键
     * @param item
     * @param index
     * @private
     */
    _keyExtractor(item,index){
        return item.id;
    }

    /**
     * 加载更多
     * @returns {*}
     * @private
     */
    _renderFooterView(){
        if(this.state.hasMoreData){
            return <GDCommenLoadingMoreView/>;
        }
        return null;
    }

    /**
     * 渲染列表
     * @private
     */
    _renderListView(){
        return <FlatList
            data={this.state.dataSource}
            renderItem={this._renderItem.bind(this)}
            keyExtractor={this._keyExtractor}
            onRefresh={()=>this._loadData(true,this.params)}
            refreshing={this.state.refreshing}
            ListEmptyComponent={<GDCommenEmptyView title="暂无数据"/>}
            ListFooterComponent={this._renderFooterView()}
            onEndReached={()=>this._loadMoreData()}
            onEndReachedThreshold={0.5}
        />
    }

    /**
     * 渲染主视图
     * @returns {*}
     * @private
     */
    _renderMainView(){
        if(this.state.isLoading && !this.state.error){
            return <GDCommenLoadingView/>
        }else if(this.state.error){
            return <GDCommenErrorView/>
        }
        return this._renderListView();
    }

    /**
     * 标题
     * @private
     */
    _renderTitleView(){
        return(
            <Text style={GDCommenStyle.navBarTitle}>海淘折扣</Text>
        );
    }

    /**
     * 标题栏左边按钮
     * @returns {XML}
     * @private
     */
    _renderLeftItem(){
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
     * @private
     */
    _renderRightItem(){
        return(
            <TouchableOpacity
                onPress={()=>{this.props.navigation.navigate('GDSearch')}}>
                <Image style={GDCommenStyle.navBarRightButton} source={{uri:'icon_search'}}/>
            </TouchableOpacity>
        );
    }

    render(){
        return(
            <View style={{flex:1,backgroundColor:Color.theme}}>
                <GDCommunalNavBar
                    titleItem={()=>this._renderTitleView()}
                    leftItem={()=>this._renderLeftItem()}
                    rightItem={()=>this._renderRightItem()}
                    barStyle={{backgroundColor:Color.orange}}/>
                {this._renderMainView()}
            </View>
        )
    }
}
