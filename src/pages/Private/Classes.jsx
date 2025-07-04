import { Row, Col } from 'react-bootstrap';
import ClassItem from './ClassItem';
import { useEffect, useState, useContext, useRef } from 'react';
import { GlobalDataContext } from '../../context/GlobalDataContext';
import { useFetchAuth } from '../../hooks/useFetchAuth';

const Classes = ({ id }) => {
  const { incrementClasesVisit } = useContext(GlobalDataContext);
  const hasVisited = useRef(false);
  const [clases, setClases] = useState([]);

  const { fetchAuth } = useFetchAuth();

  useEffect(() => {
    fetchAuth('http://localhost:3000/clases')
      .then((res) => res.json())
      .then((data) => setClases([...data]))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (!hasVisited.current) {
      incrementClasesVisit();
      hasVisited.current = true;
    }
  }, []);

  return (
    <div className="mt-4">
      <h3 className="text-center mb-4">Clases disponibles</h3>
      <Row>
        {clases.map((clase) => (
          <Col key={clase.id} md={4} className="mb-4">
            <ClassItem clase={clase} id={id} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Classes;
