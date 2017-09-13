import React,{Component} from 'react';
import TabNavigator from 'react-native-tab-navigator';
import {
    Image,
    View,
    StatusBar
} from 'react-native';
import GDHome from "../home/GDHome";
import GDHourList from "../hourlist/GDHourList";
import TabNavigatorItem from "react-native-tab-navigator/TabNavigatorItem";
import * as Color from "../main/GDCommenColor";
import GDCommenStyle from "../main/GDCommenStyle";
export default class GDMain extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedTab : 'tab1',
        }
    }

    renderItemTab(selectedTab,title,image,selectedImage,target){
        return(
            <TabNavigatorItem
                selectedTitleStyle={{color:Color.orange}}
                titleStyle={{color:Color.c_99,fontSize:13}}
                selected={this.state.selectedTab === selectedTab}
                title={title}
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
                    {this.renderItemTab("tab1","首页",'icon_home_unselect','icon_home_select',<GDHome navigation={navigation}/>)}
                    {this.renderItemTab("tab2","海淘折扣",'icon_air_unselect','icon_air_select',<GDHourList navigation={navigation}/>)}
                    {this.renderItemTab("tab3","小时风云榜",'icon_clock_unselect','icon_clock_select',<GDHourList navigation={navigation}/>)}
                </TabNavigator>
            </View>
        );
    }

}


