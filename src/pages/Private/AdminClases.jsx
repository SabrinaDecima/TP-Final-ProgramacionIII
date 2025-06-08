import React, { useEffect, useState } from 'react';
import { Table, Spinner, Container, Modal, Button, Form } from 'react-bootstrap';
import { errorToast, successToast } from '../../utils/notification.jsx';

const AdminClases = () => {
  const [clases, setClases] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    instructor: '',
    durationMinutes: '',
    imageUrl: ''
  });

  // Fetch clases
  useEffect(() => {
    const fetchClases = async () => {
      try {
        const res = await fetch('http://localhost:3000/clases');
        if (!res.ok) throw new Error('Error al obtener las clases');
        const data = await res.json();
        setClases(data);
      } catch (error) {
        errorToast(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchClases();
  }, []);

  // Abrir modal editar
  const handleEdit = (clase) => {
    setSelectedClass(clase);
    setFormData({
      name: clase.name || '',
      instructor: clase.instructor || '',
      durationMinutes: clase.durationMinutes ? String(clase.durationMinutes) : '',
      imageUrl: clase.imageUrl || '',
    });
    setShowEditModal(true);
  };

  // Cambiar inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Guardar cambios (PUT)
  const handleSave = async () => {
    if (!formData.name || !formData.instructor) {
      errorToast('El nombre y el instructor son obligatorios');
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/clases/${selectedClass.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          durationMinutes: formData.durationMinutes ? Number(formData.durationMinutes) : null,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || 'Error al actualizar la clase');
      }

      const updatedClass = await res.json();

      setClases(prev =>
        prev.map(c => (c.id === selectedClass.id ? updatedClass : c))
      );

      successToast('Clase actualizada correctamente');
      setShowEditModal(false);
    } catch (error) {
      errorToast(error.message);
    }
  };

  // Eliminar clase (DELETE)
  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar esta clase?')) return;

    try {
      const res = await fetch(`http://localhost:3000/clases/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || 'Error al eliminar la clase');
      }

      setClases(prev => prev.filter(c => c.id !== id));
      successToast('Clase eliminada correctamente');
    } catch (error) {
      errorToast(error.message);
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status" />
        <p>Cargando clases...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Gestión de Clases</h2>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Instructor</th>
            <th>Duración (min)</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clases.map((clase) => (
            <tr key={clase.id}>
              <td>{clase.name}</td>
              <td>{clase.instructor}</td>
              <td>{clase.durationMinutes}</td>
              <td>
                {clase.imageUrl ? (
                  <img src={clase.imageUrl} alt={clase.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                ) : (
                  'Sin imagen'
                )}
              </td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(clase)}>
                  Editar
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(clase.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal edición */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Clase</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Instructor</Form.Label>
              <Form.Control
                type="text"
                name="instructor"
                value={formData.instructor}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Duración (minutos)</Form.Label>
              <Form.Control
                type="number"
                name="durationMinutes"
                value={formData.durationMinutes}
                onChange={handleChange}
                min={0}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>URL Imagen</Form.Label>
              <Form.Control
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
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

export default AdminClases;
