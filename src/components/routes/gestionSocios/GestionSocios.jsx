import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';

const GestionSocios = () => {
  const [socios, setSocios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newSocio, setNewSocio] = useState({ nombre: '', email: '', telefono: '' });
  const [editingSocio, setEditingSocio] = useState(null);

  useEffect(() => {
    // informacion desde la base de datos, ejemplo
    setSocios([
      { id: 1, nombre: 'Juan Pérez', email: 'juan@mail.com', telefono: '123456789' },
      { id: 2, nombre: 'Ana García', email: 'ana@mail.com', telefono: '987654321' },
    ]);
  }, []);

  const handleAddSocio = () => {
    // Agregar un socio
    setSocios([...socios, { ...newSocio, id: socios.length + 1 }]);
    setNewSocio({ nombre: '', email: '', telefono: '' });
    setShowModal(false);
  };

  const handleDeleteSocio = (id) => {
    // Eliminar un socio
    setSocios(socios.filter(socio => socio.id !== id));
  };

  const handleEditSocio = (id) => {
    // Buscar el socio por ID
    const socioToEdit = socios.find(socio => socio.id === id);
    setEditingSocio(socioToEdit);
    setShowModal(true);
  };

  const handleSaveEdit = () => {
    // Guardar cambios al socio editado
    setSocios(socios.map(socio => socio.id === editingSocio.id ? editingSocio : socio));
    setEditingSocio(null);
    setShowModal(false);
  };

  const handleChange = (e) => {
    // setear los cambios.
    const { name, value } = e.target;
    if (editingSocio) {
      setEditingSocio({ ...editingSocio, [name]: value });
    } else {
      setNewSocio({ ...newSocio, [name]: value });
    }
  };

  return (
    <div>
      <h2>Gestión de Socios</h2>
      
      {/* no se si esto se trae desde la bdd */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {socios.map(socio => (
            <tr key={socio.id}>
              <td>{socio.id}</td>
              <td>{socio.nombre}</td>
              <td>{socio.email}</td>
              <td>{socio.telefono}</td>
              <td>
                <Button variant="warning" onClick={() => handleEditSocio(socio.id)}>Editar</Button>{' '}
                <Button variant="danger" onClick={() => handleDeleteSocio(socio.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Botón para agregar un nuevo socio */}
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Agregar Nuevo Socio
      </Button>

      {/* Modal para agregar o editar un socio */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingSocio ? 'Editar Socio' : 'Agregar Nuevo Socio'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={editingSocio ? editingSocio.nombre : newSocio.nombre}
                onChange={handleChange}
                placeholder="Nombre del socio"
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={editingSocio ? editingSocio.email : newSocio.email}
                onChange={handleChange}
                placeholder="Email del socio"
              />
            </Form.Group>
            <Form.Group controlId="formTelefono">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                name="telefono"
                value={editingSocio ? editingSocio.telefono : newSocio.telefono}
                onChange={handleChange}
                placeholder="Teléfono del socio"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button
            variant="primary"
            onClick={editingSocio ? handleSaveEdit : handleAddSocio}
          >
            {editingSocio ? 'Guardar Cambios' : 'Agregar Socio'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default GestionSocios;
