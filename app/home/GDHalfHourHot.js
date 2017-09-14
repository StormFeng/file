import React,{Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    ListView,
    StyleSheet,
} from 'react-native';
import GDCommenStyle from "../main/GDCommenStyle";
import GDCommunalNavBar from "../main/GDCommunalNavBar";
import GDCommunalHotCell from "../main/GDCommunalHotCell";
import HttpBase from "../http/HttpBase";
import GDNoData from "../main/GDNoData";
import * as Color from "../main/GDCommenColor";
import {PullList} from 'react-native-pull';
export default class GDHalfHourHot extends Component{

    constructor(props){
        super(props);
        this.state={
            dataSource : new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2}),
            loaded:false,
        }
    }

    fetchData(resolve){
        HttpBase.get('http://guangdiu.com/api/gethots.php')
            .then((result)=>{
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(result.data),
                    loaded:true,
                });
                if(resolve!==undefined){
                    resolve();
                }
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
                initialListSize={5}
                renderHeader={this.renderHeader}
                renderRow={this.renderRow.bind(this)}/>
        );
    }

    renderHeader(){
        return <View style={styles.topView}>
            <Text style={styles.topText}>根据每条折扣的点击进行统计，每5分钟更新一次</Text>
        </View>;
    }

    renderTitleItem(){
        return(
            <TouchableOpacity>
                <Text style={GDCommenStyle.navBarTitle}>近半小时热门</Text>
            </TouchableOpacity>
        );
    }

    renderRightItem(){
        return(
            <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                <Text style={GDCommenStyle.navBarRightText}>关闭</Text>
            </TouchableOpacity>
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

    render(){
        return(
            <View style={GDCommenStyle.container}>
                <StatusBar
                    backgroundColor={Color.orange}/>
                <GDCommunalNavBar
                    titleItem={()=>this.renderTitleItem()}
                    rightItem={()=>this.renderRightItem()}
                    barStyle={{backgroundColor:Color.orange}}/>
                {this.renderListView()}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    topView:{
        justifyContent:'center',
        alignItems:'center',
        padding:8
    },
    topText:{
        fontSize:12,
        color:'#99999999',
    }
});

