import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Text,
  Flex,Select
} from '@chakra-ui/react';
import { useBank } from '../../BankContext';
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom';

const Registration = ({ history } :any) => {
  const navigate = useNavigate();
  const { register, error } = useBank();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nome, setNome] = useState('');
  const [cpf, setCPF] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [tipoConta, setTipoConta] = useState(1);
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      // Passwords do not match
      alert("Verifique o campo de confirmação de senha.")

      return;
    }else{
      const registrationData = {
        username,
        password,
        person: {
          nome,
          cpf,
          data_nascimento: dataNascimento,
        },
        tipo_conta:tipoConta
      };
      await register(registrationData);
    }
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Box borderWidth={1} px={4} py={6} width="400px" borderRadius="md" shadow="md">
        <Heading textAlign={'center'} mb={10} mt={10}>Crie sua Conta</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel>Usuário</FormLabel>
            <Input
              type="text"
              placeholder="Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Senha</FormLabel>
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Confirmação de Senha</FormLabel>
            <Input
              type="password"
              placeholder="Confirme sua Senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Nome</FormLabel>
            <Input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>CPF</FormLabel>
            <Input
              as={InputMask}
              mask="999.999.999-99"
              placeholder="CPF"
              value={cpf}
              onChange={(e) => setCPF(e.target.value)}
              required
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Data de Nascimento</FormLabel>
            <Input
              type="date"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
              required
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Tipo de Conta</FormLabel>
            <Select value={tipoConta} placeholder='Selecione Um Tipo de Conta' onChange={(val)=> setTipoConta(parseInt(val.target.value))}>
           <option value="1">Corrente</option>
           <option value="2">Poupança</option>
          </Select>


          </FormControl>
          <Button mt={10} colorScheme="blue" type="submit" width="full">
            Criar
          </Button>
        </form>
        {error && <Text color="red.500">{error}</Text>}
        <Button mt={10} colorScheme="yellow" width="full" onClick={() => navigate('/login')}>
            Já tenho cadastro
          </Button>
      </Box>
      

    </Flex>
  );
};

export default Registration;
