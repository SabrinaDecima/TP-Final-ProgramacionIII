import { useEffect, useState } from 'react';
import { Button, Container, Row, Col, Card, Navbar } from 'react-bootstrap';
import { Routes, Route, useLocation, useNavigate } from 'react-router';

import Classes from '../Classes/Classes';
import CardWidget from '../../../components/CardWidget';
import Sidebar from '../../../components/Sidebar';
import Layout from '../../../components/Layout';

// los button mas abajo, deben ser replazados por por ejemplo una imagen
const Dashboard = ({ role, onLogout }) => {
  const [clases, setClases] = useState([]);
  const location = useLocation();

  const cardData = [
    {
      title: 'Reserva tu turno',
      text: 'Accede a la sección de clases disponibles',
      buttonName: 'Reservar',
      pathname: 'clases',
    },
    {
      title: 'Ver historial',
      text: 'Consulta tu historial de clases',
      buttonName: 'Historial',
      pathname: 'historial',
    },
    {
      title: 'Pagar cuota mensual',
      text: 'Realiza el pago de tu cuota mensual',
      buttonName: 'Pagar',
      pathname: 'pagos',
    },
  ];

  const handleRoute = (page) => {
    navigate(`/gimnasio/${page}`);
  };

  useEffect(() => {
    //TODO: consultar if
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
      <Row className="my-3 mx-5">
        <div className="d-flex flex-column flex-md-row flex-wrap justify-content-evenly  align-items-center gap-5">
          {cardData.map((card, index) => (
            <div key={index}>
              <CardWidget card={card} onRoute={handleRoute} />
            </div>
          ))}
        </div>
      </Row>
    </>
  );
};

export default Dashboard;
