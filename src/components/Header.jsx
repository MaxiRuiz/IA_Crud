// src/components/Header.jsx
//  Encapsularemos la cabecera, incluyendo el botón de configuración de Button.jsx.

import React from 'react';
import Button from './Button'; // Importamos el componente Button

// El Header recibe una función prop 'onSettingsClick' para manejar el botón de configuración
const Header = ({ onSettingsClick }) => {
    return (
        <div className="header">
            <h1>✨ Aura AI Data Console</h1>
            
            {/* Usamos nuestro componente Button */}
            <Button onClick={onSettingsClick}>
                ⚙️ Conexión n8n/Agente
            </Button>
        </div>
    );
};

export default Header;