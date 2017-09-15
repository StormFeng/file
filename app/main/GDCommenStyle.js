import {
    StyleSheet,
    Platform,
} from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabImage:{
        width:Platform.OS==='ios' ? 25 : 20,
        height:Platform.OS==='ios' ? 25 : 20,
    },
    navBar:{
        backgroundColor:'#F6533E'
    },
    navBarTitle:{
        fontSize:18,
        color:'white',
        textAlign:'center'
    },
    navBarLeft:{
        flexDirection:'row',
        alignItems:'center',
    },
    navBarLeftButton:{
        width:18,
        height:18,
    },
    navBarRightButton:{
        width:22,
        height:22,
    },
    navBarRightText:{
        fontSize:16,
        color:'white',
        textAlign:'right'
    },
    navBarLeftText:{
        fontSize:16,
        color:'white',
        textAlign:'left',
    },
    navBarTitleImage:{
        width:66,
        height:20,
    }
});

export default styles;

