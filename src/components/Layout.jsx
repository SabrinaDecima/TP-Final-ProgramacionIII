import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { Outlet } from 'react-router';
import { Container } from 'react-bootstrap';

const Layout = ({ onLogout, userEmail, role }) => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-dark bg-opacity-10">
      <Header userEmail={userEmail} handleLogout={onLogout} />
      <div className="d-flex flex-grow-1 pt-5">
        <Sidebar role={role} />
        <main className="flex-grow-1 p-3 mt-5 mb-4" style={{ marginLeft: '250px' }}>
          <Container fluid className='mb-4'>
            <Outlet />
          </Container>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
