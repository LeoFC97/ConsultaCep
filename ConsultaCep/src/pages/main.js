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
            <Text>Consulta CEP</Text>
            <Text>Busque endereços de forma simples digitando apenas o  CEP</Text>
            </View>
        );
    }
}
