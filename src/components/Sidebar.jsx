import { Nav, Navbar } from 'react-bootstrap';
import LogoGym from '../assets/logo-gym-transparent.png';
import { Link } from 'react-router';
const Sidebar = ({ role }) => {
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
        <Navbar>
          {role === 'member' && (
            <Nav className="w-100 d-flex flex-column flex-start mx-2 fw-bold">
              <Link to="/gimnasio" className="nav-link">
                Menu
              </Link>
              <Link to="/gimnasio/clases" className="nav-link">
                Clases
              </Link>
              <Link to="/gimnasio/historial" className="nav-link">
                Historial
              </Link>
              <Link to="/gimnasio/pagos" className="nav-link">
                Pagos
              </Link>
            </Nav>
          )}

          {role === 'admin' && (
            <Nav className="w-100 d-flex flex-column flex-start mx-2 fw-bold">
              <Link to="/gimnasio" className="nav-link">
                Menu
              </Link>
              <Link to="/gimnasio/members" className="nav-link">
                Socios
              </Link>
              <Link to="/gimnasio/historial" className="nav-link">
                Historial
              </Link>
              <Link to="/gimnasio/classes" className="nav-link">
                Clases
              </Link>
            </Nav>
          )}
          {role === 'superadmin' && (
            <Nav className="w-100 d-flex flex-column flex-start mx-2 fw-bold">
              <Link to="/gimnasio" className="nav-link">
                Menu
              </Link>
              <Link to="/gimnasio/members-management" className="nav-link">
                Gestion
              </Link>
              <Link to="/gimnasio/historial" className="nav-link">
                Historial
              </Link>
            </Nav>
          )}
        </Navbar>
      </div>
    </div>
  );
};

export default Sidebar;
