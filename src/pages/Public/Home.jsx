import React from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router';
import prices from '../../data/prices.json';
import heroImg from '../../assets/logo-gym-transparent.png';

const Home = () => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-dark">
      <header className="border-bottom shadow-sm bg-dark">
        <div className="container d-flex align-items-center justify-content-between py-3">
          <div className="d-flex align-items-center gap-2">
            <span className="fs-5 fw-bold text-warning">FunctionFit()</span>
          </div>
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex align-items-center gap-3">
              <Button
                as={Link}
                to="/login"
                variant="outline-warning"
                className="text-white"
              >
                Iniciar Sesión
              </Button>
              <Button as={Link} to="/registro" variant="warning">
                Registrarse
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow-1">
        {/* HERO */}
        <section className="py-5 text-center bg-dark text-white position-relative">
          <Container>
            <Row className="align-items-center justify-content-center">
              <Col md={6} className="text-md-start text-center mb-4 mb-md-0">
                <h1 className="display-3 fw-bold mb-3 text-warning">
                  Transforma tu cuerpo, transforma tu vida
                </h1>
                <p className="lead mb-4">
                  Únete a <strong>FunctionFit()</strong> y comienza tu viaje
                  hacia un estilo de vida más saludable con nuestros
                  entrenadores expertos y equipamiento de última generación.
                </p>
                <div className="d-flex flex-column flex-sm-row gap-3 justify-content-md-start justify-content-center">
                  <Link to="/registro">
                    <Button size="lg" variant="warning" className="fw-bold">
                      Comenzar Ahora
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline-warning"
                    className="fw-bold text-white"
                    href="#plans"
                  >
                    Ver Planes
                  </Button>
                </div>
              </Col>
              <Col md={6} className="text-center">
                <img
                  src={heroImg}
                  alt="Hero FunctionFit"
                  className="img-fluid rounded "
                  style={{
                    maxHeight: '350px',
                    padding: '1rem',
                  }}
                />
              </Col>
            </Row>
          </Container>
        </section>

        {/* PLANES */}
        <section className="py-5" id="plans">
          <Container>
            <h2 className="mb-5 text-center display-6 fw-bold text-warning">
              Nuestros Planes
            </h2>
            <Row className="g-4">
              {prices.prices.map((plan) => (
                <Col key={plan.title} md={4}>
                  {plan.highlighted && (
                    <div className="bg-warning text-dark text-center rounded-top py-2">
                      <p className="fw-bolder m-0 py-1 text-uppercase">
                        Más vendido
                      </p>
                    </div>
                  )}
                  <Card
                    className={`border rounded p-4 ${plan.highlighted
                        ? 'border-warning bg-light shadow rounded-top-0'
                        : 'bg-dark text-white border-secondary'
                      }`}
                  >
                    <h3 className="card-title h4 fw-bold text-warning">
                      {plan.title}
                    </h3>
                    <div className="mt-3 fs-3 fw-bold">{plan.price}</div>
                    <p className="text-muted small">por mes</p>
                    <ul className="list-unstyled mt-4 flex-grow-1">
                      {plan.features.map((feature) => (
                        <li
                          key={feature}
                          className="d-flex align-items-center my-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-warning me-2"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link to={`/registro?plan=${encodeURIComponent(plan.title)}`}>
                      <Button
                        variant={
                          plan.highlighted ? 'warning' : 'outline-warning'
                        }
                        className="mt-3 w-100 fw-bold"
                      >
                        Elegir Plan
                      </Button>
                    </Link>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        {/* POR QUÉ ELEGIRNOS */}
        <section className="bg-light py-5">
          <Container>
            <h2 className="mb-5 text-center display-6 fw-bold text-warning">
              Por qué elegirnos
            </h2>
            <Row className="g-4">
              {[
                {
                  title: 'Entrenadores Expertos',
                  description:
                    'Nuestros entrenadores certificados te guiarán en cada paso de tu viaje fitness.',
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-warning"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  ),
                },
                {
                  title: 'Equipamiento Moderno',
                  description:
                    'Contamos con las últimas máquinas y equipos para maximizar tus resultados.',
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-warning"
                    >
                      <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                      <line x1="6" y1="1" x2="6" y2="4"></line>
                      <line x1="10" y1="1" x2="10" y2="4"></line>
                      <line x1="14" y1="1" x2="14" y2="4"></line>
                    </svg>
                  ),
                },
                {
                  title: 'Comunidad de Apoyo',
                  description:
                    'Forma parte de una comunidad que te motiva a alcanzar tus metas.',
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-warning"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  ),
                },
              ].map((feature) => (
                <Col key={feature.title} md={4}>
                  <div className="text-center p-4 rounded bg-white h-100 shadow-sm">
                    <div className="mb-3">{feature.icon}</div>
                    <h3 className="h5 fw-bold mb-2 text-warning">
                      {feature.title}
                    </h3>
                    <p className="text-muted">{feature.description}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      </main>

      <footer className="border-top py-4 bg-dark text-white">
        <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
          <div className="d-flex align-items-center gap-2">
            <span className="fs-6 fw-bold text-warning">FunctionFit()</span>
          </div>
          <p className="small text-center mb-0">
            © 2025 FunctionFit(). Todos los derechos reservados.
          </p>
          <div className="d-flex gap-3 ">
            <Link
              to="#"
              className="text-decoration-none hover-text-dark text-white"
            >
              Términos
            </Link>
            <Link
              to="#"
              className=" text-decoration-none hover-text-dark text-white"
            >
              Privacidad
            </Link>
            <Link
              to="#"
              className=" text-decoration-none hover-text-dark text-white"
            >
              Contacto
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
