import { useState } from 'react';
import { Button, Alert, Card } from 'react-bootstrap';
// import GymClasses from './components/routes/clases/GymClasses'; 

const Socios = () => {
  const [cuotaPaga, setCuotaPaga] = useState(false); // Estado para setear la cuota mensual
  const [usuario, setUsuario] = useState({
    nombre: "Juan Pérez",
    correo: "juan.perez@example.com",
  });


  const solicitarTurno = (id) => {
    if (!cuotaPaga) {
      alert("Socio inactivo. Abonar cuota.");
      return;
    }
    console.log(`Turno solicitado para la clase con id: ${id}`);
  };

  // Función para pagar la cuota
  const pagarCuota = () => {
    setCuotaPaga(true);
    alert("¡Cuota pagada con éxito!Socio activo.");
  };

  return (
    <div>
      <h2>Bienvenido, {usuario.nombre}</h2>
      
      {/* Datos del socio */}
      <Card className="mb-4">
        <Card.Body>
          <h5>Perfil del Socio</h5>
          <p><strong>Correo:</strong> {usuario.correo}</p>
        </Card.Body>
      </Card>

      {/* Estado de la cuota */}
      <Card className="mb-4">
        <Card.Body>
          <h5>Estado de la cuota mensual:</h5>
          {cuotaPaga ? (
            <Alert variant="success">Cuota al día ✅</Alert>
          ) : (
            <Alert variant="danger">
              Cuota pendiente ❌
              <div className="mt-2">
                <Button onClick={pagarCuota}>Pagar ahora</Button>
              </div>
            </Alert>
          )}
        </Card.Body>
      </Card>

      {/* GymClasses disponibles */}
      <GymClasses onSolicitarTurno={solicitarTurno} cuotaPaga={cuotaPaga} />
      
    </div>
  );
};

export default Socios;
