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
    navBarTitle:{
        fontSize:18,
        color:'white',
        textAlign:'center'
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
        color:'#22BB11',
        textAlign:'right'
    },
    navBarLeftText:{
        fontSize:16,
        color:'#22BB11',
        textAlign:'left',
    }
});

export default styles;

