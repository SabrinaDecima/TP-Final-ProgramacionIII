import { useNavigate } from 'react-router';
import CardWidget from '../../../components/CardWidget';

const SuperAdminDashboardContent = () => {
  const navigate = useNavigate();

  const cardData = [
    {
      title: 'Gestion',
      text: 'Gestiona los roles de los usuarios',
      buttonName: 'Ver',
      pathname: 'members-management',
    },
    {
      title: 'Movimientos',
      text: 'Movimientos del gimnasio',
      buttonName: 'Movimientos',
      pathname: 'movimientos',
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
