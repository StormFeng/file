import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    Dimensions,
}from 'react-native';
import GDCommunalNavBar from '../main/GDCommunalNavBar';
import GDCommenStyle from '../main/GDCommenStyle';
import GDCommunalCell from '../main/GDCommunalCell';
import * as GDCommenColor from '../main/GDCommenColor';

const {width,height} = Dimensions.get('window');
export default class GDHourList extends Component{
    constructor(props){
        super(props);
        this.state={
            dataSource:[],
            isLoading:true,
            refreshing: false,
            error:false,
            prompt:''
        };
        this.nexthourhour = '';
        this.nexthourdate = '';
        this.lasthourhour = '';
        this.lasthourdate = '';
    }
    componentDidMount(){
        this._getData();
    }

    /**
     * 获取数据
     * @private
     */
    _getData(date,hour){
        let params = {};
        if(date){
            params = {
                date:date,
                hour:hour,
            }
        }
        console.log(params);
        HttpBase.get('http://guangdiu.com/api/getranklist.php',params)
            .then((result)=>{
                console.log(result);
                this.setState({
                    dataSource:result.data,
                    isLoading:false,
                    prompt:result.displaydate+result.rankhour+"点档("+result.rankduring+")",
                });
                this.nexthourhour = result.nexthourhour;
                this.nexthourdate = result.nexthourdate;
                this.lasthourhour = result.lasthourhour;
                this.lasthourdate = result.lasthourdate;
            }).catch((error)=>{
                this.setState({
                    error:true,
                });
            });
    }

    /**
     * 刷新数据
     * @private
     */
    _refreshData(){
        this.setState({
            refreshing: true,
        });
        HttpBase.get('http://guangdiu.com/api/getranklist.php')
            .then((result)=>{
            console.log("succrss");
                this.setState({
                    dataSource:result.data,
                    refreshing: false,
                });
            }).catch((error)=>{
                this.setState({
                    error:true,
                });
            });
    }

    /**
     * 渲染item
     * @param item
     * @returns {XML}
     * @private
     */
    _renderRow({item}){
        return(
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

    /**
     * 绑定主键
     * @param item
     * @param index
     * @private
     */
    _keyExtractor(item, index){
        return item.id;
    }

    /**
     * 正在加载
     * @returns {XML}
     * @private
     */
    _renderLoadingView(){
        return (
            <View style={styles.loadingViewStyle}>
                <ActivityIndicator
                    size="large"
                    color={GDCommenColor.orange}
                />
            </View>
        )
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
     * 跳转详情
     * @param id
     * @private
     */
    _jumpToDetail(id){
        this.props.navigation.navigate('GDCommenunalDetail',
            {url:'https://guangdiu.com/api/showdetail.php?id='+id});
    }

    /**
     * 渲染列表
     * @returns {XML}
     */
    _renderListView(){
        return (
            <View style={styles.container}>
                <FlatList
                    refreshing={this.state.refreshing}
                    onRefresh={this._refreshData.bind(this)}
                    onEndReachedThreshold={0.5}
                    onEndReached={()=>console.log('onEndReached')}
                    data={this.state.dataSource}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderRow.bind(this)}
                />
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

    _lastHour(){
        this._getData(this.lasthourdate,this.lasthourhour);
    }

    _nextHour(){
        this._getData(this.nexthourdate,this.nexthourhour);
    }

    render(){
        return(
            <View style={styles.container}>
                <GDCommunalNavBar
                    rightItem={this.renderRightItem.bind(this)}
                    barStyle={{backgroundColor:GDCommenColor.orange}}/>
                <View style={styles.topViewStyle}>
                    <Text style={styles.topTextStyle}>{this.state.prompt}</Text>
                </View>
                {this._renderMainView()}
                <View style={styles.botViewStyle}>
                    <TouchableOpacity onPress={()=>this._lastHour()}>
                        <Text style={styles.botTextStyle}>{"< 上1小时"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this._nextHour()}>
                        <Text style={[styles.botTextStyle,{marginLeft:30}]}>{"下1小时 >"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    /**
     * tabBar 设置
     * @returns {XML}
     */
    renderRightItem(){
        return <TouchableOpacity>
            <Text style={GDCommenStyle.navBarRightText}>设置</Text>
        </TouchableOpacity>
    }


}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:GDCommenColor.theme,
    },
    loadingViewStyle:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    topViewStyle:{
        justifyContent:'center',
        alignItems:'center',
        padding:8
    },
    topTextStyle:{
        fontSize:11,
        color:'#99999999',
    },
    botViewStyle:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        padding:8,
    },
    botTextStyle:{
        fontSize:14,
    },
});