import React, { useState, useEffect } from 'react';
import { NumericFormat } from 'react-number-format';
import {
 Box, FormControl, FormLabel, Input, Button, Heading, Text, Flex
} from '@chakra-ui/react';

import { useBank } from '../../BankContext';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { ContaType, TransacaoType } from '../../types';
import { alterarConta } from '../../helpers';


const Bloquear = ({ history }: any) => {
  const navigate = useNavigate();
  const { conta, error, refresh, atualizarConta } = useBank();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const contaObj = conta
    if (contaObj) {
      contaObj.flag_ativo = contaObj.flag_ativo == true ? 0 : 1;
      alterarConta(contaObj).then(res =>{ atualizarConta(); alert("Ação realizada com sucesso" )}).catch((e)=>{ console.log(e); refresh()});   
    }
  };


  useEffect(() => {
    atualizarConta();
}, []);
  
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      
      <Box borderWidth={1} px={4} py={6} width="500px" borderRadius="md" shadow="md">
      
        <Heading>{conta && 'Status: '+ (conta.flag_ativo ? 'Ativa' : 'Inativa' )}</Heading>
        <Heading size={'md'} mb={4} mt={4}> {conta?.flag_ativo ? 'Bloquear' : 'Desbloquear'} Conta</Heading>
        <form onSubmit={handleSubmit}>         
          <Button colorScheme="blue" type="submit" width="full">
            Realizar {conta?.flag_ativo ? 'Bloqueio' : 'Desbloqueio'}
          </Button>
        </form>
        {error && <Text color="red.500">{error}</Text>}
          <Heading as="h4" size="lg"><Button mt="10" colorScheme="red" type="submit" width="80px" onClick={() => navigate('/')}>
          Voltar
        </Button></Heading>
      </Box>
    </Flex>
  );
};

export default Bloquear;
