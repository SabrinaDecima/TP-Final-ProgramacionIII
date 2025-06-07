import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";

const Historical = ({ id }) => {
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/users/${id}/classes`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener historial");
        return res.json();
      })
      .then((data) => {
        setHistoricalData(data.classes);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching historical data:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status" />
        <p className="mt-2">Cargando historial de clases...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">Error: {error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h3 className="text-center mb-4">
        <i className="bi bi-calendar-check me-2"></i>
        Estas son las clases que ya tenés agendadas 🗓️
      </h3>
      {historicalData.length > 0 ? (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {historicalData.map((item) => (
            <Col key={item.id}>
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={item.imageUrl}
                  alt={item.name}
                  style={{ objectFit: "cover", height: "180px" }}
                />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>
                    <strong>Instructor:</strong> {item.instructor}<br />
                    <strong>Duración:</strong> {item.durationMinutes} minutos
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p className="text-center">No hay clases en el historial.</p>
      )}
    </Container>
  );
};

export default Historical;
