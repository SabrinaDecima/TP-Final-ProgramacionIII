import React, { useState } from 'react';
import { Form, Button, Col, Container, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

      toast.success('Se ha enviado un correo con instrucciones para restablecer tu contraseña.');
      setLoading(false);
    } catch (error) {
      setError('Hubo un error al enviar el correo. Inténtalo de nuevo más tarde.');
      setLoading(false);
    }
  };

  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={10} md={6} lg={4}>
          <div className="p-4 shadow-sm rounded-3 border-0 bg-white">
            <h2 className="text-center mb-4">Olvidaste tu contraseña?</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Ingresar email"
                  value={email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? 'Enviando...' : 'Enviar correo de restablecimiento'}
              </Button>
            </Form>
            {error && (
              <div className="alert alert-danger mt-3">{error}</div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;