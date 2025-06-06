import { Button, Container } from 'react-bootstrap';
import { FaBan, FaDumbbell } from 'react-icons/fa6';
import { useNavigate } from 'react-router';

const NotFound = () => {
  const navigate = useNavigate();

  const goBackLoginHandler = () => {
    navigate('/home');
  };

  return (
    <Container
      fluid
      className="vh-100 d-flex justify-content-center align-items-center gap-5 shadow-lg "
    >
      <div className="text-center mt-3 border-warning rounded-3 p-5 bg-dark bg-opacity-10 mx-auto gap-5">
        <FaDumbbell size={75} />
        <h2 className="mb-5"> ¡Ups! La página solicitada no fue encontrada</h2>
        <Button
          className="text-center fw-medium"
          variant="warning"
          onClick={goBackLoginHandler}
        >
          Volver
        </Button>
      </div>
    </Container>
  );
};

export default NotFound;
