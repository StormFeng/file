import React,{Component,PropTypes} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    Dimensions,
    Platform
} from 'react-native';

const {width,height} = Dimensions.get('window');
export default class GDCommunalSiftMenu extends Component{
    constructor(props){
        super(props);
        this.state={
            dataSource:[],
        };
    }

    renderItem({item}){
        return (
            <TouchableOpacity onPress={this.props.hideModal}>
                <View style={styles.itemViewStyle}>
                    <Image source={{uri:item.image}} style={styles.itemImageStyle}/>
                    <Text>{item.title}</Text>
                </View>
            </TouchableOpacity>
        );
    }


    loadData(){
        this.setState({
            dataSource:this.props.data,
        });
    }

    componentDidMount(){
        this.loadData();
    }

    _keyExtractor(item,index){
        return index;
    }

    render(){
        return(
            <TouchableOpacity
                onPress={this.props.hideModal}
                activeOpacity={1}
                style={{flex:1}}>
                <View style={styles.container}>
                    <FlatList
                        keyExtractor={this._keyExtractor}
                        data={this.state.dataSource}
                        renderItem={this.renderItem.bind(this)}
                        numColumns={4}/>
                </View>
            </TouchableOpacity>

        );
    }
}

GDCommunalSiftMenu.propTypes= {
    hideModal:PropTypes.func,
    data:PropTypes.array,
};

const styles = StyleSheet.create({
    container:{
        marginTop:Platform.OS === 'ios' ? 64:45,
        backgroundColor:'white'
    },
    itemViewStyle:{
        width:width*0.25,
        height:70,
        alignItems:'center',
    },
    itemImageStyle:{
        width:40,
        height:40,
    }
});