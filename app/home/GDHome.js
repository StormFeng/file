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
import GDCommunalHotCell from "../main/GDCommunalHotCell";
import RealmBase from '../storage/RealmStorage';

export default class GDHome extends Component{

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
        let params = {"count":10};
        GLOBAL.HttpBase.post('https://guangdiu.com/api/getlist.php',params)
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
                let cnLastID = result.data[result.data.length-1].id;
                AsyncStorage.setItem('cnLastID',cnLastID.toString());
                let cnFirstID = result.data[0].id;
                AsyncStorage.setItem('cnFirstID',cnFirstID.toString());
                RealmBase.removeAll('HomeData');
                RealmBase.write('HomeData',result.data);
            })
            .catch((error)=>{
            console.log('eeeeeeeeeeeeeeeeeeee');
            console.log(error);
                this.data = RealmBase.loadAll('HomeData');
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(this.data),
                    loaded:true,
                });
            });
    }

    loadMore(){
        AsyncStorage.getItem('cnLastID')
            .then((value)=>{
                let params = {"count":10,"sinceid":value};
                GLOBAL.HttpBase.post('https://guangdiu.com/api/getlist.php',params)
                    .then((result)=>{
                        this.data = this.data.concat(result.data);
                        this.setState({
                            dataSource:this.state.dataSource.cloneWithRows(this.data),
                            loaded:true,
                        });
                        let cnLastID = result.data[result.data.length-1].id;
                        AsyncStorage.setItem('cnLastID',cnLastID.toString());
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
                initialListSize={8}
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
                <GDCommunalHotCell
                    image={rowData.image}
                    title={rowData.title}/>
            </TouchableOpacity>
        );
    }

    renderTitleItem(){
        return(
            <TouchableOpacity>
                <Image source={{uri:'navtitle_home_down'}} style={GDCommenStyle.navBarTitleImage}/>
            </TouchableOpacity>
        );
    }

    renderLeftItem(){
        return(
            <TouchableOpacity
                onPress={()=>{this.props.navigation.navigate('GDHalfHourHot')}}>
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
