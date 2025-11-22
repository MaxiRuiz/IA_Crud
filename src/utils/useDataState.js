// src/utils/useDataState.js

import { useState } from 'react';
import { INITIAL_STATE } from './types';
import { sendAIAssistantRequest } from '../services/n8nApi';

/**
 * Hook personalizado para manejar el estado completo de la Consola de Datos.
 * - data: Los registros mostrados en la tabla.
 * - status: Estado actual ('idle', 'loading', 'success', 'error').
 * - message: Mensaje de feedback para el usuario.
 * - history: Historial de interacciones (prompt y SQL).
 */
export const useDataState = () => {
    // Definimos el estado usando el estado inicial que creamos en types.js
    const [state, setState] = useState(INITIAL_STATE);

    /**
     * Función principal que se llama cuando el usuario envía un prompt.
     * @param {string} promptText - La solicitud conversacional.
     */
    const handlePromptSubmit = async (promptText) => {

        // 1. Validar el input
        if (!promptText.trim()) {
            setState(prevState => ({
                ...prevState,
                status: 'error',
                message: 'No puedes enviar una solicitud vacía. Intenta, por ejemplo: "Selecciona los 3 clientes más antiguos".'
            }));
            return;
        }

        // 2. Iniciar el estado de Carga
        setState(prevState => ({
            ...prevState,
            status: 'loading',
            message: 'Enviando solicitud al Agente IA/n8n. Por favor, espera...'
        }));

        // 3. Llamar al servicio de n8n
        const result = await sendAIAssistantRequest(promptText);

        // --- Punto de Debug ---
        console.log("--- DATOS RECIBIDOS DE N8N ---");
        console.log("Éxito:", result.success);
        console.log("Mensaje:", result.message);
        console.log("Datos para la tabla:", result.data);
        console.log("Consulta SQL (esperada):", result.sqlQuery); // Revisa si n8n te envía la consulta SQL aquí
        console.log("------------------------------");

        // 4. Obtener la consulta SQL generada.
        // Asumimos que n8n devuelve la consulta SQL limpia en 'result.sqlQuery' o similar.
        const generatedSQL = result.sqlQuery || 'Consulta no disponible en la respuesta n8n';


        // 5. Actualizar el estado según el resultado
        if (result.success) {

            // 5a. Crear el nuevo ítem de historial
            const newHistoryItem = {
                id: Date.now(),
                timestamp: new Date().toLocaleTimeString(),
                prompt: promptText,
                sql: generatedSQL,
            };

            // 5b. Actualizar el estado con los nuevos datos y el historial
            setState(prevState => ({
                ...prevState, // Mantiene todas las propiedades anteriores (incluyendo history)

                // Si hay data, la usa; si no (ej: INSERT), mantiene la data previa
                data: result.data && result.data.length > 0 ? result.data : prevState.data,
                status: 'success',
                message: result.message,

                // CRÍTICO: Añadir el nuevo ítem al principio del historial y limitar a 10
                history: [newHistoryItem, ...prevState.history].slice(0, 10),
            }));

        } else {
            // 5c. Manejo de error - Mantiene el historial y datos existentes
            setState(prevState => ({
                ...prevState,
                status: 'error',
                message: result.message || 'Error desconocido en la conexión o en el flujo n8n.',
                history: Array.isArray(prevState.history) ? prevState.history : []

            }));
        }
    };

    // El hook retorna el estado actual y la función para cambiarlo
    return {
        data: state.data,
        status: state.status,
        message: state.message,
        // Garantiza que 'history' siempre devuelva un array (Solución de seguridad)
        history: Array.isArray(state.history) ? state.history : [],
        handlePromptSubmit,
    };
};