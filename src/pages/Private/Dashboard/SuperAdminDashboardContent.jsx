import { useNavigate } from 'react-router';
import CardWidget from '../../../components/CardWidget';

const SuperAdminDashboardContent = () => {
  const navigate = useNavigate();

  const cardData = [
    {
      title: 'Gimnasios',
      text: 'Administrar los gimnasios',
      buttonName: 'Ver',
      pathname: 'members-management',
    },
    {
      title: 'Ver historial',
      text: 'Ver el historial de gimnasios',
      buttonName: 'Historial',
      pathname: 'historial',
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

export default SuperAdminDashboardContent;
