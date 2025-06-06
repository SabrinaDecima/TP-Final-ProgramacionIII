import { useEffect, useState } from "react";

const Historical = ({ id }) => {
  const [historicalData, setHistoricalData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/users/${id}/classes`)
      .then((res) => res.json())
      .then((data) => {
        setHistoricalData(data.classes);
        // Aquí podrías manejar los datos obtenidos del histórico
      })
      .catch((err) => console.error('Error fetching historical data:', err));
  }, [])
  return (
    <>
      <div className="mt-4">
        <h3 className="text-center mb-4">Estas inscripto en las siguientes clases:</h3>
        {historicalData.length > 0 ? (
          <ul className="list-group">
            {historicalData.map((item) => (
              <li key={item.id} className="list-group-item">
                <strong>{item.name}</strong>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">No hay clases en el historial.</p>
        )}
      </div>
    </>
  );
};

export default Historical;
