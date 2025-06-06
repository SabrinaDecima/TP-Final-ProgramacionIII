import { Button, Card } from 'react-bootstrap';

const CardWidget = ({ card, onRoute }) => {
  return (
    <Card
      className="text-center bg-dark text-white border-warning shadow-lg rounded-3"
      style={{ width: '20rem', height: '20rem' }}
    >
      <Card.Body className="d-flex flex-column justify-content-center align-items-center">
        <Card.Title>
          <h2>{card.title}</h2>
        </Card.Title>
        <Card.Text>{card.text}</Card.Text>
        <Button
          variant="warning"
          className="fw-medium"
          onClick={() => onRoute(card.pathname)}
        >
          {card.buttonName}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CardWidget;
