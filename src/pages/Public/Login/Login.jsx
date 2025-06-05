import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router';
import PropTypes from 'prop-types';
import {
  Container,
  Button,
  Card,
  Col,
  Form,
  FormGroup,
  Row,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { HouseDoorFill } from 'react-bootstrap-icons';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const handleLoginSuccess = () => {
    onLogin();
    navigate('/gimnasio');
  };

  const fetchUser = async (email, password) => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Error al iniciar sesión');
      }

      const data = await response.json();
      localStorage.setItem('accessToken', data.accessToken);
      handleLoginSuccess();
    } catch (error) {
      toast.error(error.message || 'Error al iniciar sesión');
      console.log(error);
    }
  };

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: false,
    }));
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: false,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email.length) {
      toast.error('¡El correo electrónico está vacío!');
      emailRef.current.focus();
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: true,
      }));
      return;
    }

    if (!passwordRef.current.value.length) {
      toast.error('¡La contraseña está vacía!');
      passwordRef.current.focus();
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: true,
      }));
      return;
    }
    fetchUser(email, password);
  };

  const goBackLoginHandler = () => {
    navigate('/home');
  };

  return (
    <Container
      fluid
      className="vh-100 d-flex justify-content-center align-items-center bg-dark"
    >
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          zIndex: 1000,
        }}
      >
        <Button variant="primary" onClick={goBackLoginHandler}>
          <HouseDoorFill size={25} className="m-1" />
        </Button>
      </div>

      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={10} md={6} lg={4}>
          <Card
            className="p-4 shadow rounded-3 border-primary"
            style={{ backgroundColor: '#1e293b', color: 'white' }}
          >
            <Card.Body>
              <Row className="mb-2 text-center">
                <h5>Bienvenido FunctionFit</h5>
              </Row>
              <Form onSubmit={handleSubmit}>
                <FormGroup className="mb-4">
                  <Form.Control
                    type="email"
                    placeholder="Ingresar email"
                    onChange={handleEmailChange}
                    value={email}
                    ref={emailRef}
                    autoComplete="username"
                    className={`input-email ${
                      errors.email ? 'border-danger' : ''
                    }`}
                  />
                  {errors.email && (
                    <p className="text-danger">El campo email es obligatorio</p>
                  )}
                </FormGroup>
                <FormGroup className="mb-4">
                  <Form.Control
                    type="password"
                    placeholder="Ingresar contraseña"
                    onChange={handlePasswordChange}
                    autoComplete="current-password"
                    value={password}
                    ref={passwordRef}
                    className={`input-password ${
                      errors.password ? 'border-danger' : ''
                    }`}
                  />
                  {errors.password && (
                    <p className="text-danger">
                      El campo contraseña es obligatorio
                    </p>
                  )}
                </FormGroup>
                <div className="d-flex justify-content-center mb-3">
                  <Button
                    variant="outline-warning"
                    className="text-white"
                    type="submit"
                  >
                    Iniciar sesión
                  </Button>
                </div>
                <Row className="mt-3">
                  <Col className="text-start">
                    <Link
                      to="/recuperar"
                      className="text-decoration-underline text-start text-white"
                    >
                      Olvidaste tu contraseña?
                    </Link>
                  </Col>
                  <Col className="text-end">
                    <Link
                      to="/registro"
                      className="text-decoration-underline text-white"
                    >
                      Registrarse
                    </Link>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
