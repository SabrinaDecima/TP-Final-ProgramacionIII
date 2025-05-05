import { Card, Button, Row, Col } from 'react-bootstrap';

const GymClasses = ({ clases }) => {
  return (
    <div className="mt-4">
      <h3 className="text-center mb-4">Clases disponibles</h3>
      <Row>
        {clases.map((clase) => (
          <Col key={clase.id} md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={clase.imageUrl} alt={clase.name} style={{ height: '200px', objectFit: 'cover' }} />
              <Card.Body>
                <Card.Title>{clase.name}</Card.Title>
                <Card.Text>
                  <strong>Instructor:</strong> {clase.instructor}<br />
                  <strong>Duración:</strong> {clase.durationMinutes} minutos
                </Card.Text>
                <Button variant="primary">Solicitar turno</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default GymClasses;
