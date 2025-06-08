// src/context/ClassesReservedContext.jsx
import { createContext, useState } from 'react';

const ClassesReservedContext = createContext();

export const ClassesReservedProvider = ({ children }) => {
    // Estado para mantener las clases reservadas por día
    const [classesPerDay, setClassesPerDay] = useState({});

    // Función para actualizar las clases reservadas por día
    const updateClassesPerDay = (classes) => {
        const classesByDate = {};
        classes.forEach((clase) => {
            const date = new Date(clase.date).toLocaleDateString(); // Formato DD/MM/YYYY
            classesByDate[date] = true;
        });
        setClassesPerDay(classesByDate);
    };

    return (
        <ClassesReservedContext.Provider value={{ classesPerDay, updateClassesPerDay }}>
            {children}
        </ClassesReservedContext.Provider>
    );
};

export default ClassesReservedContext;