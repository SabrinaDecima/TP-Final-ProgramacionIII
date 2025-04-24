import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router';


// los button mas abajo, deben ser replazados por por ejemplo una imagen
const Dashboard = ({ role, onLogout }) => {
  const navigate = useNavigate();

  const goToClasses = () => {
    navigate('/dashboard/clases');
  };


  const goToPayments = () => {
    navigate('/dashboard/pagos');
  };

 
  const goToHistory = () => {
    navigate('/dashboard/historial');
  };

  const goToGestionSocios = () => {
    navigate('/dashboard/gestion-socios');
  };


  return (
    <Container>
      <h2>Bienvenido al Dashboard</h2>
      <Row>
        <Col>
          {role === 'socio' && (
            <div>
              <Button onClick={goToClasses}>Solicitar turnos</Button>
              <Button onClick={goToHistory}>Ver historial de clases</Button>
              <Button onClick={goToPayments}>Pagar cuota mensual</Button>
            </div>
          )}

          {role === 'admin' && (
            <div>
              <Button onClick={() => navigate('/dashboard/socios')}>Ver socios</Button>
              <Button onClick={goToGestionSocios}>Gestionar Socios</Button> {/* Agregado solo para admin */}
            </div>
          )}

          {role === 'superadmin' && (
            <div>
              <Button onClick={() => navigate('/dashboard/configuracion')}>Configuración</Button>
              <Button onClick={() => navigate('/dashboard/admins')}>Gestionar admins</Button>
            </div>
          )}
        </Col>
      </Row>

      <Button onClick={onLogout}>Cerrar sesión</Button>
    </Container>
  );
};

export default Dashboard;
