// Datos demo para el paquete básico de quinceañera
export const basicDemoData = {
  hero: {
    name: "Edana Ximena",
    subtitle: "¡Mis XV años!",
    backgroundImage: "/images/quince/encantada1.png"
  },
  
  event: {
    celebrant: "Edana Ximena",
    parents: {
      father: "SANTOS SANCHEZ PULIDO",
      mother: "NANCY R. COBA FLORES"
    },
    godparents: {
      godfather: "",
      godmother: "ANEL COBA FLORES"
    },
    date: {
      full: "Sábado 18 de Octubre 2025",
      day: "Sábado",
      date: "18 de Octubre 2025"
    },
    ceremony: {
      time: "17:00 hrs.",
      venue: "Parroquia San José",
      address: "Calle 3 Pte. 2, Área de los Pozos, 75010 San José Chiapa, Pue.",
      type: "Misa de Acción de Gracias",
      ubiLink: "https://maps.app.goo.gl/QxDwarXgZj6iQ3Ab8"
    },
    party: {
      time: "18:30 hrs.",
      venue: "Salón Social Finca de San José",
      address: "Calle 8 Pte. 106, Barrio de Sta Cruz, 75010 De Santa Cruz, Pue.",
      type: "Recepción",
      ubiLink: "https://maps.app.goo.gl/N6SUnMkGWecBS84j8"
    },
    dressCode: "Formal",
    restrictions: "No Niños"
  },

  countdown: {
    targetDate: "October 18, 2025 17:00:00",
    backgroundImage: "/images/countdown-bg.jpg"
  },

  attendance: {
    title: "CONFIRMACIÓN DE ASISTENCIA",
    message: "Respetuosamente <No Niños>",
    subtitle: "Espero que no sea impedimento para que ustedes puedan asistir a mi fiesta.",
    fields: {
      name: "Nombre completo",
      response: "¿Podrás acompañarme?",
      companions: "Nombre(s) de acompañante(s)",
      phone: "Número de celular",
      responseOptions: {
        yes: "¡Claro, ahí estaré!",
        no: "Lo siento, no podré asistir."
      }
    }
  },

  gifts: {
    title: "OPCIONES DE REGALO",
    message: "Mi mejor regalo es compartir contigo este gran día, si deseas obsequiarme algo, puedo sugerir las siguientes opciones:",
    options: [
      {
        icon: "💳",
        title: "Transferencia Bancaria",
        description: "BBVA Bancomer",
        details: "Cuenta: 1234567890\nCLABE: 012345678901234567\nA nombre de: Patricia Hernández López"
      },
      {
        icon: "🎁",
        title: "Mesa de Regalos",
        description: "Liverpool",
        details: "Evento: XV años Isabella\nCódigo: 51234567"
      },
      {
        icon: "💰",
        title: "Sobre con efectivo",
        description: "El día del evento",
        details: "Puedes entregarlo en la recepción"
      }
    ]
  },

  demo: {
    badge: "🎭 DEMO - Paquete Básico ($299)",
    description: "Esta es una demostración del paquete básico",
    features: [
      "Cuenta Regresiva",
      "Cuándo y dónde", 
      "Confirmación de asistencia",
      "Opciones de regalo",
      "Código de vestimenta"
    ],
    cta: {
      title: "¿Te gusta este paquete?",
      subtitle: "Incluye todas las características esenciales para tu evento",
      buttonText: "Contratar Paquete Básico - $299",
      link: "/#pricing"
    }
  }
}

export type BasicDemoData = typeof basicDemoData 