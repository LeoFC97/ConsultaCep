import React, {Component} from 'react';
import {View,Text,FlatList,TouchableOpacity,StyleSheet,TextInput} from 'react-native'
import api from '../services/api'

export default class Main extends Component
{
    static navigationOptions={
        title: "Pagina Principal"
    };


    state=
    {
        docs:[],
        cepInput:""
    };

    ValidaCep (cepRecebido)
    {
        return
        {
            console.log("valida cep")
            console.log("Cep recebido: " +cepRecebido); 
        }
    }

    render()
    {
        return(
            <View>
            <Text>Consulta CEP</Text>
            <Text>Busque endereços de forma simples digitando apenas o  CEP</Text>
            <TextInput
                onChangeText={(cepInput)=>this.setState({cepInput})}
                value={this.state.cepInput}
                placeholder="242200-045">
            </TextInput>
            <TouchableOpacity
                style={styles.botaoConfirmar}
                onPress={this.ValidaCep}>
                <Text>
                    Confirmar
                </Text>
                
            </TouchableOpacity>
            </View>
        );
    }
}


/* CSS*/

const styles=StyleSheet.create({
        inputDoCep:
        {
            fontSize:26,
            color:"black",
            fontWeight:"bold",
            lineHeight: 10
        },
        botaoConfirmar:
        {
            fontSize:20
        }
    });
