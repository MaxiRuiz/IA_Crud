// src/components/StatusMessage.jsx
//  Este componente renderiza la barra de estado con el color (clase CSS) apropiado según el status que reciba (loading, success, error).

import React from 'react';

// El componente recibe 'status' (el tipo de estado) y 'message' (el texto a mostrar)
const StatusMessage = ({ status, message }) => {

    // Función para mapear el estado (ej: 'success') a la clase CSS (ej: 'status-success')
    const getStatusClass = (currentStatus) => {
        switch (currentStatus) {
            case 'loading':
                return 'status-loading';
            case 'success':
                return 'status-success';
            case 'error':
                return 'status-error';
            default:
                return 'status-loading'; // 'idle' (inactivo) o cualquier otro estado. No mostramos la barra.
                return null;
        }
    };

    const statusClass = getStatusClass(status);

    // Si el estado es 'idle' o no reconocido, no renderizamos nada (return null)
    if (!statusClass) {
        return null;
    }

    // Se define el icono y el prefijo del mensaje según el estado
    let icon = '';
    let prefix = '';

    if (status === 'loading') {
        icon = '⏳';
        prefix = 'Procesando...';
    } else if (status === 'warning') {
        icon = '⚠️';
        prefix = '¡Consulta incomprendida:';
    } else if (status === 'success') {
        icon = '✅';
        prefix = '¡Operación Exitosa!';
    } else if (status === 'error') {
        icon = '❌';
        prefix = 'Error de Agente:';
    }

    return (
        // La barra de estado se renderizará con la clase CSS correspondiente
        <div className={`status-bar ${statusClass}`}>
            {icon} **{prefix}** {message}
        </div>
    );
};

export default StatusMessage;