import api from "../api";
import { ContaAPI, TransacaoAPI } from "../types";

export const getTransactions = async () => {
    try {
      const response = await api.get('transacao/get/all', {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }
      });
      console.log(response);
      return response.data
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.status === 401) {
       throw new Error(error.response)
      }
    }
  };

  export const createTransaction = async (transacao:TransacaoAPI) => {
    try {
      const response = await api.post('transacao/create',transacao, {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }
      });
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.status === 401) {
       throw new Error(error.response)
      }
    }
  };



export const getContas = async () => {
    try {
      const response = await api.get('conta/get/all', {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }
      });
      console.log(response.data);
      return response.data
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        throw new Error(error.response)
      }
    }
  };


export const getContaAtual = async () => {
    try {
      const response = await api.get('conta/get/current', {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }
      });
      console.log(response);
      return response.data
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        return {msg:error.response}
      }
    }
  };

  export const depositar = async (valor:number) => {
    try {
      const response = await api.put('conta/update/deposito',{valor:valor} , {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }
      });
      console.log(response.data);
      return response.data
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        throw new Error(error.response)
      }
    }
  };


  export const sacar = async (valor:number) => {
    try {
      const response = await api.put('conta/update/saque',{valor:valor} , {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }
      });
      console.log(response.data);
      return response.data
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        console.log(error.response);
        throw new Error(error.response)
      }
    }
  };

  export const alterarConta = async (conta: ContaAPI) => {
    try {
      const response = await api.put('conta/update', conta, {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }
      });
      console.log(response.data);
      return response.data
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        throw new Error(error.response)
      }
    }
  };


  