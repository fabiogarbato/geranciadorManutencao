import React, { useState, useEffect  } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Footer';
import NavBar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from './config';
import {showMessageSuccess, showMessageError} from './utils.js';
import { useAuth } from './AuthProvider';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const navigate = useNavigate();

  const { setIsAuthenticated } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ usuario, senha })
      });
  
      if (response.ok) {
        const { usuario } = await response.json();
        showMessageSuccess("Usuário Logado!");
        navigate('/Home');
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('usuario', usuario.usuario);

      } else {
          const data = await response.json(); 
          showMessageError(data.message); 
      }
    
    } catch (error) {
      console.error('Erro na solicitação:', error);
    }
  };


  useEffect(() => {
    document.body.style.overflowY = 'hidden';
    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, []);

  return (
    <Container fluid style={{ backgroundColor: '#e2e2e2'}}>
      <NavBar title="Manutenção Preventiva" />
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh"}}>
        <Card className="p-5" style={{ backgroundColor:'#2e6da0'}}> 
          <Row className="justify-content-md-center">
            <Col md={12}>
              <h1 className="text-center mb-4" style={{color:'White'}}>Login</h1>
              <Form onSubmit={handleLogin}>
                <Form.Group controlId="formUsuario" className="mb-3">
                  <Form.Label style={{ fontFamily: 'Fira Sans Condensed', fontWeight: 'bold', fontSize:'20px', color:'White' }}>Usuário</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Digite seu usuário"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formSenha" className="mb-3"> 
                  <Form.Label style={{ fontFamily: 'Fira Sans Condensed', fontWeight: 'bold', fontSize:'20px', color:'White' }}>Senha</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Digite sua senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                  />
                </Form.Group>
                <div className="d-flex justify-content-center"> 
                  <Button variant="dark" type="submit">
                    Entrar
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Card>
      </Container>
      <Footer/>
  </Container>
  );
}

export default Login;
