import React from 'react';
import {StackNavigator} from 'react-navigation';
import GDHome from '../home/GDHome';
import GDHalfHourHot from '../home/GDHalfHourHot';
import GDSearch from '../home/GDSearch';
import GDMain from "./GDMain";
import GDLaunchPage from "./GDLaunchPage";
const GDRouter = StackNavigator({
    GDLaunchPage:{
        screen:GDLaunchPage,
        navigationOptions:{
            header:null
        }
    },
    GDMain:{
        screen:GDMain,
        navigationOptions:{
            header:null
        }
    },
    GDHome:{
        screen:GDHome,
        navigationOptions:{
            header:null
        }
    },
    GDHalfHourHot:{
        screen:GDHalfHourHot,
        navigationOptions:{
            header:null,
            gesturesEnabled:true,
        }
    },
    GDSearch:{
        screen:GDSearch,
        navigationOptions:{
            header:null,
            gesturesEnabled:true,
        }
    },
},{
    initialRouteName:'GDLaunchPage',
});
export default GDRouter;