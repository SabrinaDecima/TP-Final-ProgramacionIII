import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Image } from 'react-bootstrap';
import { toast } from 'react-toastify';
import {
  BiUser,
  BiEnvelope,
  BiPhone,
  BiLock,
  BiLockOpen,
} from 'react-icons/bi'; 

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedPlanFromURL = searchParams.get('plan');

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    telNumber: '',
    password: '',
    confirmPassword: '',
    selectedPlan: selectedPlanFromURL || '', 
  });


  const [errors, setErrors] = useState({});

  
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  
  const handlePlanChange = (e) => {
    setForm({ ...form, selectedPlan: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      firstName,
      lastName,
      username,
      email,
      telNumber,
      password,
      confirmPassword,
      selectedPlan,
    } = form;

   
    if (!firstName.trim()) {
      toast.error('¡El nombre está vacío!');
      setErrors((prev) => ({ ...prev, firstName: true }));
      nameRef.current.focus();
      return;
    }
    if (!lastName.trim()) {
      toast.error('¡El apellido está vacío!');
      setErrors((prev) => ({ ...prev, lastName: true }));
      nameRef.current.focus();
      return;
    }
    if (!username.trim()) {
      toast.error('¡El nombre de usuario está vacío!');
      setErrors((prev) => ({ ...prev, username: true }));
      nameRef.current.focus();
      return;
    }
    if (!email.trim()) {
      toast.error('¡El email está vacío!');
      setErrors((prev) => ({ ...prev, email: true }));
      emailRef.current.focus();
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Formato de email inválido');
      setErrors((prev) => ({ ...prev, email: true }));
      emailRef.current.focus();
      return;
    }
    if (!telNumber.trim()) {
      toast.error('¡El número telefónico está vacío!');
      setErrors((prev) => ({ ...prev, telNumber: true }));
      nameRef.current.focus();
      return;
    }
    if (!password) {
      toast.error('¡La contraseña está vacía!');
      setErrors((prev) => ({ ...prev, password: true }));
      passwordRef.current.focus();
      return;
    }
    if (password.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres');
      setErrors((prev) => ({ ...prev, password: true }));
      passwordRef.current.focus();
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Las contraseñas no coinciden.');
      setErrors((prev) => ({ ...prev, confirmPassword: true }));
      passwordRef.current.focus();
      return;
    }

    // Enviar datos al backend
    try {
      const response = await fetch('http://localhost:3000/api/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al registrarse');
      }

      toast.success('Registro exitoso. ¡Ahora puedes iniciar sesión!');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error) {
      toast.error(error.message || 'Hubo un problema al crear la cuenta');
    }
  };

 
  const goBackHome = () => navigate('/home');

  return (
    <Container
      fluid
      className="vh-100 d-flex justify-content-center align-items-center bg-dark"
    >
    
      <Button
        variant="primary"
        onClick={goBackHome}
        className="position-absolute top-0 end-0 m-4"
        aria-label="Volver al inicio"
      >
        <BiUser size={25} />
      </Button>

      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={10} md={6} lg={4}>
          <div
            className="p-4 shadow rounded-3 border border-primary"
            style={{ backgroundColor: '#1e293b', color: 'white' }}
          >
           
            <div className="text-center mb-4">
              <Image
                src="https://via.placeholder.com/150" 
                alt="Profile Picture"
                roundedCircle
                style={{
                  width: '100px',
                  height: '100px',
                  objectFit: 'cover',
                  borderColor: 'white', 
                }}
              />
            </div>
            <h2 className="text-center mb-4">Registrarse</h2>

           
            <Form.Group controlId="selectedPlan" className="mb-3">
              <Form.Label>Seleccionar Plan:</Form.Label>
              <Form.Select
                value={form.selectedPlan}
                onChange={handlePlanChange}
                className="border rounded px-3 py-2"
              >
                <option value="">-- Selecciona un plan --</option>
                <option value="Básico">Básico ($25.000 por mes)</option>
                <option value="Premium">Premium ($50.000 por mes)</option>
                <option value="Elite">Elite ($100.000 por mes)</option>
              </Form.Select>
            </Form.Group>

            
            <Row className="mb-3">
              <Col sm={6}>
                <Form.Group controlId="firstName">
                  <Form.Control
                    type="text"
                    placeholder="Nombre"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    ref={nameRef}
                    className={`border rounded px-3 py-2 ${
                      errors.firstName ? 'border-danger' : 'border-primary'
                    }`}
                    autoComplete="given-name"
                  />
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group controlId="lastName">
                  <Form.Control
                    type="text"
                    placeholder="Apellido"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    ref={nameRef}
                    className={`border rounded px-3 py-2 ${
                      errors.lastName ? 'border-danger' : 'border-primary'
                    }`}
                    autoComplete="family-name"
                  />
                </Form.Group>
              </Col>
            </Row>

            
            <Form.Group controlId="username" className="mb-3">
              <div className="d-flex align-items-center">
                <BiUser size={20} className="me-2 text-white" />
                <Form.Control
                  type="text"
                  placeholder="Nombre de usuario"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  className={`border rounded px-3 py-2 ${
                    errors.username ? 'border-danger' : 'border-primary'
                  }`}
                  autoComplete="username"
                />
              </div>
            </Form.Group>

           
            <Form.Group controlId="email" className="mb-3">
              <div className="d-flex align-items-center">
                <BiEnvelope size={20} className="me-2 text-white" />
                <Form.Control
                  type="email"
                  placeholder="Correo electrónico"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`border rounded px-3 py-2 ${
                    errors.email ? 'border-danger' : 'border-primary'
                  }`}
                  autoComplete="email"
                />
              </div>
            </Form.Group>

           
            <Form.Group controlId="telNumber" className="mb-3">
              <div className="d-flex align-items-center">
                <BiPhone size={20} className="me-2 text-white" />
                <Form.Control
                  type="tel"
                  placeholder="Teléfono"
                  name="telNumber"
                  value={form.telNumber}
                  onChange={handleChange}
                  className={`border rounded px-3 py-2 ${
                    errors.telNumber ? 'border-danger' : 'border-primary'
                  }`}
                  autoComplete="tel"
                />
              </div>
            </Form.Group>

           
            <Form.Group controlId="password" className="mb-3">
              <div className="d-flex align-items-center">
                <BiLock size={20} className="me-2 text-white" />
                <Form.Control
                  type="password"
                  placeholder="Contraseña"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className={`border rounded px-3 py-2 ${
                    errors.password ? 'border-danger' : 'border-primary'
                  }`}
                  autoComplete="new-password"
                />
              </div>
            </Form.Group>

            
            <Form.Group controlId="confirmPassword" className="mb-3">
              <div className="d-flex align-items-center">
                <BiLockOpen size={20} className="me-2 text-white" />
                <Form.Control
                  type="password"
                  placeholder="Confirmar contraseña"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className={`border rounded px-3 py-2 ${
                    errors.confirmPassword ? 'border-danger' : 'border-primary'
                  }`}
                  autoComplete="new-password"
                />
              </div>
            </Form.Group>

 
            <Button variant="primary" type="submit" className="w-100">
              Registrarse
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;