import React, {Component} from 'react';
import {View,Text,FlatList,StyleSheet,TextInput,Alert,ActivityIndicator} from 'react-native'
import { Button } from 'react-native-elements';
import api from '../services/api'

export default class Main extends Component
{


    state=
    {
        contador:0,
        objFull:[],
        cepInput:"24220045"
    };

    incrementarContador = () =>
    {
        this.setState(prevState => ({contador:prevState.contador+1}));
    }

    

    buscarNaApi = async (cep) =>
    {
        console.log(this.state.contador);
        try{ //conexão ==true
           const retorno = await api.get(cep+"/json")
           const  objFull  = retorno.data;
           console.log(objFull);
           console.log(objFull.bairro);
           this.setState({objFull});
           this.incrementarContador();
        }
        catch(e){ //catch para caso esteja sem internet
            console.log("Erro na requisião da API");
            console.log(e);
        }
    }

    setaCep = (texto) =>
    {
        this.setState({ cepInput: texto });
    }

    ValidaCep = (cepRecebido) =>
    {
        var cep = cepRecebido.replace(/\D/g, ''); //variavel cep somente com digitos
        if(cep!=""){ //testa se  cep ta vazio
            var validacep = /^[0-9]{8}$/;//Expressão regular para validar o CEP.

            if(validacep.test(cep)){
                this.buscarNaApi(cep); //buscar dentro da api
            }
            else{ //cep nao foi encontrado
                Alert.alert(
                    'Não foi possivel concluir',
                    'Cep nao foi encontrado',
                    [
                        {text: 'Ok',onPress:()=>console.log('Botao ok foi pressionado')},
                    ],
                    {cancelable:false},
                );
            }


        }
        else{//cep em branco
            Alert.alert(
                'Não foi possivel concluir',
                'Campo do Cep está em branco',
                [
                  {text: 'Ok', onPress: () => console.log('Botao ok pressionado')},
                ],
                {cancelable: false},
              );
        }
    }

    gerarTabelas()
    {
        
        if(this.state.contador!=0)
        {
            return(  
                <View style={estilos.containerResultado} >
                    <Text style={estilos.resultadoCep}>Cep: {this.state.objFull.cep}</Text>
                    <Text style={estilos.resultadoTexto} >Rua: {this.state.objFull.logradouro}</Text>
                    <Text style={estilos.resultadoTexto} >Bairro: {this.state.objFull.bairro}</Text>
                    <Text style={estilos.resultadoTexto} >Cidade: {this.state.objFull.localidade}</Text>
                    <Text style={estilos.resultadoTexto} >Estado: {this.state.objFull.uf}</Text>
                </View>
    
            )
        }
    }

    render()
    {
        return(
            <View style={estilos.container}>
            <Text style={estilos.titulo}>Consulta CEP</Text>
            <Text style={estilos.subtitulo} >Busque endereços de forma simples digitando apenas o  CEP</Text>
            <TextInput
                placeholder="12345678"
                style={estilos.inputDoCep}
                onChangeText={this.setaCep}
                value={this.state.cepInput}>
            </TextInput>
            <Button
                title="Pesquisar"
                
                //style={estilos.botaoConfirmar}
                onPress={
                    ()=>this.ValidaCep(this.state.cepInput)
                    }>
            </Button>
            {this.gerarTabelas()}
            </View>
            );
    }
}


/* CSS*/

const estilos=StyleSheet.create(
    {
        subtitulo:
        {
            fontSize:17,
            color:"black"
        },
        titulo:
        {
            fontSize:29,
            color:"black"
        },
        resultadoCep:
        {
            fontSize:16,
            fontWeight:"bold"
        },
        resultadoTexto:
        {
            fontSize:14,
            color: "black"
        },
        containerResultado:
        {
            backgroundColor:"#FFF",
            borderWidth:1,
            borderColor:"#DDD",
            borderRadius:5,
            padding: 20,
            marginBottom:20
        },
        container:
        {
            flex:1,
            backgroundColor: "#f2f2f2"
        },
        inputDoCep:
        {
            margin:15,
            height:40,
            borderColor:"#7a42f4",
            borderWidth: 1,
        },
        botaoConfirmarTexto:
        {
            fontSize:16,
            color:"#da552f",
            fontWeight:"bold"
        }
    });
