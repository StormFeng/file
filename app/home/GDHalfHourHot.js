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
import * as Color from "../main/GDCommenColor";
export default class GDHalfHourHot extends Component{

    constructor(props){
        super(props);
        this.state={
            dataSource : new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2}),
        }
    }

    fetchData(){
        fetch('http://guangdiu.com/api/gethots.php')
            .then((response)=>response.json())
            .then((result)=>{
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(result.data)
                })
            }).done();
    }

    componentDidMount(){
        this.fetchData();
    }

    renderTitleItem(title){
        return(
            <TouchableOpacity>
                <Text style={GDCommenStyle.navBarTitle}>{title}</Text>
            </TouchableOpacity>
        );
    }

    renderRightItem(item){
        return(
            <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                <Text style={GDCommenStyle.navBarRightText}>{item}</Text>
            </TouchableOpacity>
        );
    }

    renderRow(rowData){
        return <GDCommunalHotCell
            image={rowData.image}
            title={rowData.title}/>
    }

    render(){
        return(
            <View style={GDCommenStyle.container}>
                <StatusBar
                    backgroundColor={Color.orange}/>
                <GDCommunalNavBar
                    titleItem={()=>this.renderTitleItem('近半小时热门')}
                    rightItem={()=>this.renderRightItem('关闭')}
                    barStyle={{backgroundColor:Color.orange}}/>
                <View style={styles.topView}>
                    <Text style={styles.topText}>根据每条折扣的点击进行统计，每5分钟更新一次</Text>
                </View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}/>
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

