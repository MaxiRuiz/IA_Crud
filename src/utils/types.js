// src/utils/types.js
// Se define la estructura esperada de los datos, el contrato de la API y el estado inicial.

// --------------------------------------------------------
// 1. DEFINICIÓN DE COLUMNAS (Para el Header de la Tabla)
// --------------------------------------------------------

export const TABLE_COLUMNS = [
    { key: 'id', title: 'ID' },
    { key: 'apellido', title: 'Apellido' },
    { key: 'nombre', title: 'Nombre' },
    { key: 'fecha_nacimiento', title: 'Fecha Nacimiento' },
    { key: 'email', title: 'Email' },
    { key: 'domicilio', title: 'Domicilio' },
    { key: 'ciudad', title: 'Ciudad' },
    { key: 'provincia', title: 'Provincia' },
    { key: 'telefono', title: 'Teléfono' },
    { key: 'dni', title: 'DNI' },
    { key: 'nacionalidad', title: 'Nacionaldiad' },

];

// Define la estructura de un registro en el historial de interacciones.
export const HistoryItem = {
    id: 0,
    timestamp: new Date().toISOString(),
    prompt: '',
    sql: '',
};

// --------------------------------------------------------
// 2. ESTRUCTURA DE RESPUESTA DE N8N/API (El contrato de datos)
// --------------------------------------------------------

/*
 Definimos la estructura que esperaremos de n8n para actualizar el estado.
 status: 'success' | 'error' | 'loading'
 message: Mensaje conversacional para el usuario.
 data: [Array de objetos DataRow]
*/
export const INITIAL_STATE = {
    
    data: [], 
    
    // CORRECCIÓN 2: Usar 'status' en lugar de 'estado' para coincidir con useDataState.js.
    status: 'idle', // 'idle' (inactivo), 'loading', 'success', 'error'
    
    message: 'Bienvenido. El Agente CRUD-IA está listo para recibir tu solicitud.',
    
    // El historial es correcto (es un array de objetos)
    history: [ 
        { 
            id: 1, 
            timestamp: new Date().toLocaleTimeString(), 
            prompt: 'Bienvenido. El historial se mostrará aquí.', 
            sql: 'SELECT * FROM welcome_table'
        }
    ]
};