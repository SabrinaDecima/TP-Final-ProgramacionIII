import React, { useEffect, useState } from "react";

import { Card, Button } from "react-bootstrap";
import {
  errorToast,
  successToast,
  warningToast,
} from "../../utils/notification.jsx";
import { getToken } from "../../services/authService.js";

const ClassItem = ({ clase, id }) => {
  const [loading, setLoading] = useState(false);
  const [inscrito, setInscrito] = useState(false);

  useEffect(() => {
    const fetchInscripcion = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/clases/${clase.id}/users`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          const yaInscripto = data.users.some((u) => u.id === id);
          setInscrito(yaInscripto);
        }
      } catch (error) {
        console.error("Error al verificar inscripción:", error);
    }
    };
    fetchInscripcion();
  }, [clase.id, id]);

  const handleSolicitarTurno = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/users/${id}/classes/${clase.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        if (data.error === "El usuario ya está inscrito en esta clase") {
          warningToast("Ya estás inscripto en esta clase.");
        } else {
          errorToast(data.error || "No se pudo completar la inscripción");
        }
        setLoading(false);
        return;
      }
      successToast("Inscripción exitosa");
      setInscrito(true);
    } catch (error) {
      console.error(error);
      errorToast("Error de red al intentar inscribirse");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <Card.Img
        variant="top"
        src={clase.imageUrl}
        alt={clase.name}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title>{clase.name.toUpperCase()}</Card.Title>
        <Card.Text>
          <strong>Instructor:</strong> {clase.instructor}
          <br />
          <strong>Duración:</strong> {clase.durationMinutes} minutos
        </Card.Text>
        <Button
          variant="warning"
          className="fw-bold shadow-lg"
          onClick={handleSolicitarTurno}
          disabled={loading || inscrito}
        >
          {inscrito
            ? "Inscripto"
            : loading
            ? "Inscribiendo..."
            : "Solicitar turno"}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ClassItem;
