// src/components/HistoryPanel.jsx
import React from 'react';

/**
 * Muestra el historial de prompts del usuario y el SQL generado por el agente.
 * // Se utiliza la desestructuración con un valor por defecto: { history = [] }
 */
const HistoryPanel = ({ history = []}) => {
    return (
        <div className="history-panel">
            <h3>📜 Historial de Interacciones</h3>
            <div className="history-list">
                {history.map((item) => (
                    <div key={item.id} className="history-item">
                        
                        {/* 1. Prompt del Usuario (Izquierda) */}
                        <div className="history-prompt">
                            <strong>Usuario ({item.timestamp}):</strong>
                            <p>{item.prompt}</p>
                        </div>
                        
                        {/* 2. SQL del Agente (Derecha) */}
                        <div className="history-sql">
                            <strong>SQL Generado:</strong>
                            {/* Mostramos el SQL en un formato de código */}
                            <pre><code>{item.sql}</code></pre>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HistoryPanel;