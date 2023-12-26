import * as React from "react"
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import { BankProvider } from "./BankContext"
import Dashboard from "./components/Dashboard"
import Login from "./components/Login"
import PrivateRoute from "./components/PrivateRoute"
import Registration from "./components/Registration"
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Transacao from "./components/Transacoes"
import GuestRoute from "./components/GuestRoute"
import Deposito from "./components/Deposito"
import Saque from "./components/Saque"
import Bloquear from "./components/Bloquear"
import ActiveAccountRoute from "./components/ActiveAccount"
export const App = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <BankProvider>
        <div className="App">
          <Routes>
            <Route path='/app' element={<PrivateRoute/>}>
              <Route path="/app" element={<Dashboard/>} />
              <Route path="/app/bloquear" element={<Bloquear/>} />
              <Route path='/app' element={<ActiveAccountRoute/>}>
              <Route path="/app/transacoes" element={<Transacao/>} />
              <Route path="/app/deposito" element={<Deposito/>} />
              <Route path="/app/saque" element={<Saque/>} />
              </Route>
            </Route>
            <Route path='/guest' element={<GuestRoute/>}>
              <Route path="/guest/cadastro" element={<Registration/>} />
              <Route path="/guest/login" element={<Login/>} />    
            </Route>    
          
            <Route
              path="*"
              element={<Navigate to="/guest/login" />}
            />
            <Route
              path="/"
              element={<Navigate to="/guest/login" />}
            />

         

          </Routes>
        </div>
      </BankProvider>
    </Router>
  </ChakraProvider>
)
