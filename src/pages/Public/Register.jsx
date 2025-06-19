import React, { useState, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router';
import { Form, Button, Container, Row, Col, Image } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { BiEnvelope, BiPhone, BiLock, BiLockOpen } from 'react-icons/bi'; // Importamos iconos de react-icons
import logo from '../../assets/logo-gym-transparent.png'; 
import PaymentModal from '../../components/PaymentModal';
import { HiHome } from 'react-icons/hi';

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const planFromURL = searchParams.get('plan');

  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Estado para los campos del formulario
  const [form, setForm] = useState({
    plan: planFromURL || '', // Plan seleccionado desde la URL o vacío
    name: '',
    lastname: '',
    email: '',
    telNumber: '',
    password: '',
    confirmPassword: '', // Faltaba este campo para la validación
  });

  // Estado para errores
  const [errors, setErrors] = useState({});

  // Refs para los campos de entrada
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  // Manejar cambio en la selección del plan
  const handlePlanChange = (e) => {
    setForm({ ...form, plan: e.target.value });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      name,
      lastname,
      email,
      telNumber,
      password,
      confirmPassword,
      plan,
    } = form;

    // Validación

    if (!plan) {
      toast.error('¡Debes seleccionar un plan!');
      setErrors((prev) => ({ ...prev, plan: true }));
      return;
    }

    if (!name.trim()) {
      toast.error('¡El nombre está vacío!');
      setErrors((prev) => ({ ...prev, name: true }));
      nameRef.current.focus();
      return;
    }
    if (!lastname.trim()) {
      toast.error('¡El apellido está vacío!');
      setErrors((prev) => ({ ...prev, lastname: true }));
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

    setShowPaymentModal(true);
  };

  const handlePaymentConfirm = async () => {
    try {
      // Eliminamos confirmPassword antes de enviar al backend
      const { confirmPassword, ...userToSend } = form;

      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userToSend),
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
    setShowPaymentModal(false);
  };

  const goBackHome = () => navigate('/home');

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center bg-black bg-opacity-75"
    >
      {/* Botón de casita */}
      <Button
        variant="warning"
        onClick={goBackHome}
        className="position-absolute top-0 end-0 m-4"
        aria-label="Volver al inicio"
        title="Volver al inicio"
      >
        <HiHome size={25} className="m-1" />
      </Button>

      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={10} md={6} lg={4}>
          <div className="p-4 shadow rounded-3 border border-warning bg-dark text-white">
            {/* Imagen falsa del perfil */}
            <div className="text-center mb-4">
              <Image
                src={logo}
                alt="Logo FunctionFit"
                className="img-fluid rounded"
                style={{
                  maxHeight: '150px',
                  padding: '1rem',
                }}
              />
            </div>
            <h2 className="text-center mb-4">Registrarse</h2>

            <Form onSubmit={handleSubmit}>
              {/* Selección de Plan */}
              <Form.Group controlId="plan" className="mb-3">
                <Form.Label>Seleccionar Plan:</Form.Label>
                <Form.Select
                  value={form.plan}
                  onChange={handlePlanChange}
                  className="border border-warning rounded px-3 py-2"
                >
                  <option value="">-- Selecciona un plan --</option>
                  <option value="basic">Básico ($25.000 por mes)</option>
                  <option value="premium">Premium ($50.000 por mes)</option>
                  <option value="elite">Elite ($100.000 por mes)</option>
                </Form.Select>
              </Form.Group>

              {/* Nombre y Apellido */}
              <Row className="mb-3">
                <Col sm={6}>
                  <Form.Group controlId="name">
                    <Form.Control
                      type="text"
                      placeholder="Nombre"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      ref={nameRef}
                      className={`border rounded px-3 py-2 ${errors.name ? 'border-danger' : 'border-warning'
                        }`}
                      autoComplete="given-name"
                    />
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group controlId="lastname">
                    <Form.Control
                      type="text"
                      placeholder="Apellido"
                      name="lastname"
                      value={form.lastname}
                      onChange={handleChange}
                      ref={nameRef}
                      className={`border rounded px-3 py-2 ${errors.lastname ? 'border-danger' : 'border-warning'
                        }`}
                      autoComplete="family-name"
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Email */}
              <Form.Group controlId="email" className="mb-3">
                <div className="d-flex align-items-center">
                  <BiEnvelope size={20} className="me-2 text-white" />
                  <Form.Control
                    type="email"
                    placeholder="Correo electrónico"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`border rounded px-3 py-2 ${errors.email ? 'border-danger' : 'border-warning'
                      }`}
                    autoComplete="email"
                  />
                </div>
              </Form.Group>

              {/* Teléfono */}
              <Form.Group controlId="telNumber" className="mb-3">
                <div className="d-flex align-items-center">
                  <BiPhone size={20} className="me-2 text-white" />
                  <Form.Control
                    type="tel"
                    placeholder="Teléfono"
                    name="telNumber"
                    value={form.telNumber}
                    onChange={handleChange}
                    className={`border rounded px-3 py-2 ${errors.telNumber ? 'border-danger' : 'border-warning'
                      }`}
                    autoComplete="tel"
                  />
                </div>
              </Form.Group>

              {/* Contraseña */}
              <Form.Group controlId="password" className="mb-3">
                <div className="d-flex align-items-center">
                  <BiLock size={20} className="me-2 text-white" />
                  <Form.Control
                    type="password"
                    placeholder="Contraseña"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className={`border rounded px-3 py-2 ${errors.password ? 'border-danger' : 'border-warning'
                      }`}
                    autoComplete="new-password"
                  />
                </div>
              </Form.Group>

              {/* Confirmar Contraseña */}
              <Form.Group controlId="confirmPassword" className="mb-3">
                <div className="d-flex align-items-center">
                  <BiLockOpen size={20} className="me-2 text-white" />
                  <Form.Control
                    type="password"
                    placeholder="Confirmar contraseña"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className={`border rounded px-3 py-2 ${errors.confirmPassword
                      ? 'border-danger'
                      : 'border-warning'
                      }`}
                    autoComplete="new-password"
                  />
                </div>
              </Form.Group>

              {/* Botón de Registro */}
              <Button
                variant="warning"
                type="submit"
                className="w-100 fw-bold text-dark"
              >
                Registrarse
              </Button>
              <Col className="mt-5 d-flex justify-content-center gap-1">
                <p>Ya tienes una cuenta?</p>
                <Link
                  to="/login"
                  className="text-decoration-none text-warning fw-bold"
                >
                  Iniciar sesión
                </Link>
              </Col>
            </Form>
            {/* Modal de pago */}
            <PaymentModal
              modalState={{
                show: showPaymentModal,
                onHide: () => setShowPaymentModal(false),
                onConfirm: handlePaymentConfirm,
              }}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
