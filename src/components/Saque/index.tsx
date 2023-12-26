import React, { useState, useEffect } from 'react';
import { NumericFormat } from 'react-number-format';
import {Box, FormControl, FormLabel, Input, Button, Heading, Text, Flex } from '@chakra-ui/react';

import { useBank } from '../../BankContext';
import { useNavigate } from 'react-router-dom';

import {sacar} from '../../helpers';


const Saque = ({ history }: any) => {
  const navigate = useNavigate();
  const { conta, error, access_token, refresh, atualizarConta } = useBank();
  const [valor, setValor] = useState(0);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    sacar(valor).then(res =>{ atualizarConta(); alert(res.msg)}).catch((e)=>{ console.log(Object.keys(e));alert(Object.keys(e)); refresh()});   
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      
      <Box borderWidth={1} px={4} py={6} width="500px" borderRadius="md" shadow="md">
  <Heading mb={4}>Saque</Heading>
  <Heading>{conta && (conta.saldo && 'R$'+conta.saldo.toFixed(2))}</Heading>
       
        <form onSubmit={handleSubmit}>
          
          <FormControl mb={4}>
            <FormLabel>Valor</FormLabel>
            <Input
              as={NumericFormat}
              required
              placeholder={" "}
              onValueChange={(values: any) => {
                const { value } = values;
                setValor(value);
              }}
              value={valor}
              thousandSeparator={true}
              prefix={"R$ "}
              decimalScale={2}
              size="lg"
            />



          </FormControl>
          <Button colorScheme="blue" type="submit" width="full">
            Realizar Saque
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

export default Saque;
