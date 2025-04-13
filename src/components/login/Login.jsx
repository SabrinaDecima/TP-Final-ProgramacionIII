
import { useState, useRef } from "react";
import { Container, Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({
        email: false,
        password: false,
    })

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setErrors(prevErrors => ({
            ...prevErrors,
            email: false
        }))
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!email.length) {
            alert("¡El email está vacío!"); //ver esto
            emailRef.current.focus();
            setErrors(prevErrors => ({
                ...prevErrors,
                email: true,
            }))
            return;
        }

        if (!passwordRef.current.value.length) {
            alert("¡El password esta vacío!"); //ver esto
            passwordRef.current.focus();
            setErrors(prevErrors => ({
                ...prevErrors,
                password: true,
            }))
            return;
        }

        alert(`El email ingresado es: ${email} y el password es ${password}`); //ver esto
    }

    return (

        <Container fluid className="vh-100 d-flex justify-content-center align-items-center">
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
                                        className={`input-email ${errors.email ? 'border border-danger' : ''}`}
                                        placeholder="Ingresar email"
                                        onChange={handleEmailChange}
                                        value={email}
                                        ref={emailRef}
                                    />
                                    {errors.email && <p className="text-danger">El campo email es obligatorio</p>}
                                </FormGroup>
                                <FormGroup className="mb-4">
                                    <Form.Control
                                        type="password"
                                        placeholder="Ingresar contraseña"
                                        onChange={handlePasswordChange}
                                        value={password}
                                        ref={passwordRef}
                                    />
                                </FormGroup>
                                <div className="d-flex justify-content-center">
                                    <Button variant="secondary" type="submit">
                                        Iniciar sesión
                                    </Button>
                                </div>
                                <Row className="mt-3"> 
                                    <Col className="text-start">
                                        <a href="/recuperar" className="text-decoration-underline text-start text-dark" >¿Olvidaste tu contraseña?</a>  {/* href no podemos usarlo, tener en cuenta desp*/}
                                    </Col>
                                    <Col className="text-end">
                                        <a href="/registro" className="text-decoration-underline text-start text-dark">Registrarse</a> {/* href no podemos usarlo, tener en cuenta desp*/}
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


export default Login;