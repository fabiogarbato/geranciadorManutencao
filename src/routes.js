import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import CadastroVeiculo from './CadastroVeiculo'
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
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default RoutesApp
