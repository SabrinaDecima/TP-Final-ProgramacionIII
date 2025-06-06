import React from 'react'
import { Card, Button } from 'react-bootstrap'

const ClassItem = ({ clase, id }) => {
    const handleSolicitarTurno = async () => {
        try {
            const response = await fetch(`http://localhost:3000/users/${id}/classes/${clase.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (!response.ok) {
                // Manejo específico de error
                if (data.error === 'El usuario ya está inscrito en esta clase') {
                    alert('Ya estás inscripto en esta clase.');
                } else {
                    alert(data.error || 'No se pudo completar la inscripción');
                }
                return;
            }

            alert('Inscripción exitosa');
        } catch (error) {
            console.error(error);
            alert('Error de red al intentar inscribirse');
        }
    };


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
                <Button variant="primary" onClick={handleSolicitarTurno}>Solicitar turno</Button>
            </Card.Body>
        </Card>
    )
}

export default ClassItem