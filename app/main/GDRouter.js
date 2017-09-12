import React from 'react';
import {StackNavigator} from 'react-navigation';
import GDHome from '../home/GDHome';
import GDHalfHourHot from '../home/GDHalfHourHot';
import GDMain from "./GDMain";
const GDRouter = StackNavigator({
    DGMain:{
        screen:GDMain,
        navigationOptions:{
            headerStyle:{height:0},
        }
    },
    GDHome:{
        screen:GDHome,
        navigationOptions:{
            headerStyle:{height:0},
        }
    },
    GDHalfHourHot:{
        screen:GDHalfHourHot,
        navigationOptions:{
            headerStyle:{height:0},
        }
    },
},{
    initialRouteName:'DGMain'
});
export default GDRouter;