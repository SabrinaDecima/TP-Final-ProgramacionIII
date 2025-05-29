import { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  Container,
  Button,
  Card,
  Col,
  Form,
  FormGroup,
  Row,
} from 'react-bootstrap';
import { HouseDoorFill } from 'react-bootstrap-icons';
import { toast } from 'react-toastify';

// Tus planes disponibles
const availablePlans = [
  { title: 'Básico', price: '$250000' },
  { title: 'Premium', price: '$50000' },
  { title: 'Elite', price: '$100000' }
];

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedPlanFromURL = searchParams.get('plan');

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [plan, setPlan] = useState(selectedPlanFromURL || '');
  const [errors, setErrors] = useState({});
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = form;

    if (!name.trim()) {
      toast.error('¡El nombre está vacío!');
      setErrors((prev) => ({ ...prev, name: true }));
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

    if (!plan) {
      toast.error('Por favor selecciona un plan.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, plan }),
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
    <Container fluid className="vh-100 d-flex justify-content-center align-items-center bg-light">
      <Row className="position-absolute top-0 end-0 m-4">
        <Button variant="outline-primary" onClick={goBackHome}>
          <HouseDoorFill size={25} className="m-1" />
        </Button>
      </Row>
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={10} md={6} lg={4}>
          <Card className="p-4 shadow-sm rounded-3 border-0">
            <Card.Body>
              <Row className="mb-3">
                <h5 className="text-center">Registrarse</h5>
              </Row>

              {/* Selección de plan */}
              <FormGroup className="mb-3">
                <Form.Label>Selecciona un Plan</Form.Label>
                <Form.Select name="plan" value={plan} onChange={(e) => setPlan(e.target.value)} required>
                  <option value="">-- Selecciona un plan --</option>
                  {availablePlans.map((p, idx) => (
                    <option key={idx} value={p.title.toLowerCase()}>
                      {p.title} - {p.price}
                    </option>
                  ))}
                </Form.Select>
              </FormGroup>

              <Form onSubmit={handleSubmit}>
                <FormGroup className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Nombre completo"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    ref={nameRef}
                    className={errors.name ? 'border border-danger' : ''}
                    autoComplete="name"
                  />
                </FormGroup>
                <FormGroup className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="Correo electrónico"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    ref={emailRef}
                    className={errors.email ? 'border border-danger' : ''}
                    autoComplete="email"
                  />
                </FormGroup>
                <FormGroup className="mb-4">
                  <Form.Control
                    type="password"
                    placeholder="Contraseña"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    ref={passwordRef}
                    className={errors.password ? 'border border-danger' : ''}
                    autoComplete="new-password"
                  />
                </FormGroup>
                <div className="d-grid">
                  <Button variant="success" type="submit" className="py-2 fw-bold">
                    Registrarse
                  </Button>
                </div>
                <Row className="mt-3">
                  <Col className="text-center">
                    ¿Ya tienes cuenta?{' '}
                    <Link to="/login" className="text-decoration-none text-success fw-bold">
                      Iniciar sesión
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

export default Register;