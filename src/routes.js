import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './View/Home'
import Login from './View/Login'
import CadastroVeiculo from './View/CadastroVeiculo'
import HistoricoManutencao from './View/HistoricoManutencao'
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
