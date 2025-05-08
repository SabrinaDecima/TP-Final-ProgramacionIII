import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router';
import prices from '../../../data/prices.json';

const Home = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <header className="sticky-top border-bottom bg-body-tertiary backdrop-blur shadow-sm">
        <div className="container d-flex align-items-center justify-content-between py-3">
          <div className="d-flex align-items-center gap-2">
            <span className="fs-5 fw-bold">GymFlex</span>
          </div>
          <div className="d-flex align-items-center gap-3">
            <Link to="/login">
              <Button variant="link" className="text-decoration-none">
                Iniciar Sesión
              </Button>
            </Link>
            <Link to="/register">
              <Button>Registrarse</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow-1">
        <section className="bg-gradient-to-b from-light to-white py-5 py-md-7 text-center">
          <div className="container">
            <h1 className="display-4 fw-bold mb-4">
              Transforma tu cuerpo, transforma tu vida
            </h1>
            <p className="lead text-muted max-w-700 mx-auto mb-5">
              Únete a GymFlex y comienza tu viaje hacia un estilo de vida más
              saludable con nuestros entrenadores expertos y equipamiento de
              última generación.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <Link to="/register">
                <Button size="lg">Comenzar Ahora</Button>
              </Link>
              <Link to="#planes">
                <Button size="lg" variant="outline-primary">
                  Ver Planes
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-5 py-md-7" id="planes">
          <div className="container">
            <h2 className="mb-5 text-center display-6 fw-bold">
              Nuestros Planes
            </h2>
            <div className="row g-4">
              {prices.prices.map((plan, index) => (
                <div key={index} className="col-md-4">
                  {plan.highlighted && (
                    <div className="bg-primary text-white text-center rounded-top py-2 ">
                      <p className=" fw-bolder m-0 py-1 text-uppercase">
                        Más vendido
                      </p>
                    </div>
                  )}
                  <div
                    className={`card border rounded p-4 ${
                      plan.highlighted
                        ? 'border-primary bg-light shadow rounded-top-0'
                        : ''
                    }`}
                  >
                    <h3 className="card-title h4 fw-bold">{plan.title}</h3>
                    <div className="mt-3 fs-3 fw-bold">{plan.price}</div>
                    <p className="text-muted small">por mes</p>
                    <ul className="list-unstyled mt-4 flex-grow-1">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="d-flex align-items-center my-2">
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
                            className="text-primary me-2"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant={
                        plan.highlighted ? 'primary' : 'outline-secondary'
                      }
                      className="mt-3 w-100"
                    >
                      Elegir Plan
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-light py-5 py-md-7">
          <div className="container">
            <h2 className="mb-5 text-center display-6 fw-bold">
              Por qué elegirnos
            </h2>
            <div className="row g-4">
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
                      className="text-primary"
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
                      className="text-primary"
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
                      className="text-primary"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  ),
                },
              ].map((feature, index) => (
                <div key={index} className="col-md-4">
                  <div className="text-center p-4 rounded">
                    <div className="mb-3">{feature.icon}</div>
                    <h3 className="h5 fw-bold mb-2">{feature.title}</h3>
                    <p className="text-muted">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-top py-4">
        <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
          <div className="d-flex align-items-center gap-2">
            <span className="fs-6 fw-bold">GymFlex</span>
          </div>
          <p className="text-muted small text-center mb-0">
            © 2024 GymFlex. Todos los derechos reservados.
          </p>
          <div className="d-flex gap-3">
            <Link
              to="#"
              className="text-muted text-decoration-none hover-text-dark"
            >
              Términos
            </Link>
            <Link
              to="#"
              className="text-muted text-decoration-none hover-text-dark"
            >
              Privacidad
            </Link>
            <Link
              to="#"
              className="text-muted text-decoration-none hover-text-dark"
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
