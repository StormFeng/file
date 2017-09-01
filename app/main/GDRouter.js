import React from 'react';
import {StackNavigator} from 'react-navigation';
import GDHome from '../home/GDHome';
import GDHalfHourHot from '../home/GDHalfHourHot';
const GDRouter = StackNavigator({
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
    initialRouteName:'GDHome'
});
export default GDRouter;