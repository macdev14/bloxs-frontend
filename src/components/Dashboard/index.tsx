import React, {useState, useEffect} from 'react';

import { Box, Button, Heading, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useBank } from '../../BankContext';
const Dashboard = () => {

  const navigate = useNavigate();
  const {logout, conta, atualizarConta, refresh} = useBank();

  useEffect(() => {
    atualizarConta();
    refresh();
}, []);


  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
    <Box borderWidth={1} px={4} py={6} width="300px" borderRadius="md" shadow="md">
      <Heading mb={4}>Operações Bancárias</Heading>
      <Heading as={"h4"} size="md" >{conta && conta.pessoa && (conta.pessoa.nome && 'Olá '+conta.pessoa.nome.charAt(0).toUpperCase()+ conta.pessoa.nome.slice(1) +',' )}</Heading>
      <Heading as={"h4"} size="md" >{conta && conta.saldo && (conta.saldo && 'Você possui um saldo de R$'+conta.saldo.toFixed(2))}</Heading>
      <Button mt={10} isDisabled={!conta?.flag_ativo} colorScheme="blue" width="full" onClick={() => navigate('/app/deposito')}>
          Depósito
        </Button>
        <Button isDisabled={!conta?.flag_ativo} mt={10} colorScheme="green" width="full" onClick={() => navigate('/app/transacoes')}>
          Transação
        </Button>
        <Button mt={10} isDisabled={!conta?.flag_ativo} colorScheme="orange" width="full" onClick={() => navigate('/app/saque')}>
          Saque
        </Button>
        <Button mt={10} colorScheme={conta?.flag_ativo ? 'orange' : 'green'}  width="full" onClick={() => navigate('/app/bloquear')}>
        {conta?.flag_ativo ? 'Bloquear' : 'Desbloquear'} 
        </Button>
        <Button mt={10} colorScheme="red" width="full" onClick={() => logout()}>
          Sair
        </Button>
    </Box>
  </Flex>
  );
};

export default Dashboard;


