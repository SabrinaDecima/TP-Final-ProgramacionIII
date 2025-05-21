import { Nav, Navbar } from 'react-bootstrap';
import LogoGym from '../../public/logo-gym-transparent.png';
import { Link } from 'react-router';
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo fw-bold fs-5 text-primary py-3">
        <img
          src={LogoGym}
          alt="Logo del gimnasio"
          className="img-fluid"
          style={{ width: '150px' }}
        />
      </div>
      <div>
        <Navbar className="d-flex flex-start mx-2">
          <Nav>
            <Link to="/gimnasio/clases" className="nav-link">
              Clases
            </Link>
          </Nav>
        </Navbar>
      </div>
    </div>
  );
};

export default Sidebar;
