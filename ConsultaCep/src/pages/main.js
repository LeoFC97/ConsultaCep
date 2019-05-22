import React, {Component} from 'react';
import {View,Text,FlatList,TouchableOpacity,StyleSheet,TextInput,Alert,ActivityIndicator} from 'react-native'
import api from '../services/api'

export default class Main extends Component
{
    static navigationOptions={
        title: "Pagina Principal"
    };


    state=
    {
        contador:0,
        objFull:[],
        cepInput:""
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
                <View style={estilos.container} >
                    <Text>Cep: {this.state.objFull.cep}</Text>
                    <Text>Rua: {this.state.objFull.logradouro}</Text>
                    <Text>Bairro: {this.state.objFull.bairro}</Text>
                    <Text>Cidade: {this.state.objFull.localidade}</Text>
                    <Text>Estado: {this.state.objFull.uf}</Text>
                </View>
    
            )
        }
    }

    render()
    {
        return(
            <View style={estilos.container}>
            <Text>Consulta CEP</Text>
            <Text>Busque endereços de forma simples digitando apenas o  CEP</Text>
            <TextInput
                placeholder="12345678"
                style={estilos.inputDoCep}
                onChangeText={this.setaCep}
                value={this.state.cepInput}>
            </TextInput>
            <TouchableOpacity
                style={estilos.botaoConfirmar}
                onPress={
                    ()=>this.ValidaCep(this.state.cepInput)
                    }>
                <Text style={estilos.botaoConfirmarTexto}>
                    Confirmar
                </Text>
            </TouchableOpacity>
            {this.gerarTabelas()}
            </View>
            );
    }
}


/* CSS*/

const estilos=StyleSheet.create(
    {
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
        botaoConfirmar:
        {
            height:32,
            borderRadius:5,
            borderWidth:2,
            borderColor:"#DA552F",
            backgroundColor:"transparent",
            justifyContent: "center",
            alignItems:"center",
            marginTop:10
        },
        botaoConfirmarTexto:
        {
            fontSize:16,
            color:"#da552f",
            fontWeight:"bold"
        },
        loading:{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center'
        }
    });
