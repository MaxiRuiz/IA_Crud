// src/components/Button.jsx
//  Componente dumb (tonto) que simplemente encapsula el estilo de los botones.

import React from 'react';

// El botón recibe 'children' (el texto o icono dentro), y 'onClick' (la función a ejecutar)
const Button = ({ children, onClick, className = '' }) => {
    // Usamos el className 'settings-btn' que definimos en styles.css 
    // y permitimos un className adicional para flexibilidad.
    return (
        <button 
            onClick={onClick} 
            className={`settings-btn ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;