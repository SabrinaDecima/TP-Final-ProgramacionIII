import { Row, Col } from 'react-bootstrap';
import ClassItem from '../classItem/ClassItem';

const Classes = ({ clases }) => {
  console.log(clases);
  return (
    <div className="mt-4">
      <h3 className="text-center mb-4">Clases disponibles</h3>
      <Row>
        {clases.map((clase) => (
          <Col key={clase.id} md={4} className="mb-4">
            <ClassItem clase={clase}/>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Classes;
