// src/services/n8nApi.js
//  Este módulo contiene la función que realiza la llamada fetch al Webhook de n8n.

// URL real de tu Webhook de n8n. ¡REEMPLAZA ESTO!

// const N8N_WEBHOOK_URL = "http://localhost:5678/webhook-test/crud-ia"; 
  const N8N_WEBHOOK_URL = "http://localhost:5678/webhook/crud-ia";
/**
 * Función para enviar el prompt (solicitud conversacional) a n8n.
 * @param {string} promptText - El texto ingresado por el usuario (ej: "Selecciona todos los clientes").
 * @returns {Promise<object>} - Retorna la respuesta JSON del nodo "Respond to Webhook" de n8n.
 */
export async function sendAIAssistantRequest(promptText) {
    
    try {
        const response = await fetch(N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                // Indicamos que estamos enviando JSON
                'Content-Type': 'application/json',
            },
            // El cuerpo de la petición es un objeto JSON que contiene el prompt del usuario
            body: JSON.stringify({ 
                prompt: promptText 
            }),
        });

        // Verificamos si la respuesta HTTP fue exitosa (código 200-299)
        if (!response.ok) {
            // Si hay un error HTTP (ej: 404, 500), lanzamos un error.
            throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
        }

        // Parseamos la respuesta a JSON.
        const responseData = await response.json();
        
        // El workflow de n8n debe retornar un objeto con esta estructura:
        // { success: boolean, message: string, data: array }
        return responseData; 

    } catch (error) {
        console.error('Error al conectar con n8n:', error);
        
        // Devolvemos una estructura de error estándar para manejarla en el hook.
        return { 
            success: false, 
            message: `Fallo en la comunicación con n8n. Detalles: ${error.message}`, 
            data: [] 
        };
    }
}