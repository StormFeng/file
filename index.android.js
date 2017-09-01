/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import GDMain from "./app/main/GDMain";
import GDHome from "./app/home/GDHome";
import GDRouter from "./app/main/GDRouter";

export default class file extends Component {
    render() {
        return (
            <View style={styles.container}>
                <GDRouter/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('file', () => file);
