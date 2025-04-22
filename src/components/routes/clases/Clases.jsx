import { useState, useEffect } from 'react';
import { Button, ListGroup } from 'react-bootstrap';

const Clases = () => {
  const [clases, setClases] = useState([]);

  useEffect(() => {
    // datos de base de datos, ejemplo 
    setClases([
      { id: 1, nombre: 'Yoga', horario: '9:00 HS' },
      { id: 2, nombre: 'Pilates', horario: '10:00 HS' },
    ]);
  }, []);

  const solicitarTurno = (id) => {
    console.log(`Turno solicitado para la clase: ${id}`);
  };

  return (
    <div>
      <h2>Clases Disponibles</h2>
      <ListGroup>
        {clases.map(clase => (
          <ListGroup.Item key={clase.id}>
            {clase.nombre} - {clase.horario}
            <Button onClick={() => solicitarTurno(clase.id)} className="ml-2">
              Solicitar Turno
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Clases;
