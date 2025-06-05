import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const PaymentModal = ({ modalState }) => {
  const [formData, setFormData] = useState({
    cardholderName: '',
    cardNumber: '',
    expirationDate: '',
    cvc: '',
  });
  const [errors, setErrors] = useState({});
  const [errorMsgs, setErrorMsgs] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: false }));
    setErrorMsgs((prev) => ({ ...prev, [name]: '' }));
  };

  const closeModal = () => {
    if (modalState.onHide) modalState.onHide();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    const newErrors = {};
    const newMsgs = {};

    // Validación de número de tarjeta
    if (!/^\d{16}$/.test(formData.cardNumber)) {
      newErrors.cardNumber = true;
      newMsgs.cardNumber =
        'El número de tarjeta debe tener 16 dígitos numéricos.';
      valid = false;
    }
    // Validación de fecha de expiración (MM/YY)
    const expRegex = /^(0[1-9]|1[0-2])\/(\d{2})$/;
    if (!expRegex.test(formData.expirationDate)) {
      newErrors.expirationDate = true;
      newMsgs.expirationDate =
        'La fecha de vencimiento debe tener formato MM/YY.';
      valid = false;
    } else {
      // Validar que la fecha sea mayor a la actual
      const [expMonth, expYear] = formData.expirationDate.split('/');
      const now = new Date();
      const currentYear = now.getFullYear() % 100; // dos dígitos
      const currentMonth = now.getMonth() + 1;
      if (
        parseInt(expYear) < currentYear ||
        (parseInt(expYear) === currentYear && parseInt(expMonth) < currentMonth)
      ) {
        newErrors.expirationDate = true;
        newMsgs.expirationDate = 'La tarjeta está vencida.';
        valid = false;
      }
    }
    // Validación de CVC
    if (!/^\d{3}$/.test(formData.cvc)) {
      newErrors.cvc = true;
      newMsgs.cvc = 'El CVC debe ser un número de 3 dígitos.';
      valid = false;
    }
    // Validación de nombre del titular
    if (!formData.cardholderName.trim()) {
      newErrors.cardholderName = true;
      newMsgs.cardholderName = 'El nombre del titular es obligatorio.';
      valid = false;
    }

    setErrors(newErrors);
    setErrorMsgs(newMsgs);
    if (!valid) return;

    if (modalState.onConfirm) modalState.onConfirm();
    closeModal();
  };

  return (
    <Modal show={modalState.show} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Pago con Tarjeta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Campo: Cardholder Name */}
          <Form.Group className="mb-3">
            <Form.Label>Nombre del Titular</Form.Label>
            <Form.Control
              type="text"
              name="cardholderName"
              placeholder="Carlos Pérez"
              value={formData.cardholderName}
              onChange={handleChange}
              required
              isInvalid={!!errors.cardholderName}
            />
            {errors.cardholderName && (
              <Form.Text className="text-danger">
                {errorMsgs.cardholderName}
              </Form.Text>
            )}
          </Form.Group>

          {/* Campo: Card Number */}
          <Form.Group className="mb-3">
            <Form.Label>Número de Tarjeta</Form.Label>
            <Form.Control
              type="text"
              name="cardNumber"
              placeholder="9591 6489 6389 1010"
              value={formData.cardNumber}
              onChange={handleChange}
              required
              isInvalid={!!errors.cardNumber}
            />
            {errors.cardNumber && (
              <Form.Text className="text-danger">
                {errorMsgs.cardNumber}
              </Form.Text>
            )}
          </Form.Group>

          {/* Campos: Expiration Date y CVC */}
          <div className="d-flex gap-3">
            {/* Expiration Date */}
            <Form.Group className="flex-grow-1 mb-3">
              <Form.Label>Fecha de Vencimiento (MM/YY)</Form.Label>
              <Form.Control
                type="text"
                name="expirationDate"
                placeholder="09/29"
                value={formData.expirationDate}
                onChange={handleChange}
                required
                isInvalid={!!errors.expirationDate}
              />
              {errors.expirationDate && (
                <Form.Text className="text-danger">
                  {errorMsgs.expirationDate}
                </Form.Text>
              )}
            </Form.Group>

            {/* CVC */}
            <Form.Group className="flex-grow-1 mb-3">
              <Form.Label>CVC</Form.Label>
              <Form.Control
                type="text"
                name="cvc"
                placeholder="e.g. 123"
                value={formData.cvc}
                onChange={handleChange}
                required
                isInvalid={!!errors.cvc}
              />
              {errors.cvc && (
                <Form.Text className="text-danger">{errorMsgs.cvc}</Form.Text>
              )}
            </Form.Group>
          </div>

          {/* Botón de Confirmación */}
          <Button variant="primary" type="submit">
            Confirmar Pago
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PaymentModal;
