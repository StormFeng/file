import React,{Component} from 'react';
import TabNavigator from 'react-native-tab-navigator';
import {
    Image,
    View,
    StatusBar,
    AsyncStorage
} from 'react-native';
import GDHome from "../home/GDHome";
import GDHourList from "../hourlist/GDHourList";
import GDHt from "../ht/GDHt";
import TabNavigatorItem from "react-native-tab-navigator/TabNavigatorItem";
import * as Color from "../main/GDCommenColor";
import GDCommenStyle from "../main/GDCommenStyle";
import {NavigationActions} from 'react-navigation';
import HttpBase from '../http/HttpBase';

export default class GDMain extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedTab : 'tab1',
            cnBadgeText:'',
            usBadgeText:'',
        };
    }

    componentDidMount(){
        let cnFirstID = 0;
        let usFirstID = 0;
        setInterval(()=>{
            AsyncStorage.getItem('cnFirstID')
                .then((value)=>{
                    cnFirstID = parseInt(value);
                });
            AsyncStorage.getItem('usFirstID')
                .then((value)=>{
                    usFirstID = parseInt(value);
                });
            if(cnFirstID !== 0 && usFirstID !== 0){
                let params = {
                    "cnmaxid":cnFirstID,
                    "usmaxid":usFirstID,
                };
                GLOBAL.HttpBase.get("http://guangdiu.com/api/getnewitemcount.php",params)
                    .then((result)=>{
                        this.setState({
                            cnBadgeText:result.cn,
                            usBadgeText:result.us,
                        });
                    }).catch((error)=>{

                });
            }
        },2000);
    }

    renderItemTab(selectedTab,title,image,selectedImage,target,badgeText){
        return(
            <TabNavigatorItem
                selectedTitleStyle={{color:Color.orange}}
                titleStyle={{color:Color.c_99,fontSize:13}}
                selected={this.state.selectedTab === selectedTab}
                title={title}
                badgeText={badgeText === '0' ? '' : badgeText}
                renderIcon={() => <Image style={GDCommenStyle.tabImage} source={{uri:image}} />}
                renderSelectedIcon={() => <Image style={GDCommenStyle.tabImage} source={{uri:selectedImage}}/>}
                onPress={() => this.state.selectedTab !== selectedTab ? this.setState({ selectedTab:selectedTab }):null}>
                {target}
            </TabNavigatorItem>
        );
    }

    render(){
        const {navigation} = this.props;
        return(
            <View style={GDCommenStyle.container}>
                <StatusBar
                    backgroundColor={Color.orange}/>
                <TabNavigator>
                    {this.renderItemTab("tab1","首页",'icon_home_unselect','icon_home_select',<GDHome navigation={navigation}/>,this.state.cnBadgeText)}
                    {this.renderItemTab("tab2","海淘折扣",'icon_air_unselect','icon_air_select',<GDHt navigation={navigation}/>,this.state.usBadgeText)}
                    {this.renderItemTab("tab3","小时风云榜",'icon_clock_unselect','icon_clock_select',<GDHourList navigation={navigation}/>)}
                </TabNavigator>
            </View>
        );
    }
}
const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'GDMain'})
    ]
});



