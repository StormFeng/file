import React from 'react';
import {StackNavigator} from 'react-navigation';
import GDHome from '../home/GDHome';
import GDHalfHourHot from '../home/GDHalfHourHot';
import GDSearch from '../home/GDSearch';
import GDMain from "./GDMain";
const GDRouter = StackNavigator({
    DGMain:{
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
    initialRouteName:'DGMain',
});
export default GDRouter;