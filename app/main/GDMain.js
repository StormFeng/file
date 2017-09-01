import React,{Component} from 'react';
import TabNavigator from 'react-native-tab-navigator';
import {
    Image,
    View,
    StyleSheet,
    Platform
} from 'react-native';
import GDHome from "../home/GDHome";
import GDHourList from "../hourlist/GDHourList";
import TabNavigatorItem from "react-native-tab-navigator/TabNavigatorItem";
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
                selectedTitleStyle={{color:'#F6533E'}}
                titleStyle={{color:'#999999',fontSize:13}}
                selected={this.state.selectedTab === selectedTab}
                title={title}
                renderIcon={() => <Image style={styles.tabImage} source={{uri:image}} />}
                renderSelectedIcon={() => <Image style={styles.tabImage} source={{uri:selectedImage}}/>}
                onPress={() => this.setState({ selectedTab:selectedTab })}>
                {target}
            </TabNavigatorItem>
        );
    }
    render(){
        return(
            <View style={styles.container}>
                <TabNavigator>
                    {this.renderItemTab("tab1","首页",'icon_home_unselect','icon_home_select',<GDHome/>)}
                    {this.renderItemTab("tab2","海淘折扣",'icon_air_unselect','icon_air_select',<GDHourList/>)}
                    {this.renderItemTab("tab3","小时风云榜",'icon_clock_unselect','icon_clock_select',<GDHourList/>)}
                </TabNavigator>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue',
        // backgroundColor: '#F5FCFF',
    },
    tabImage:{
        width:Platform.OS==='ios' ? 25 : 20,
        height:Platform.OS==='ios' ? 25 : 20,
    }
});