import React, { useEffect, useState, useRef, useContext } from 'react';
import {
  Container,
  Card,
  ListGroup,
  Button,
  Spinner,
  Alert,
  Row,
  Col,
} from 'react-bootstrap';
import PaymentModal from '../../components/PaymentModal';
import { GlobalDataContext } from '../../context/GlobalDataContext';

const MESES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const Pagos = ({ id }) => {
  const { incrementPagosVisit } = useContext(GlobalDataContext);
  const hasVisited = useRef(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paying, setPaying] = useState(false);
  const [message, setMessage] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const fetchCuotas = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:3000/users/${id}/cuotas/impagas`);
      if (!res.ok) throw new Error('Error al cargar cuotas');
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!hasVisited.current) {
      incrementPagosVisit();
      hasVisited.current = true;
    }
  }, []);

  useEffect(() => {
    fetchCuotas();
  }, [id]);

  const getNextImpaga = () => {
    if (!data) return null;
    return data.detalle_meses.find(m => m.estado === 'impaga') || null;
  };

  const handlePagarCuota = async () => {
    const cuota = getNextImpaga();
    if (!cuota) {
      setMessage('No hay cuotas impagas para pagar.');
      return;
    }
    setPaying(true);
    setMessage('');
    try {
      const res = await fetch('http://localhost:3000/cuotas/pagar', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: data.usuario.id, month: cuota.mes }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Error al pagar cuota');
      setMessage('✅ Cuota pagada con éxito.');
      await fetchCuotas();
    } catch (err) {
      setMessage(`❌ Error: ${err.message}`);
    }
    setPaying(false);
  };

  if (loading)
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status" />
        <p className="mt-2">Cargando cuotas...</p>
      </Container>
    );

  if (error)
    return (
      <Container className="mt-5">
        <Alert variant="danger">Error: {error}</Alert>
      </Container>
    );

  if (!data)
    return (
      <Container className="mt-5">
        <Alert variant="warning">No hay datos disponibles.</Alert>
      </Container>
    );

  const nextCuota = getNextImpaga();

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title>Pagos de {data.usuario.nombre}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Email: {data.usuario.email}
          </Card.Subtitle>

          <Row className="mt-4">
            <Col md={6}>
              <h5>Resumen</h5>
              <ListGroup>
                <ListGroup.Item>Total pagadas: {data.resumen.total_pagadas}</ListGroup.Item>
                <ListGroup.Item>Total impagas: {data.resumen.total_impagas}</ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={6}>
              <h5>Detalle Meses</h5>
              <ListGroup>
                {data.detalle_meses
                  .filter(({ estado }) => estado !== 'no generada')
                  .map(({ mes, estado }) => (
                    <ListGroup.Item key={mes}>
                      {MESES[mes - 1]}: {estado}
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            </Col>
          </Row>

          <hr />

          {nextCuota ? (
            <div className="mt-3">
              <p>La próxima cuota a pagar es: <strong>{MESES[nextCuota.mes - 1]}</strong></p>
              <Button onClick={() => setShowPaymentModal(true)} disabled={paying} variant="success">
                {paying ? 'Pagando...' : 'Pagar cuota'}
              </Button>

            </div>
          ) : (
            <Alert variant="info" className="mt-3">
              No hay cuotas impagas para pagar.
            </Alert>
          )}

          {message && (
            <Alert variant={message.startsWith('✅') ? 'success' : 'danger'} className="mt-3">
              {message}
            </Alert>
          )}

          <PaymentModal
            modalState={{
              show: showPaymentModal,
              onHide: () => setShowPaymentModal(false),
              onConfirm: async () => {
                await handlePagarCuota();
                setShowPaymentModal(false);
              },
            }}
          >
            ¿Confirmás el pago de la cuota de <strong>{MESES[nextCuota.mes - 1]}</strong>?
          </PaymentModal>


        </Card.Body>
      </Card>
    </Container>
  );
};

export default Pagos;
