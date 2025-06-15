import { createContext, useState } from "react";

export const GlobalDataContext = createContext();

export const GlobalDataProvider = ({ children }) => {
    const [historialVisits, setHistorialVisits] = useState(0);
    const [clasesVisits, setClasesVisits] = useState(0);
    const [pagosVisits, setPagosVisits] = useState(0);

    const incrementHistorialVisit = () => setHistorialVisits((prev) => prev + 1);
    const incrementClasesVisit = () => setClasesVisits((prev) => prev + 1);
    const incrementPagosVisit = () => setPagosVisits((prev) => prev + 1);

    return (
        <GlobalDataContext.Provider value={{
            // Contadores
            historialVisits,
            clasesVisits,
            pagosVisits,

            // Funciones
            incrementHistorialVisit,
            incrementClasesVisit,
            incrementPagosVisit,
        }}>
            {children}
        </GlobalDataContext.Provider>
    );
};