// Using native fetch...

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzAoSwHGAvkIedKHg3Bcg17VXrsFk2Ggo-lfdZZb9LAPWIn1x0fFs1TItMwtmjMnztbKQ/exec';

async function testCalendar() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(tomorrow.getHours() + 1);

  const data = {
    name: 'Gemini Test User',
    email: 'test@example.com',
    phone: '5491100000000',
    message: 'Prueba de integración con Google Calendar desde script local.',
    appointmentDate: tomorrow.toISOString(),
    timestamp: new Date().toISOString(),
    fecha: new Date().toLocaleDateString('es-AR'),
    hora: new Date().toLocaleTimeString('es-AR'),
    source: 'Test Script'
  };

  console.log('Enviando datos al webhook...', JSON.stringify(data, null, 2));

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      // En Node.js node-fetch no usa mode: "no-cors", 
      // y si es un webhook de Apps Script a veces conviene permitir seguir los redirects.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const resultText = await response.text();
    console.log('Status:', response.status);
    console.log('Respuesta del servidor:', resultText);
  } catch (error) {
    console.error('Error enviando la petición:', error);
  }
}

testCalendar();
