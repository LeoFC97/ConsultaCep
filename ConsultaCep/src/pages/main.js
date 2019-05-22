import React, {Component} from 'react';
import {View,Text,FlatList,TouchableOpacity,StyleSheet} from 'react-native'
import api from '../services/api'

export default class Main extends Component
{
    static navigationOptions={
        title: "Pagina Principal"
    };


    render()
    {
        return(
            <View>
            <Text>Ola Mundo</Text>
            </View>
        );
    }
}
