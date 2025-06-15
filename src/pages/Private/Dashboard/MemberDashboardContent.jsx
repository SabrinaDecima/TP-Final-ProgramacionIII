import { useNavigate } from 'react-router';
import CardWidget from '../../../components/CardWidget';

const MemberDashboardContent = () => {
  const navigate = useNavigate();

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

  return (
    <>
      <div className="d-flex flex-column flex-md-row flex-wrap justify-content-evenly align-items-center gap-5 mb-5"></div>
      <div className="d-flex flex-column flex-md-row flex-wrap justify-content-evenly align-items-center gap-5">
        {cardData.map((card, index) => (
          <div key={card.pathname}>
            <CardWidget card={card} onRoute={handleRoute} />
          </div>
        ))}
      </div>
    </>
  );
};

export default MemberDashboardContent;
