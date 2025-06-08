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
      pathname: 'admin-historial',
    },
    {
      title: 'Gestion clases',
      text: 'Gestioná las clases del sistema',
      buttonName: 'Agregar',
      pathname: 'admin-clases',
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
