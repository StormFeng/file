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
    navBarRightText:{
        fontSize:16,
        color:'#22BB11',
        textAlign:'right'
    }
});

export default styles;
