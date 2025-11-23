// src/Console/PromptInput.jsx
//  Componente que maneja el área de texto y llama a la función de envío de nuestro hook.

import React, { useState } from 'react';

/**
 * Componente que maneja el campo de texto y el botón de envío.
 * @param {function} onSubmit - Función que se ejecuta al presionar "Solicitar".
 * @param {boolean} isLoading - Indica si la aplicación está esperando una respuesta de n8n.
 */
const PromptInput = ({ onSubmit, isLoading }) => {
    // Estado local para el texto dentro del textarea
    const [promptText, setPromptText] = useState('');

    // Función para manejar el envío
    const handleSubmit = (e) => {
        e.preventDefault(); // Evita el comportamiento por defecto de submit del formulario (si lo hubiera)

        // Llamamos a la función prop que viene de Console.jsx, pasándole el texto actual
        onSubmit(promptText);

        // Opcional: Limpiar el campo después del envío
        // setPromptText(''); 
    };


    return (
        <form onSubmit={handleSubmit} className="input-area">
            {/* Campo de texto (Textarea) */}
            <textarea
                placeholder="Escribe aquí tu solicitud conversacional al Agente (ej: 'Inserta un nuevo cliente con nombre Juan Pérez')"
                rows="1"
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)} // Actualiza el estado local al escribir
                onFocus={(e) => e.target.select()}   // Se selecciona todo el texto del textarea al hacer foco
                disabled={isLoading} // Deshabilita si está cargando
            />

            {/* Botón de envío */}
            <button
                type="submit"
                className="settings-btn"
                style={{ backgroundColor: 'var(--accent-blue)', height: '50px' }}
                disabled={isLoading} // Deshabilita si está cargando
            >
                {/* Muestra un mensaje diferente si está cargando */}
                {isLoading ? 'Cargando...' : 'Solicitar 🚀'}
            </button>
        </form>
    );
};

export default PromptInput;