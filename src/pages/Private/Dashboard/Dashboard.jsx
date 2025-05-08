import { useEffect, useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Routes, Route, useLocation, useNavigate } from 'react-router';

import GymClasses from '../Classes/Classes';

// los button mas abajo, deben ser replazados por por ejemplo una imagen
const Dashboard = ({ role, onLogout }) => {
  const [clases, setClases] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/dashboard')
      fetch('http://localhost:3000/clases')
        .then((res) => res.json())
        .then((data) => setClases([...data]))
        .catch((err) => console.log(err));
  }, [location]);

  const navigate = useNavigate();

  // const goToClasses = () => {
  //   navigate('/home/clases');
  // };

  // const goToPayments = () => {
  //   navigate('/home/pagos');
  // };

  // const goToHistory = () => {
  //   navigate('/home/historial');
  // };

  // const goToGestionSocios = () => {
  //   navigate('/home/gestion-socios');
  // };

  return (
    // <Container>
    //   <h2>Bienvenido al Dashboard</h2>
    //   <Row>
    //     <Col>
    //       {role === 'socio' && (
    //         <div>
    //           <Button onClick={goToClasses}>Solicitar turnos</Button>
    //           <Button onClick={goToHistory}>Ver historial de clases</Button>
    //           <Button onClick={goToPayments}>Pagar cuota mensual</Button>
    //         </div>
    //       )}

    //       {role === 'admin' && (
    //         <div>
    //           <Button onClick={() => navigate('/home/socios')}>Ver socios</Button>
    //           <Button onClick={goToGestionSocios}>Gestionar Socios</Button> {/* Agregado solo para admin */}
    //         </div>
    //       )}

    //       {role === 'superadmin' && (
    //         <div>
    //           <Button onClick={() => navigate('/home/configuracion')}>Configuración</Button>
    //           <Button onClick={() => navigate('/home/admins')}>Gestionar admins</Button>
    //         </div>
    //       )}
    //     </Col>
    //   </Row>

    //   <Button onClick={onLogout}>Cerrar sesión</Button>
    // </Container>
    <>
      <h2>Bienvenido al Dashboard</h2>{' '}
      <Row className="w-100 my-3">
        <Col />
        <Col md={3} className="d-flex justify-content-end ">
          <Button onClick={onLogout}>Cerrar sesión</Button>
        </Col>
      </Row>
      <Routes>
        <Route index element={<GymClasses clases={clases} />} />
      </Routes>
    </>
  );
};

export default Dashboard;
