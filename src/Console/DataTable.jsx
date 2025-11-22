//  src/Console/DataTable.jsx
//  Este componente es reutilizable y dumb (solo renderiza). 
//  Recibe el arreglo de datos como una propiedad (data) y los nombres de las columnas como otra propiedad (columns).
//  Se puede usar el mismo DataTable para: Usuarios, Productos, Pedidos, Logs del sistema, etc.
//  Simplemente se cambia qué se le pasa en columns.



import React from 'react';

// El componente recibe 'data' (el array de registros) y 'columns' (la definición de cabeceras)
const DataTable = ({ data, columns }) => {
    
    // Si no hay datos (por ejemplo, después de un DELETE), mostramos un mensaje.
    if (!data || data.length === 0) {
        return <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
            No hay registros para mostrar. Solicite una consulta SELECT.
        </div>;
    }

    return (
        <div className="data-table-container">
            {/* El título se renderizará fuera de este componente, en Console.jsx, para ser más flexible */}
            
            <table className="result-table">
                {/* CABECERA DE LA TABLA */}
                <thead>
                    <tr>
                        {/* Iteramos sobre las columnas definidas en types.js */}
                        {columns.map(col => (
                            // Usamos col.key como key de React y col.title como texto visible
                            <th key={col.key}>{col.title}</th>
                        ))}
                    </tr>
                </thead>
                
                {/* CUERPO DE LA TABLA */}
                <tbody>
                    {/* Iteramos sobre cada registro de datos */}
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {/* Iteramos sobre las columnas para obtener el valor de cada celda */}
                            {columns.map(col => (
                                // Accedemos al valor de la propiedad usando col.key
                                <td key={`${rowIndex}-${col.key}`}>
                                    {row[col.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;