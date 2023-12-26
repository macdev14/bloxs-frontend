import React, { useState, useEffect } from 'react';
import { NumericFormat } from 'react-number-format';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td, TableCaption, TableContainer, Box, FormControl, FormLabel, Input, Button, Heading, Text, Flex, Select
} from '@chakra-ui/react';
// @ts-ignore
import {PaginationTable} from "table-pagination-chakra-ui";
import { useBank } from '../../BankContext';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { ContaType, TransacaoType } from '../../types';
import { createTransaction, getContas, getTransactions } from '../../helpers';


const Transacao = ({ history }: any) => {
  const navigate = useNavigate();
  const { conta, error, access_token, refresh, atualizarConta } = useBank();
  const [account, setAccount] = useState('');
  const [valor, setValor] = useState(0);
  const [contas, setContas] = useState<ContaType[]>([]);
  const [transactions, setTransactions] = useState<TransacaoType[]>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  
  const handleSubmit = (e: any) => {
    e.preventDefault();
    createTransaction({ id_conta_destino: parseInt(account), valor: valor }).then(res =>{  atualizarConta(); alert(res.msg)}).catch((e)=>{ console.log(e); refresh();});
    getTransactions().then(res => res && setTransactions(res)).catch(()=> refresh());
  
  };

  useEffect(() => {
      getTransactions().then(res => res && setTransactions(res)).catch(()=> refresh());
      getContas().then(res => res && setContas(res)).catch(()=> refresh());
  }, [access_token]);

  useEffect(() => {
    getTransactions().then(res => res && setTransactions(res)).catch(()=> refresh());
    getContas().then(res => res && setContas(res)).catch(()=> refresh());
    atualizarConta();
}, []);


  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      
      <Box borderWidth={1} px={4} py={6} width="500px" borderRadius="md" shadow="md">
  
      <Heading>{conta && (conta.saldo && 'R$'+conta.saldo.toFixed(2))}</Heading>
        <Heading mb={4}>Transações</Heading>
        <form onSubmit={handleSubmit}>
          
        <FormControl mb={4}>
            <FormLabel>Conta</FormLabel>
            <Select placeholder='Selecione Uma Conta' onChange={(val)=> setAccount(val.target.value)}>
              {contas.length > 0 && contas.map((conta_, key)=>{
                return (<option key={key} value={conta_.id_conta}>{conta_.pessoa.nome}</option>);
              })}
           
          
          </Select>


          </FormControl>

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
            Realizar Transação
          </Button>
        </form>
        <TableContainer mt={10}>
          <Table variant='simple'>
          
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Conta</Th>
                <Th>Valor</Th>
              </Tr>
            </Thead>
            <Tbody>

              {transactions && transactions.map((transacao, key) => (
                <Tr key={key}>
                  <Td>{transacao.id_transacao}</Td>
                  <Td>{transacao.conta.pessoa.nome}</Td>
                  <Td isNumeric>{`R$${transacao.valor}`}</Td>
                </Tr>
              )).slice(pageSize * pageIndex, pageSize * (pageIndex + 1)) }
            </Tbody>
          </Table>
          <PaginationTable
          pageSize={pageSize}
          setPageSize={setPageSize}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
          totalItemsCount={transactions.length}
          pageSizeOptions={[5, 10, 25, 50]}
        />
        </TableContainer>
       
        {error && <Text color="red.500">{error}</Text>}
    
        <Heading as="h4" size="lg"><Button mt="10" colorScheme="red" type="submit" width="80px" onClick={() => navigate('/')}>
          Voltar
        </Button></Heading>
      </Box>
    </Flex>
  );
};

export default Transacao;
