import { useNavigate } from 'react-router';
import CardWidget from '../../../components/CardWidget';

const AdminDashboardContent = () => {
  const navigate = useNavigate();

  const cardData = [
    {
      title: 'Socios',
      text: 'Ver y administrar los socios del gimnasio',
      buttonName: 'Ver Socios',
      pathname: 'members',
    },
    {
      title: 'Ver historial',
      text: 'Ver el historial de clases y pagos',
      buttonName: 'Historial',
      pathname: 'historial',
    },
    {
      title: 'Agregar clases',
      text: 'Agrega nuevas clases al sistema',
      buttonName: 'Agregar',
      pathname: 'classes',
    },
  ];
  const handleRoute = (page) => {
    navigate(`/gimnasio/${page}`);
  };

  return (
    <div className="d-flex flex-column flex-md-row flex-wrap justify-content-evenly  align-items-center gap-5">
      {cardData.map((card, index) => (
        <div key={index}>
          <CardWidget card={card} onRoute={handleRoute} />
        </div>
      ))}
    </div>
  );
};

export default AdminDashboardContent;
