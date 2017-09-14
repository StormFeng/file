import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Dimensions
}from 'react-native';
const {width,height} = Dimensions.get('window');
import {NavigationActions} from 'react-navigation';
export default class GDLaunchPage extends Component{
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        setTimeout(()=>{
            this.props.navigation.dispatch(resetAction)
            // this.props.navigation.navigate('DGMain',{},NavigationActions.navigate({ routeName: 'GDSearch'}));
        },1000)
    }

    render(){
        return <Image
            source={{uri:'launchimage'}}
            style={styles.imageStyle}
        ></Image>
    }
}

const navigationAction = NavigationActions.navigate({
    routeName: 'GDMain',
    params: {},
    action: NavigationActions.reset({ index: 0})
});

const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'GDMain'}),
    ]
});

const styles = StyleSheet.create({
    imageStyle:{
        width:width,
        height:height,
    }
});