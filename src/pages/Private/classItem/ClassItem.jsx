import React from 'react'
import { Card, Button } from 'react-bootstrap'

const ClassItem = ({clase}) => {
    console.log(clase, 'Entrega clases')
    return (
        <Card>
            <Card.Img
                variant="top"
                src={clase.imageUrl}
                alt={clase.name}
                style={{ height: '200px', objectFit: 'cover' }}
            />
            <Card.Body>
                <Card.Title>{clase.name}</Card.Title>
                <Card.Text>
                    <strong>Instructor:</strong> {clase.instructor}
                    <br />
                    <strong>Duración:</strong> {clase.durationMinutes} minutos
                </Card.Text>
                <Button variant="primary">Solicitar turno</Button>
            </Card.Body>
        </Card>
    )
}

export default ClassItem