import React, { useEffect, useState } from 'react';
import { Table, Spinner, Container, Modal, Button, Form } from 'react-bootstrap';
import { errorToast, successToast } from '../../utils/notification.jsx';
import { getToken } from '../../services/authService.js';

const Members = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    telNumber: '',
    plan: ''
  });

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro que deseas eliminar este usuario?')) return;

    try {
      const res = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`
        }
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Error al eliminar usuario');
      }

      setMembers((prev) => prev.filter((user) => user.id !== id));
      successToast('Usuario eliminado correctamente');
    } catch (error) {
      console.error(error);
      errorToast(error.message);
    }
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:3000/users/${selectedUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Error al actualizar el usuario');
      }

      const updated = await res.json();

      setMembers((prev) =>
        prev.map((u) => (u.id === selectedUser.id ? updated.user : u))
      );

      successToast('Usuario actualizado correctamente');
      setShowEditModal(false);
    } catch (error) {
      console.error(error);
      errorToast(error.message);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      telNumber: user.telNumber,
      plan: user.plan || ''
    });
    setShowEditModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch('http://localhost:3000/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`
          }
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || 'Error al obtener los miembros');
        }

        const data = await res.json();
        const soloMiembros = data.users.filter((u) => u.roleId === 3);
        setMembers(soloMiembros);
      } catch (error) {
        console.error(error);
        errorToast(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status" />
        <p className="mt-2">Cargando miembros...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Miembros del gimnasio</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Plan</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {members.map((user) => (
            <tr key={user.id}>
              <td>{user.name} {user.lastname}</td>
              <td>{user.email}</td>
              <td>{user.telNumber}</td>
              <td>{user.plan || 'Sin plan'}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(user)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(user.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                name="telNumber"
                value={formData.telNumber}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Plan</Form.Label>
              <Form.Control
                type="text"
                name="plan"
                value={formData.plan}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Members;
