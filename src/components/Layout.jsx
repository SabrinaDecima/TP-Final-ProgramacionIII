import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { Outlet } from 'react-router';
import { Container } from 'react-bootstrap';

const Layout = ({ onLogout, userEmail }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header userEmail={userEmail} handleLogout={onLogout} />
      <div className="d-flex flex-grow-1 pt-5">
        <Sidebar />
        <main className="flex-grow-1 p-3 mt-5" style={{ marginLeft: '200px' }}>
          <Container fluid>
            <Outlet />
          </Container>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
