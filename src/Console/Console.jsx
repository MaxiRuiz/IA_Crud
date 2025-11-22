// src/Console/Console.jsx
//  El componente Console.jsx se usa para probar la DataTable con los datos de ejemplo.
//  Ahora Conecta el hook (useDataState) con el DataTable, el PromptInput y el StatusMessage.


import React from 'react';

// Importamos los nuevos componentes modulares
import Header from '../components/Header'; 
import StatusMessage from '../components/StatusMessage';

// Importamos el componente de la tabla y los tipos de datos
import DataTable from './DataTable';
import PromptInput from './PromptInput'; // Importamos el componente de Input
import { TABLE_COLUMNS } from '../utils/types';

import HistoryPanel from '../components/HistoryPanel'; // Importamos el nuevo componente

import { useDataState } from '../utils/useDataState'; // Importamos nuestro HOOK

// Función dummy para simular el click en Configuración (luego la implementaremos)
const handleSettingsClick = () => {
    alert("Ventana de Configuración de n8n/Agente abierta. (To-Do)");
};


const Console = () => {
    // 1. Usamos el HOOK: Aquí se maneja todo el estado (datos, status, mensajes)
    // Desestructuramos el campo 'history'    
    const { data, status, message, history, handlePromptSubmit } = useDataState();

    // Bandera para deshabilitar el input si estamos esperando la respuesta
    const isLoading = status === 'loading';

    
    return (
        <div className="app-container">
            {/* 1. HEADER MODULAR */}
            <Header onSettingsClick={handleSettingsClick} />

            {/* 2. ÁREA CENTRAL: TABLA DE DATOS */}
            <div className="main-content">
                <div className="data-table-container">
                    <div className="table-title">
                        
                        {/* Muestra cuántos registros hay en el estado actual */}
                        {`Última Consulta (Tabla Personas) - Mostrando ${data.length} registros`}
                    </div>
                    
                    {/* Renderizamos la DataTable con los datos del hook */}
                    <DataTable 
                        data={data} 
                        columns={TABLE_COLUMNS} 
                    />
                </div>
            </div>

            {/* 3. FOOTER/INPUT BAR) */}
            <div className="input-bar">

                {/* 3.1 PROMPT INPUT MODULAR */}
                {/* Le pasamos la función de envío y la bandera de carga al Input */}
                <PromptInput 
                    onSubmit={handlePromptSubmit} 
                    isLoading={isLoading}
                />
                
                {/* 3.2 BARRA DE ESTADO MODULAR */}
               {/* StatusMessage se alimenta directamente del 'status' y 'message' del hook */}
                <StatusMessage 
                    status={status} 
                    message={message}
                />

            </div>

            {/* 4. PANEL DE HISTORIAL (Nueva sección al final) */}
            <HistoryPanel history={history} />

        </div>
    );
};

export default Console;