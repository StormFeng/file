import React,{Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ListView,
    ActivityIndicator,
    AsyncStorage,
}from 'react-native';
import GDCommunalNavBar from "../main/GDCommunalNavBar";
import * as Color from "../main/GDCommenColor";
import GDCommenStyle from "../main/GDCommenStyle";
import {PullList} from 'react-native-pull';
import GDNoData from "../main/GDNoData";
import GDCommunalCell from "../main/GDCommunalCell";


export default class GDHt extends Component{

    constructor(props){
        super(props);
        this.state={
            dataSource : new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2}),
            loaded:false,
        };
        this.data = [];
        this.loadMore = this.loadMore.bind(this);
    }

    fetchData(resolve){
        let params = {
            "count":10,
            "country":"us"
        };
        HttpBase.post('https://guangdiu.com/api/getlist.php',params)
            .then((result)=>{
                this.data = [];
                this.data = this.data.concat(result.data);
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(this.data),
                    loaded:true,
                });
                if(resolve !== undefined){
                    resolve();
                }
                let usLastID = result.data[result.data.length-1].id;
                AsyncStorage.setItem('usLastID',usLastID.toString());
                let usFirstID = result.data[0].id;
                AsyncStorage.setItem('usFirstID',usFirstID.toString());
            });
    }

    loadMore(){
        AsyncStorage.getItem('usLastID')
            .then((value)=>{
                let params = {
                    "count":10,
                    "sinceid":value,
                    "country":"us"
                };
                HttpBase.post('https://guangdiu.com/api/getlist.php',params)
                    .then((result)=>{
                        this.data = this.data.concat(result.data);
                        this.setState({
                            dataSource:this.state.dataSource.cloneWithRows(this.data),
                            loaded:true,
                        });
                        let usLastID = result.data[result.data.length-1].id;
                        AsyncStorage.setItem('usLastID',usLastID.toString());
                    });
            });
    }

    componentDidMount(){
        this.fetchData();
    }

    renderListView(){
        if(!this.state.loaded){
            return <GDNoData/>;
        }
        return (
            <PullList
                onPullRelease={(resolve)=>this.fetchData(resolve)}
                dataSource={this.state.dataSource}
                initialListSize={10}
                renderHeader={this.renderHeader}
                renderRow={this.renderRow.bind(this)}
                onEndReachedThreshold={60}
                onEndReached={this.loadMore}
                renderFooter={this.renderFooter}
            />
        );
    }

    renderFooter(){
        return (
            <View style={{height:100,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator/>
                <Text>加载更多</Text>
            </View>
        );
    }

    jumpToDetail(id){
        this.props.navigation.navigate('GDCommenunalDetail',
            {url:'https://guangdiu.com/api/showdetail.php?id='+id});
    }

    renderRow(rowData){
        return (
            <TouchableOpacity onPress={()=>this.jumpToDetail(rowData.id)}>
                <GDCommunalCell
                    pubtime={rowData.pubtime}
                    fromsite={rowData.fromsite}
                    mall={rowData.mall}
                    image={rowData.image}
                    title={rowData.title}/>
            </TouchableOpacity>
        );
    }

    renderTitleItem(){
        return(
            <TouchableOpacity>
                <Text style={GDCommenStyle.navBarTitle}>首页</Text>
            </TouchableOpacity>
        );
    }

    renderLeftItem(){
        return(
            <TouchableOpacity
                onPress={()=>{this.props.navigation.navigate('GDUSHalfHourHot')}}>
                <Image style={GDCommenStyle.navBarLeftButton} source={{uri:'icon_hot'}}/>
            </TouchableOpacity>
        );
    }

    renderRightItem(){
        return (
            <TouchableOpacity
                onPress={()=>this.props.navigation.navigate('GDSearch')}>
                <Image style={GDCommenStyle.navBarRightButton} source={{uri:'icon_search'}}/>
            </TouchableOpacity>
        );
    }

    render(){
        return(
            <View style={{flex:1,backgroundColor:Color.theme}}>
                <GDCommunalNavBar
                    titleItem={()=>this.renderTitleItem()}
                    leftItem={()=>this.renderLeftItem()}
                    rightItem={()=>this.renderRightItem()}
                    barStyle={{backgroundColor:Color.orange}}/>
                {this.renderListView()}
            </View>
        )
    }
}
