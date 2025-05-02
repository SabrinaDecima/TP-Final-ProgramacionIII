import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import {
  Container,
  Button,
  Card,
  Col,
  Form,
  FormGroup,
  Row
} from "react-bootstrap";
import {successToast} from "../../../utils/notification"

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const handleLogin = (role) => {
    if (role === "admin") {
      // Redirije dashboard de Admin
      onLogin("admin");
    } else if (role === "superadmin") {
      // Redirije dashboard de Superadmin
      onLogin("superadmin");
    } else {
      // Redirije dashboard de Socio
      onLogin("socio");
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
      showToast("¡El email está vacío!");
      emailRef.current.focus();
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: true,
      }));
      return;
    }

    if (!passwordRef.current.value.length) {
      showToast("¡El password está vacío!");
      passwordRef.current.focus();
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: true,
      }));
      return;
    }
    // const role = "socio";
    successToast(`Sesión iniciada con éxito para: ${email}`);
    onLogin();
    navigate("/home");
  };

  return (
    <>
      <Container
        fluid
        className="vh-100 d-flex justify-content-center align-items-center"
      >
        <Row className="w-100 justify-content-center">
          <Col xs={12} sm={10} md={6} lg={4}>
            <Card className="p-4 shadow">
              <Card.Body>
                <Row className="mb-2">
                  <h5 className="text-center">¡Bienvenidos a CodeFit!</h5>
                </Row>
                <Form onSubmit={handleSubmit}>
                  <FormGroup className="mb-4">
                    <Form.Control
                      type="text"
                      className={`input-email ${
                        errors.email ? "border border-danger" : ""
                      }`}
                      placeholder="Ingresar email"
                      onChange={handleEmailChange}
                      value={email}
                      ref={emailRef}
                    />
                    {errors.email && (
                      <p className="text-danger">
                        El campo email es obligatorio
                      </p>
                    )}
                  </FormGroup>
                  <FormGroup className="mb-4">
                    <Form.Control
                      type="password"
                      placeholder="Ingresar contraseña"
                      onChange={handlePasswordChange}
                      value={password}
                      ref={passwordRef}
                    />
                    {errors.password && (
                      <p className="text-danger">
                        El campo contraseña es obligatorio
                      </p>
                    )}
                  </FormGroup>
                  <div className="d-flex justify-content-center">
                    <Button variant="secondary" type="submit">
                      Iniciar sesión
                    </Button>
                  </div>
                  <Row className="mt-3">
                    <Col className="text-start">
                      <Link
                        to="/recuperar"
                        className="text-decoration-underline text-start text-dark"
                      >
                        Olvidaste tu contraseña?
                      </Link>
                    </Col>
                    <Col className="text-end">
                      <Link
                        to="/registro"
                        className="text-decoration-underline text-dark"
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

    </>
  );
};

export default Login;
