import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Login from './Telas/Login'
import CadastroVeiculo from './Telas/CadastroVeiculo'
import HistoricoManutencao from './Telas/HistoricoManutencao'
import PrivateRoute from './PrivateRoute'
import { AuthProvider } from './AuthProvider'

function RoutesApp() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/Home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/CadastroVeiculo"
            element={
              <PrivateRoute>
                <CadastroVeiculo />
              </PrivateRoute>
            }
          />
          <Route
            path="/Historico"
            element={
              <PrivateRoute>
                <HistoricoManutencao />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default RoutesApp
