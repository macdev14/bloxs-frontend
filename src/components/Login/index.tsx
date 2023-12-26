import React, { useState } from 'react';

import { Box, FormControl, FormLabel, Input, Button, Heading, Text, Flex } from '@chakra-ui/react';
import { useBank } from '../../BankContext';
import { useNavigate } from 'react-router-dom';

const Login = ({ history } : any) => {
  const navigate = useNavigate();
  const { login, error } = useBank();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e :any) => {
    e.preventDefault();
    login(username, password).then(()=>error==null && navigate('/app/dashboard'));
    
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Box borderWidth={1} px={4} py={6} width="300px" borderRadius="md" shadow="md">
        <Heading mb={4}>Login</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button colorScheme="blue" type="submit" width="full">
            Login
          </Button>
        </form>
        {error && <Text color="red.500">{error}</Text>}
        <Button mt={10} colorScheme="yellow" width="full" onClick={() => navigate('/guest/cadastro')}>
            Não tenho cadastro
          </Button>
      </Box>
    </Flex>
  );
};

export default Login;
