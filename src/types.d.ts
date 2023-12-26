import React from 'react';

export type PessoaType = { 
    id_pessoa: number,
    nome: String,
    cpf: String, 
    data_nascimento: String,
  }
export type userDataType = {
  username: String,
  password : String,
  person : person
  }
  
export interface ContextType {
    access_token: String | null,
    refresh_token: String | null
    error: String | null,
    conta: ContaType | null,
    login: (username: String, password: String) => Promise<void>,
    logout: ()=>void,
    isAuthenticated: ()=>boolean ,
    register: (userData: userDataType) => Promise<void>
    refresh: () => Promise<void>,
    atualizarConta: () => Promise<void>,
   
  }
  
export type authState={
    access_token: String | null,
    refresh_token: String | null
    error: String | null,
    conta: ContaType | null
  }
  
export interface AuthProviderProps {
    children: React.ReactNode;
}

export type ContaType = {
  data_criacao: String,
  flag_ativo: boolean | number,
  id_conta:number,
  id_pessoa:number,
  limite_saque_diario:number,
  pessoa: PessoaType,
  saldo: number,
  tipo_conta:number
}

export type DepositoType = {
  data_criacao: String,
  flag_ativo: boolean,
  id_conta:number,
  id_pessoa:number,
  limite_saque_diario:number,
  pessoa: PessoaType,
  saldo: number,
  tipo_conta:number
} 

export type TransacaoType = {
    conta:ContaType,
    data_transacao: String,
    id_transacao:number,
    valor: number,
}

export type TransacaoAPI = {
  valor: number
  id_conta_destino:number
}

export type ContaAPI= {
  flag_ativo: number | boolean,
  id_pessoa:number,
  limite_saque_diario:number,
  pessoa: PessoaType,
  saldo: number,
  tipo_conta:number
}
