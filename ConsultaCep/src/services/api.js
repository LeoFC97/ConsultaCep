import axios from "axios"

const api = axios.create({
    baseURL:"https://viacep.com.br/ws" // url base da api que sera acessada
   /* https://viacep.com.br/ws/01001000/json/ */ /*exemplo de url completa*/ 
});



export default api;