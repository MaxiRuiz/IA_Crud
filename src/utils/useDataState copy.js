// src/utils/useDataState.js

//   useDataState es un hook personalizado.
//  Es el encargado de manejar el estado de la aplicación y de interactuar con el servicio de n8n.

import { useState } from 'react';
import { INITIAL_STATE } from './types';
import { sendAIAssistantRequest } from '../services/n8nApi';

/**
 * Hook personalizado para manejar el estado completo de la Consola de Datos.
 * - data: Los registros mostrados en la tabla.
 * - status: Estado actual ('idle', 'loading', 'success', 'error').
 * - message: Mensaje de feedback para el usuario.
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

        //  Punto de Debug, para inspeccionar los datos recibidos de n8n
        console.log("--- DATOS RECIBIDOS DE N8N ---");
        console.log("Éxito:", result.success);
        console.log("Mensaje:", result.message);
        console.log("Datos para la tabla:", result.data);
        console.log("------------------------------");
        
        // 4. Obtener SQL y PARAMS (Asumimos que n8n devuelve sqlQuery en el mensaje si es un SELECT)
        // **IMPORTANTE: Si n8n devuelve la consulta SQL en una clave separada (ej. result.sqlQuery), úsala aquí.**
        // Por ahora, para simplificar, usaremos un valor por defecto o la pondremos en el mensaje.
        const generatedSQL = result.message.includes("SELECT") ? "SELECT fue generado" : "Consulta no generada (INSERT/UPDATE/DELETE)";
        
        // Asumiendo que n8n devuelve la consulta SQL generada en 'result.sqlQuery' o similar:
        const n8nSQL = result.sqlQuery || generatedSQL;


        // 5. Actualizar el estado según el resultado
        if (result.success) {
            // Si n8n responde con éxito

            const newHistoryItem = {
                id: Date.now(),
                // Usamos toLocaleTimeString para un formato legible en el historial
                timestamp: new Date().toLocaleTimeString(), 
                prompt: promptText,
                sql: generatedSQL, 
            };


            setState({
                // Mantener los datos existentes si la nueva data está vacía (ej: un INSERT exitoso)
                data: result.data && result.data.length > 0 ? result.data : state.data, 
                status: 'success',
                message: result.message, // El mensaje viene de n8n
                history: [newHistoryItem, ...prevState.history].slice(0, 10) // Limitar a 10 ítems

            });
        } else {
            // Si n8n responde con un error
            setState(prevState => ({
                ...prevState, // Mantenemos los datos de la tabla visibles en caso de error
                // Usamos la nueva data si existe, o mantenemos la previa
                data: result.data && result.data.length > 0 ? result.data : prevState.data,
                status: 'error',
                message: result.message, // El mensaje de error viene de n8n
            }));
        }
    };
    
    // El hook retorna el estado actual y la función para cambiarlo
    return {
        data: state.data,
        status: state.status,
        message: state.message,
        history: state.history,
        handlePromptSubmit,
    };
};