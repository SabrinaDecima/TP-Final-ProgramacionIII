import { Row, Col } from 'react-bootstrap';
import ClassItem from '../classItem/ClassItem';
import { useEffect, useState } from 'react';

const Classes = ({ id }) => {
  console.log(id)
  const [clases, setClases] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/clases')
      .then((res) => res.json())
      .then((data) => setClases([...data]))
      .catch((err) => console.log(err));
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
