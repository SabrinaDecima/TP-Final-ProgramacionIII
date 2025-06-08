import React, { useEffect, useState } from 'react';
import { Container, Spinner, Table, Card, Row, Col, Badge } from 'react-bootstrap';
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { errorToast } from '../../../utils/notification.jsx';

const Movimientos = () => {
    const [loading, setLoading] = useState(true);
    const [resumen, setResumen] = useState(null);
    const [sqliteSequence, setSqliteSequence] = useState([]);

    useEffect(() => {
        const fetchResumen = async () => {
            try {
                const res = await fetch('http://localhost:3000/superadmin/overview');
                if (!res.ok) throw new Error('Error en la respuesta del servidor');
                const data = await res.json();
                setResumen(data.resumen);
                setSqliteSequence(data.sqliteSequence || []);
            } catch (error) {
                errorToast('Error al cargar resumen SuperAdmin');
            } finally {
                setLoading(false);
            }
        };

        fetchResumen();
    }, []);

    if (loading) {
        return (
            <Container className="my-5 text-center">
                <Spinner animation="border" />
            </Container>
        );
    }

    if (!resumen) {
        return (
            <Container className="my-5">
                <p className="text-danger text-center">No se pudo cargar el resumen.</p>
            </Container>
        );
    }

    return (
        <Container className="my-5">
            <h2 className="mb-4 text-center">Resumen SuperAdmin</h2>

            <Row className="mb-4">
                <Col md={4} className="mb-3">
                    <Card className="shadow-sm text-center">
                        <Card.Body>
                            <Card.Title>Total Usuarios</Card.Title>
                            <Card.Text style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                                {resumen.totalUsuarios}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4} className="mb-3">
                    <Card className="shadow-sm text-center">
                        <Card.Body>
                            <Card.Title>Total Inscripciones</Card.Title>
                            <Card.Text style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                                {resumen.totalInscripciones}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4} className="mb-3">
                    <Card className="shadow-sm text-center">
                        <Card.Body>
                            <Card.Title>Cuotas</Card.Title>
                            <div>
                                <Badge bg="success" className="me-2">
                                    Pagadas: {resumen.cuotas.pagadas}
                                </Badge>
                                <Badge bg="danger">
                                    Impagas: {resumen.cuotas.impagas}
                                </Badge>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Card className="shadow-sm mb-4">
                <Card.Body>
                    <Card.Title>Usuarios por Rol</Card.Title>
                    {resumen.usuariosPorRol.length > 0 ? (
                        <Table striped bordered hover responsive className="mt-3 mb-0">
                            <thead>
                                <tr>
                                    <th>Rol</th>
                                    <th>Cantidad</th>
                                </tr>
                            </thead>
                            <tbody>
                                {resumen.usuariosPorRol.map(({ role, cantidad }) => (
                                    <tr key={role}>
                                        <td className="text-capitalize">{role}</td>
                                        <td>{cantidad}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <p className="text-muted mt-3">No hay datos de usuarios por rol.</p>
                    )}
                </Card.Body>
            </Card>

            {/* NUEVO BLOQUE para mostrar sqliteSequence */}
            <Card className="shadow-sm">
                <Card.Body>
                    <Card.Title>Secuencia SQLite (últimos IDs autoincrementales)</Card.Title>
                    {sqliteSequence.length > 0 ? (
                        <Table striped bordered hover responsive className="mt-3 mb-0">
                            <thead>
                                <tr>
                                    <th>Tabla</th>
                                    <th>Último ID usado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sqliteSequence.map(({ name, seq }) => (
                                    <tr key={name}>
                                        <td>{name}</td>
                                        <td>{seq}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <p className="text-muted mt-3">No hay datos de secuencia SQLite.</p>
                    )}
                </Card.Body>
            </Card>

            <ToastContainer position="top-right" autoClose={3000} transition={Bounce} />
        </Container>
    );
};

export default Movimientos;
