import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api';
import { AuthProviderProps, ContextType, userDataType, authState } from '../types';
import { getContaAtual } from '../helpers';


const AuthContext = createContext<ContextType>({} as ContextType);

const BankProvider = ({ children } : AuthProviderProps) => {
    const [authState, setAuthState] = useState<authState>({
      access_token: localStorage.getItem('access_token') || null,
      refresh_token: localStorage.getItem('refresh_token'),
      error: null,
      conta: null
    });

    const login = async (username :String, password: String) => {
      try {
        const response = await api.post('auth/login', {
          username,
          password,
        });
        const access_token = response.data.access_token;
        const refresh_token = response.data.refresh_token;
        console.log("token: ",access_token);
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        setAuthState({ ...authState, access_token, refresh_token, error: null });
      } catch (error) {
        setAuthState({ ...authState, error: 'Falha ao realizar login, tente novamente.' });
      }
    };

    const logout = () => {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setAuthState({ ...authState, access_token: null, refresh_token: null });
    };
    

    const isAuthenticated = () => !!authState.access_token;

    const register = async (userData: userDataType) => {
      try {
        const response = await api.post('auth/cadastro', userData);
        if (response.data.access_token && response.data.refresh_token){
          const access_token = response.data.access_token;
          const refresh_token = response.data.refresh_token;
          localStorage.setItem('access_token', access_token);
          localStorage.setItem('refresh_token', refresh_token);
          setAuthState({ ...authState, access_token, refresh_token, error: null });
        }  else if (response.data.msg){
          setAuthState({ ...authState, error: response.data.msg });
        }
        } catch (error) {
        setAuthState({ ...authState, error: 'Falha ao realizar cadastro.' });
      }
    };

    const atualizarConta = async ()=>{
      getContaAtual().then((conta)=>{ setAuthState({ ...authState, conta:conta }); });
    }

    useEffect(
      ()=>{
      if(isAuthenticated()){  
        refresh();
        atualizarConta();
      }
      },[])

    const refresh = async () => {
      try {
        if (authState.refresh_token) {
          console.log('Refresh token: ',authState.refresh_token )
          const response = await api.post('auth/refresh', {}, {
            headers: { 'Authorization': 'Bearer ' + authState.refresh_token }
          });
          console.log(response.data);
          if (response.data.access_token) {
            const access_token = response.data.access_token;
    
            localStorage.setItem('access_token', access_token);
    
            setAuthState(prevState => ({
              ...prevState,
              access_token,
              error: null
            }));
          }
        }
      } catch (error) {
        console.log(error);
        setAuthState(prevState => ({
          ...prevState,
          error: 'Token refresh failed. Please try again.'
        }));
      }
    };
    
   
    
    
    

  return (
    <AuthContext.Provider
      value={{
        access_token: authState.access_token,
        refresh_token:authState.refresh_token,
        error: authState.error, 
        conta: authState.conta,
        login,
        logout,
        isAuthenticated,
        register,
        refresh,
        atualizarConta
       
      }}
    >
      {children}
    </AuthContext.Provider>
  );




}

const useBank = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useBank must be used within an AuthProvider');
  }
  return context;
};

export { BankProvider, useBank }
