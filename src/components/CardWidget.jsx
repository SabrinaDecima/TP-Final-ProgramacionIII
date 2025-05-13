import { Button, Card } from "react-bootstrap"


const CardWidget = ({card}) => {
  return (
    <Card>
        <Card.Body className="d-flex flex-column justify-content-center align-items-center">
            <Card.Title>
                <h2>{card.title}</h2>
            </Card.Title>
            <Card.Text>
                {card.text}
            </Card.Text>
            <Button>{card.buttonName}</Button>
        </Card.Body>
    </Card>  
)
}

export default CardWidget