import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Modal, Form, Spinner } from 'react-bootstrap';
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { errorToast, successToast } from '../../utils/notification.jsx';

const roleColors = {
  1: '#ffd700',  // Superadmin - dorado
  2: '#87ceeb',  // Admin - celeste
  3: '#90ee90',  // Member - verde claro
};

const roleNames = {
  1: 'Superadmin',
  2: 'Admin',
  3: 'Member',
};

const MembersSA = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [newRoleId, setNewRoleId] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:3000/users');
        if (!res.ok) throw new Error('Error al cargar usuarios');
        const data = await res.json();
        setUsers(data.users || []);
      } catch (e) {
        errorToast(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const openEditModal = (user) => {
    setEditingUser(user);
    setNewRoleId(user.roleId);
  };

  const closeEditModal = () => {
    setEditingUser(null);
    setNewRoleId(null);
  };

  const handleRoleChange = (e) => {
    setNewRoleId(parseInt(e.target.value, 10));
  };

  const handleSave = async () => {
    if (!editingUser || newRoleId === null) return;
    setSaving(true);
    try {
      const res = await fetch(`http://localhost:3000/users/${editingUser.id}/role`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roleId: newRoleId }),
      });
      if (!res.ok) throw new Error('Error actualizando rol');
      const data = await res.json();
      successToast('Rol actualizado correctamente');
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, roleId: newRoleId } : u));
      closeEditModal();
    } catch (e) {
      errorToast(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Container className="mt-4">
      <ToastContainer transition={Bounce} />
      <h2>Usuarios (Todos)</h2>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Plan</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) && users.length > 0 ? (
              users.map(user => (
                <tr
                  key={user.id}
                  style={{
                    backgroundColor: roleColors[user.roleId] || 'white',
                    color: user.roleId === 1 ? 'black' : 'inherit',
                  }}
                >
                  <td>{user.name}</td>
                  <td>{user.lastname}</td>
                  <td>{user.email}</td>
                  <td>{user.telNumber}</td>
                  <td>{user.plan || '-'}</td>
                  <td>{roleNames[user.roleId] || 'Desconocido'}</td>
                  <td>
                    <Button size="sm" onClick={() => openEditModal(user)}>Editar Rol</Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">No hay usuarios para mostrar</td>
              </tr>
            )}
          </tbody>
        </Table>
      )}

      <Modal show={!!editingUser} onHide={closeEditModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Rol de Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Rol</Form.Label>
            <Form.Select value={newRoleId || ''} onChange={handleRoleChange}>
              <option value="" disabled>Seleccionar rol</option>
              <option value={1}>Superadmin</option>
              <option value={2}>Admin</option>
              <option value={3}>Member</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeEditModal} disabled={saving}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={saving}>
            {saving ? 'Guardando...' : 'Guardar'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MembersSA;
