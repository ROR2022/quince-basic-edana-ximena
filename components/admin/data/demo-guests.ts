// 📋 DATOS DEMO PARA SISTEMA DE GESTIÓN DE INVITADOS
// Fecha: Agosto 11, 2025
// Descripción: Datos de ejemplo realistas para demostrar funcionalidades

import { Guest, InvitationType, GuestStatus } from '@/types/guest'

/**
 * Genera fechas relativas para hacer el demo más realista
 */
const getDemoDate = (daysAgo: number): Date => {
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  return date
}

/**
 * Datos demo de invitados con diferentes estados y escenarios realistas
 */
export const demoGuests: Guest[] = [
  // === INVITADOS CONFIRMADOS ===
  {
    id: 'demo_001',
    name: 'María González López',
    phone: '777-123-4567',
    email: 'maria.gonzalez@email.com',
    status: 'confirmed',
    companions: ['Juan González'],
    dateInvited: getDemoDate(10),
    dateResponded: getDemoDate(7),
    invitationCode: 'MGL001',
    invitationType: 'whatsapp',
    notes: 'Familiar cercana, confirmó inmediatamente',
    contactAttempts: 1,
    lastContactDate: getDemoDate(10)
  },
  {
    id: 'demo_002',
    name: 'Carlos Eduardo Ramírez',
    phone: '777-234-5678',
    email: 'carlos.ramirez@gmail.com',
    status: 'confirmed',
    companions: ['Ana Ramírez', 'Luis Ramírez'],
    dateInvited: getDemoDate(12),
    dateResponded: getDemoDate(9),
    invitationCode: 'CER002',
    invitationType: 'email',
    notes: 'Mejor amigo del novio, viene con familia',
    contactAttempts: 1,
    lastContactDate: getDemoDate(12)
  },
  {
    id: 'demo_003',
    name: 'Ana Sofía Martínez',
    phone: '777-345-6789',
    email: 'anita.martinez@hotmail.com',
    status: 'confirmed',
    companions: [],
    dateInvited: getDemoDate(8),
    dateResponded: getDemoDate(6),
    invitationCode: 'ASM003',
    invitationType: 'whatsapp',
    notes: 'Prima de la novia',
    contactAttempts: 1,
    lastContactDate: getDemoDate(8)
  },
  {
    id: 'demo_004',
    name: 'Roberto y Carmen Hernández',
    phone: '777-456-7890',
    email: 'rob.carmen@email.com',
    status: 'confirmed',
    companions: ['Roberto Jr. Hernández', 'Isabel Hernández'],
    dateInvited: getDemoDate(15),
    dateResponded: getDemoDate(13),
    invitationCode: 'RCH004',
    invitationType: 'manual',
    notes: 'Padrinos de la boda, familia muy cercana',
    contactAttempts: 1,
    lastContactDate: getDemoDate(15)
  },
  {
    id: 'demo_005',
    name: 'Patricia Jiménez Ruiz',
    phone: '777-567-8901',
    email: 'paty.jimenez@yahoo.com',
    status: 'confirmed',
    companions: ['Miguel Jiménez'],
    dateInvited: getDemoDate(6),
    dateResponded: getDemoDate(4),
    invitationCode: 'PJR005',
    invitationType: 'whatsapp',
    notes: 'Compañera de trabajo de la novia',
    contactAttempts: 1,
    lastContactDate: getDemoDate(6)
  },

  // === INVITADOS QUE DECLINARON ===
  {
    id: 'demo_006',
    name: 'Fernando Castillo García',
    phone: '777-678-9012',
    email: 'fernando.castillo@email.com',
    status: 'declined',
    companions: [],
    dateInvited: getDemoDate(11),
    dateResponded: getDemoDate(8),
    invitationCode: 'FCG006',
    invitationType: 'email',
    notes: 'No puede asistir por viaje de trabajo',
    contactAttempts: 1,
    lastContactDate: getDemoDate(11)
  },
  {
    id: 'demo_007',
    name: 'Lucía Morales Santos',
    phone: '777-789-0123',
    email: 'lucia.morales@gmail.com',
    status: 'declined',
    companions: [],
    dateInvited: getDemoDate(9),
    dateResponded: getDemoDate(7),
    invitationCode: 'LMS007',
    invitationType: 'whatsapp',
    notes: 'Problemas familiares, envió disculpas',
    contactAttempts: 1,
    lastContactDate: getDemoDate(9)
  },

  // === INVITADOS CON INVITACIÓN ENVIADA (PENDIENTES DE RESPUESTA) ===
  {
    id: 'demo_008',
    name: 'Diego Alejandro Vargas',
    phone: '777-890-1234',
    email: 'diego.vargas@email.com',
    status: 'invited',
    companions: [],
    dateInvited: getDemoDate(5),
    invitationCode: 'DAV008',
    invitationType: 'whatsapp',
    notes: 'Amigo de la universidad, aún no responde',
    contactAttempts: 2,
    lastContactDate: getDemoDate(2)
  },
  {
    id: 'demo_009',
    name: 'Gabriela Torres Mendoza',
    phone: '777-901-2345',
    email: 'gaby.torres@hotmail.com',
    status: 'invited',
    companions: [],
    dateInvited: getDemoDate(4),
    invitationCode: 'GTM009',
    invitationType: 'email',
    notes: 'Vecina de la familia',
    contactAttempts: 1,
    lastContactDate: getDemoDate(4)
  },
  {
    id: 'demo_010',
    name: 'Familia Sánchez Pérez',
    phone: '777-012-3456',
    email: 'familia.sanchez@email.com',
    status: 'invited',
    companions: [],
    dateInvited: getDemoDate(3),
    invitationCode: 'FSP010',
    invitationType: 'manual',
    notes: 'Amigos de los padres, invitación entregada en persona',
    contactAttempts: 1,
    lastContactDate: getDemoDate(3)
  },
  {
    id: 'demo_011',
    name: 'Jorge Luis Mendoza',
    phone: '777-123-4567',
    email: 'jorge.mendoza@gmail.com',
    status: 'invited',
    companions: [],
    dateInvited: getDemoDate(6),
    invitationCode: 'JLM011',
    invitationType: 'whatsapp',
    notes: 'Compañero del gimnasio',
    contactAttempts: 1,
    lastContactDate: getDemoDate(6)
  },

  // === INVITADOS PENDIENTES (SIN INVITAR AÚN) ===
  {
    id: 'demo_012',
    name: 'Verónica Gutiérrez Silva',
    phone: '777-234-5678',
    email: 'vero.gutierrez@yahoo.com',
    status: 'pending',
    companions: [],
    dateInvited: new Date(), // Fecha actual como placeholder
    invitationCode: 'VGS012',
    invitationType: 'whatsapp',
    notes: 'Esperando confirmación de disponibilidad antes de enviar',
    contactAttempts: 0
  },
  {
    id: 'demo_013',
    name: 'Familia Rodríguez López',
    phone: '777-345-6789',
    email: 'rodriguez.familia@email.com',
    status: 'pending',
    companions: [],
    dateInvited: new Date(),
    invitationCode: 'FRL013',
    invitationType: 'email',
    notes: 'Pendiente de obtener email actualizado',
    contactAttempts: 0
  },
  {
    id: 'demo_014',
    name: 'Alejandro Cruz Moreno',
    phone: '777-456-7890',
    email: 'alex.cruz@gmail.com',
    status: 'pending',
    companions: [],
    dateInvited: new Date(),
    invitationCode: 'ACM014',
    invitationType: 'whatsapp',
    notes: 'Amigo del trabajo, pendiente de confirmación de asistencia',
    contactAttempts: 0
  },
  {
    id: 'demo_015',
    name: 'Sandra Patricia Villa',
    phone: '777-567-8901',
    email: 'sandra.villa@hotmail.com',
    status: 'pending',
    companions: [],
    dateInvited: new Date(),
    invitationCode: 'SPV015',
    invitationType: 'manual',
    notes: 'Pendiente de visita para entrega personal',
    contactAttempts: 0
  },

  // === CASOS ESPECIALES PARA DEMO ===
  {
    id: 'demo_016',
    name: 'Dr. Miguel Ángel Ramos',
    phone: '777-678-9012',
    email: 'dr.ramos@hospital.com',
    status: 'confirmed',
    companions: ['Dra. Elena Ramos'],
    dateInvited: getDemoDate(14),
    dateResponded: getDemoDate(12),
    invitationCode: 'MAR016',
    invitationType: 'email',
    notes: 'Médico de la familia, muy importante su presencia',
    contactAttempts: 1,
    lastContactDate: getDemoDate(14)
  },
  {
    id: 'demo_017',
    name: 'Los Abuelos García',
    phone: '777-789-0123',
    email: '',
    status: 'confirmed',
    companions: [],
    dateInvited: getDemoDate(20),
    dateResponded: getDemoDate(18),
    invitationCode: 'LAG017',
    invitationType: 'manual',
    notes: 'Abuelos de la novia, sin email, invitación personal',
    contactAttempts: 1,
    lastContactDate: getDemoDate(20)
  },
  {
    id: 'demo_018',
    name: 'Equipo de Trabajo - Marketing',
    phone: '777-890-1234',
    email: 'team.marketing@empresa.com',
    status: 'invited',
    companions: [],
    dateInvited: getDemoDate(2),
    invitationCode: 'ETM018',
    invitationType: 'email',
    notes: 'Invitación grupal para el equipo de trabajo',
    contactAttempts: 1,
    lastContactDate: getDemoDate(2)
  }
]

/**
 * Resumen estadístico de los datos demo
 */
export const demoStats = {
  total: demoGuests.length,
  confirmed: demoGuests.filter(g => g.status === 'confirmed').length,
  declined: demoGuests.filter(g => g.status === 'declined').length,
  invited: demoGuests.filter(g => g.status === 'invited').length,
  pending: demoGuests.filter(g => g.status === 'pending').length,
  totalPeople: demoGuests
    .filter(g => g.status === 'confirmed')
    .reduce((sum, guest) => sum + 1 + guest.companions.length, 0)
}

/**
 * Plantillas de invitación para diferentes tipos
 */
export const invitationTemplates = {
  whatsapp: {
    basic: `🎉 ¡Estás invitado/a a nuestra boda! 💒

📅 Fecha: [FECHA]
🕐 Hora: [HORA]
📍 Lugar: [LUGAR]

Tu código de confirmación es: *[CODIGO]*

Confirma tu asistencia aquí: [LINK]

¡Esperamos verte en nuestro día especial! 💕

[NOMBRES]`,
    
    formal: `Estimado/a [NOMBRE],

Nos complace invitarte a celebrar nuestro matrimonio.

📅 Ceremonia: [FECHA] a las [HORA]
📍 Lugar: [LUGAR]

Para confirmar tu asistencia, por favor usa el código: [CODIGO]
Link de confirmación: [LINK]

Con cariño,
[NOMBRES]`
  },
  
  email: {
    subject: 'Invitación a nuestra boda 💒 - [NOMBRES]',
    body: `<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="text-align: center; margin-bottom: 30px;">
      <h1 style="color: #8B5CF6;">¡Nos Casamos!</h1>
      <h2 style="color: #666;">[NOMBRES]</h2>
    </div>
    
    <div style="background: #f8fafc; padding: 20px; border-radius: 10px; margin: 20px 0;">
      <h3 style="color: #8B5CF6; margin-top: 0;">Detalles del Evento</h3>
      <p><strong>📅 Fecha:</strong> [FECHA]</p>
      <p><strong>🕐 Hora:</strong> [HORA]</p>
      <p><strong>📍 Lugar:</strong> [LUGAR]</p>
    </div>
    
    <div style="text-align: center; margin: 30px 0;">
      <p><strong>Tu código de confirmación:</strong></p>
      <div style="background: #8B5CF6; color: white; padding: 15px; border-radius: 5px; font-size: 24px; font-weight: bold; letter-spacing: 2px;">
        [CODIGO]
      </div>
    </div>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="[LINK]" style="background: #8B5CF6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
        Confirmar Asistencia
      </a>
    </div>
    
    <p style="text-align: center; color: #666; margin-top: 40px;">
      ¡Esperamos compartir este momento especial contigo!
    </p>
  </div>
</body>
</html>`
  }
}

/**
 * Configuraciones demo para diferentes escenarios
 */
export const demoScenarios = {
  boda: {
    eventName: 'Boda de Ana & Carlos',
    date: '8 de Junio 2024',
    time: '16:00 hrs',
    venue: 'Hacienda Los Pinos',
    expectedGuests: 80,
    description: 'Celebración de matrimonio con familia y amigos cercanos'
  },
  
  cumpleanos: {
    eventName: 'Cumpleaños de María',
    date: '15 de Agosto 2024',
    time: '19:00 hrs',
    venue: 'Salón de Fiestas El Jardín',
    expectedGuests: 50,
    description: 'Celebración de cumpleaños número 30'
  },
  
  quinceanos: {
    eventName: 'XV Años de Isabella',
    date: '20 de Septiembre 2024',
    time: '18:00 hrs',
    venue: 'Salón Crystal',
    expectedGuests: 120,
    description: 'Celebración de quince años'
  }
}

/**
 * Mensajes predefinidos para diferentes situaciones
 */
export const demoMessages = {
  confirmationSuccess: [
    '¡Excelente! Tu confirmación ha sido registrada. ¡Te esperamos!',
    'Gracias por confirmar. ¡Será un día increíble!',
    'Confirmación recibida. ¡No podemos esperar a verte!',
    '¡Perfecto! Ya estás en nuestra lista. ¡Nos vemos pronto!'
  ],
  
  reminderMessages: [
    'Hola [NOMBRE], ¿ya pudiste revisar nuestra invitación? ¡Esperamos tu confirmación!',
    'Recordatorio amigable: ¿podrás acompañarnos en nuestro día especial?',
    'Hola [NOMBRE], nos encantaría saber si podrás estar con nosotros. ¡Confirma cuando puedas!'
  ],
  
  thankYouMessages: [
    'Gracias por formar parte de nuestro día especial ❤️',
    'Tu presencia hará nuestro día aún más especial 🎉',
    'No podríamos imaginar este día sin ti 💕'
  ]
}

/**
 * Función para obtener datos demo con fechas actualizadas
 */
export function getUpdatedDemoGuests(): Guest[] {
  return demoGuests.map(guest => ({
    ...guest,
    // Actualizar fechas para que sean relativas a hoy
    dateInvited: guest.status === 'pending' ? new Date() : guest.dateInvited,
    // Asegurar que las fechas de respuesta sean posteriores a las de invitación
    dateResponded: guest.dateResponded && guest.status !== 'pending' 
      ? new Date(guest.dateInvited.getTime() + (1000 * 60 * 60 * 24 * Math.random() * 3))
      : guest.dateResponded
  }))
}

/**
 * Función para generar invitados aleatorios adicionales (para testing)
 */
export function generateRandomGuests(count: number): Guest[] {
  const nombres = [
    'Alberto Mendoza', 'Beatriz Flores', 'César Romero', 'Diana Castillo',
    'Eduardo Silva', 'Fernanda Torres', 'Gonzalo Ruiz', 'Helena Vargas',
    'Ignacio Morales', 'Juana Jiménez', 'Kevin Santos', 'Leticia Herrera'
  ]
  
  // apellidos - no usado actualmente pero disponible para futuras expansiones
  const _apellidos = ['García', 'Rodríguez', 'Martínez', 'López', 'González', 'Pérez']
  const statuses: GuestStatus[] = ['pending', 'invited', 'confirmed', 'declined']
  const types: InvitationType[] = ['whatsapp', 'email', 'manual']
  
  return Array.from({ length: count }, (_, index) => {
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    const name = nombres[Math.floor(Math.random() * nombres.length)]
    
    return {
      id: `random_${Date.now()}_${index}`,
      name,
      phone: `777-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`,
      email: `${name.toLowerCase().replace(' ', '.')}@email.com`,
      status,
      companions: Math.random() > 0.7 ? [`Acompañante de ${name.split(' ')[0]}`] : [],
      dateInvited: getDemoDate(Math.floor(Math.random() * 15)),
      dateResponded: status === 'confirmed' || status === 'declined' 
        ? getDemoDate(Math.floor(Math.random() * 10)) 
        : undefined,
      invitationCode: `RND${String(index).padStart(3, '0')}`,
      invitationType: types[Math.floor(Math.random() * types.length)],
      notes: `Invitado generado automáticamente para testing`,
      contactAttempts: Math.floor(Math.random() * 3),
      lastContactDate: Math.random() > 0.5 ? getDemoDate(Math.floor(Math.random() * 5)) : undefined
    }
  })
}

export default demoGuests
