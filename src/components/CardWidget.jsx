import { Button, Card } from 'react-bootstrap';
import { useContext } from 'react';
import { GlobalDataContext } from '../context/GlobalDataContext';

const CardWidget = ({ card, onRoute }) => {
  const {
    historialVisits,
    clasesVisits,
    pagosVisits
  } = useContext(GlobalDataContext);

  const getCount = () => {
    switch (card.pathname) {
      case 'historial':
        return historialVisits;
      case 'clases':
        return clasesVisits;
      case 'pagos':
        return pagosVisits;
      default:
        return 0;
    }
  };

  const count = getCount();

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
        {count > 0 && (
          <small className="text-light fst-italic mt-3" style={{ fontSize: '0.6rem', opacity: 0.6 }}>
            Visitaste esta sección <strong>{count}</strong> {count === 1 ? 'vez' : 'veces'}
          </small>
        )}
      </Card.Body>
    </Card>
  );
};

export default CardWidget;
