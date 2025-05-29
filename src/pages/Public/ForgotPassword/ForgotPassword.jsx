import React, { useState } from 'react';
import { Form, Button, Col, Container, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { HouseDoorFill } from 'react-bootstrap-icons';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulación de solicitud al backend
      await fetch('http://localhost:3000/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      toast.success(
        'Se ha enviado un correo con instrucciones para restablecer tu contraseña.'
      );
      setLoading(false);
    } catch (err) {
      setError(
        'Hubo un error al enviar el correo. Inténtalo de nuevo más tarde.'
      );
      setLoading(false);
    }
  };

  const goBackHome = () => navigate('/home');

  return (
    <Container
      fluid
      className="vh-100 d-flex justify-content-center align-items-center bg-dark position-relative"
    >
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          zIndex: 1000,
        }}
      >
        <Button variant="primary" onClick={goBackHome}>
          <HouseDoorFill size={25} className="m-1 text-white" />
        </Button>
      </div>

      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={10} md={6} lg={4}>
          <div
            className="p-4 shadow rounded-3 border border-primary"
            style={{
              backgroundColor: '#1e293b',
              color: 'white',
            }}
          >
            <h5 className="text-center mb-4">Olvidaste tu contraseña?</h5>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Control
                  type="email"
                  placeholder="Ingresar email"
                  value={email}
                  onChange={handleChange}
                  required
                  className="bg-transparent text-white"
                />
              </Form.Group>
              <div className="d-grid">
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? 'Enviando...' : 'Enviar correo'}
                </Button>
              </div>
            </Form>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;
