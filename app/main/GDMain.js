import React,{Component} from 'react';
import TabNavigator from 'react-native-tab-navigator';
import {
    Image,
    View,
    TouchableOpacity,
    Text,
    StatusBar,
} from 'react-native';
import GDHome from "../home/GDHome";
import GDHourList from "../hourlist/GDHourList";
import TabNavigatorItem from "react-native-tab-navigator/TabNavigatorItem";
import GDCommunalNavBar from "../main/GDCommunalNavBar";
import * as Color from "../main/GDCommenColor";
import GDCommenStyle from "../main/GDCommenStyle";
export default class GDMain extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedTab : 'tab1',
            title:'首页',
            leftItem:<TouchableOpacity
                onPress={()=>{this.props.navigation.navigate('GDHalfHourHot')}}>
                <Image style={GDCommenStyle.navBarLeftButton} source={{uri:'icon_hot'}}/>
            </TouchableOpacity>,
            rightItem:<TouchableOpacity
                onPress={()=>{this.props.navigation.navigate('GDSearch')}}>
                <Image style={GDCommenStyle.navBarRightButton} source={{uri:'icon_search'}}/>
            </TouchableOpacity>,
        }
    }

    onTabChanged(selectedTab){
        if(this.state.selectedTab !== selectedTab){
            this.setState({ selectedTab:selectedTab });
            switch(selectedTab){
                case 'tab1':
                    this.setState({
                        title:'首页',
                        leftItem:<TouchableOpacity
                            onPress={()=>{this.props.navigation.navigate('GDHalfHourHot',{name: 'Brent'})}}>
                            <Image style={GDCommenStyle.navBarLeftButton} source={{uri:'icon_hot'}}/>
                        </TouchableOpacity>,
                        rightItem:<TouchableOpacity
                            onPress={()=>{this.props.navigation.navigate('GDSearch')}}>
                            <Image style={GDCommenStyle.navBarRightButton} source={{uri:'icon_search'}}/>
                        </TouchableOpacity>,
                    });
                    break;
                case 'tab2':
                    this.setState({
                        title:'海淘折扣',
                        leftItem:null,
                        rightItem:null,
                    });
                    break;
                case 'tab3':
                    this.setState({ title:'小时风云榜' });
                    this.setState({
                        title:'小时风云榜',
                        leftItem:null,
                        rightItem:null,
                    });
                    break;
            }
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
                onPress={() => this.onTabChanged(selectedTab)}>
                {target}
            </TabNavigatorItem>
        );
    }

    renderTitleItem(title){
        return(
            <TouchableOpacity>
                <Text style={GDCommenStyle.navBarTitle}>{title}</Text>
            </TouchableOpacity>
        );
    }

    renderLeftItem(item){
        return item;
    }

    renderRightItem(item){
        return item;
    }

    render(){
        return(
            <View style={GDCommenStyle.container}>
                <StatusBar
                    backgroundColor={Color.orange}/>
                <GDCommunalNavBar
                    titleItem={()=>this.renderTitleItem(this.state.title)}
                    leftItem={()=>this.renderLeftItem(this.state.leftItem)}
                    rightItem={()=>this.renderRightItem(this.state.rightItem)}
                    barStyle={{backgroundColor:Color.orange}}/>
                <TabNavigator>
                    {this.renderItemTab("tab1","首页",'icon_home_unselect','icon_home_select',<GDHome/>)}
                    {this.renderItemTab("tab2","海淘折扣",'icon_air_unselect','icon_air_select',<GDHourList/>)}
                    {this.renderItemTab("tab3","小时风云榜",'icon_clock_unselect','icon_clock_select',<GDHourList/>)}
                </TabNavigator>
            </View>
        );
    }

}


