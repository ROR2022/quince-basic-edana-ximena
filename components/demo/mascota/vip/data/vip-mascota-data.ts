// Modelo de datos para el Demo VIP de Mascotas (Perro-Gato)
// Este archivo contiene toda la información necesaria para las distintas secciones del demo

// Tipos de datos
export interface Pet {
  id: string
  name: string
  type: 'dog' | 'cat' | 'other'
  age: number
  breed: string
  photo: string
  description: string
  personality: string[]
  favorites: {
    food: string
    toy: string
    activity: string
  }
}

export interface EventLocation {
  name: string
  address: string
  city: string
  coordinates: {
    lat: number
    lng: number
  }
  googleMapsUrl: string
  image: string
  features: string[]
  petPolicy: string
  parking: {
    options: {
      name: string
      details: string
    }[]
    instructions: string
    valet?: string
  }
}

export interface EventDetails {
  title: string
  subtitle: string
  date: string // ISO format
  time: string
  theme: string
  location: EventLocation
  dresscode: string
  notes: string
  rsvpDeadline?: string
  contactEmail?: string
  contactPhone?: string
  schedule: {
    time: string
    title: string
    description?: string
  }[]
  food: {
    human: {
      type: string
      options: string[]
    }[]
    pets: {
      petType: 'dog' | 'cat' | 'both'
      options: string[]
    }[]
    drinks?: string[]
  }
  dressCode: string
  dressSuggestions: {
    humanColors: string[]
    humanStyle: string
    petAccessories: string[]
    petStyle: string
    additional: string[]
  }
  importantInfo: {
    pets: string[]
    humans: string[]
  }
  emergencyContacts: {
    name: string
    role: string
    phone: string
  }[]
}

export interface ItineraryItem {
  time: string
  title: string
  description: string
  icon: string
  forPets?: boolean
  forHumans?: boolean
}

export interface Accommodation {
  id: string
  name: string
  type: 'hotel' | 'resort' | 'petsitter'
  address: string
  description: string
  petFriendlyFeatures: string[]
  priceRange: string
  image: string
  website?: string
  phone?: string
}

export interface CareTaker {
  id: string
  name: string
  role: string
  photo: string
  description: string
  specialties: string[]
  contact?: string
}

export interface PlaylistTrack {
  id: string
  title: string
  artist: string
  duration: string
  file: string
  mood: 'calm' | 'playful' | 'energetic' | 'emotional'
}

export interface GalleryCategory {
  id: string
  name: string
  description: string
  cover: string
  photos: {
    src: string
    caption: string
    petIds: string[] // IDs de las mascotas en la foto
  }[]
}

export interface GiftItem {
  id: string
  name: string
  description: string
  image: string
  price: string
  petType: 'dog' | 'cat' | 'both'
  category: string
  reserved: boolean
  reservedBy?: string
  link?: string
  featured?: boolean
}

export interface GiftRegistry {
  id: string
  store: string
  description: string
  logo: string
  code: string
  link: string
}

export interface MonetaryContribution {
  description: string
  contactEmail: string
  accounts: {
    type: string
    number: string
  }[]
}

export interface CharitableDonation {
  id: string
  organization: string
  description: string
  image: string
  donationLink: string
}

// Datos principales del evento VIP de mascotas
export const vipMascotaData = {
  // Información de las mascotas protagonistas
  pets: [
    {
      id: 'luna',
      name: 'Luna',
      type: 'cat',
      age: 3,
      breed: 'Maine Coon',
      photo: '/images/pets/cats/cat_3.jpeg',
      description: 'Luna es una gata elegante y juguetona que adora dormir en las ventanas soleadas y perseguir juguetes brillantes.',
      personality: [
        'Curiosa', 'Independiente', 'Cariñosa', 'Aventurera'
      ],
      favorites: {
        food: 'Atún fresco',
        toy: 'Ratón con plumas',
        activity: 'Trepar a lugares altos'
      }
    },
    {
      id: 'max',
      name: 'Max',
      type: 'dog',
      age: 4,
      breed: 'Golden Retriever',
      photo: '/images/pets/dogs/dog_2.jpeg',
      description: 'Max es un perro enérgico y leal que disfruta de largos paseos y jugar a buscar la pelota en el parque.',
      personality: [
        'Amigable', 'Leal', 'Juguetón', 'Protector'
      ],
      favorites: {
        food: 'Pollo a la parrilla',
        toy: 'Pelota de tenis',
        activity: 'Nadar en el lago'
      }
    }
  ],

  // Detalles del evento
  event: {
    title: 'Celebración VIP de Luna & Max',
    subtitle: 'Una fiesta inolvidable para nuestros amigos peludos',
    date: '2026-02-15T16:00:00',
    time: '4:00 PM',
    theme: 'Elegancia Peluda: Blanco & Dorado',
    location: {
      name: 'Jardín Paws & Whiskers',
      address: 'Av. Mascotas 123',
      city: 'Ciudad de México',
      coordinates: {
        lat: 19.4326,
        lng: -99.1332
      },
      googleMapsUrl: 'https://goo.gl/maps/example',
      image: '/images/venues/garden-venue.jpg',
      features: [
        'Espacio al aire libre para mascotas',
        '\u00c1rea cubierta con aire acondicionado',
        'Zona de juegos para perros',
        'Estaciones de agua y comida',
        '\u00c1reas de descanso para mascotas'
      ],
      petPolicy: 'Todas las mascotas son bienvenidas siempre que estén con correa o en transportadores. Traer certificado de vacunación actualizado.',
      parking: {
        options: [
          {
            name: 'Estacionamiento Principal',
            details: 'Ubicado frente al jardín, gratuito para invitados'
          },
          {
            name: 'Estacionamiento Secundario',
            details: 'A 100m, con servicio de shuttle para mascotas y dueños'
          }
        ],
        instructions: 'Presenta tu invitación digital para acceder al estacionamiento principal. Disponible desde 3:30 PM.',
        valet: 'Servicio gratuito disponible para invitados con reservación previa.'
      }
    },
    dresscode: 'Elegante Casual - Mascotas con accesorios dorados',
    dressCode: 'Elegante Casual - Mascotas con accesorios dorados',
    notes: 'Este evento es amigable para todas las mascotas. Se proporcionará agua fresca y áreas de descanso para todos los invitados peludos.',
    rsvpDeadline: '2026-01-30T23:59:59',
    contactEmail: 'lunamax@example.com',
    contactPhone: '(555) 123-4567',
    schedule: [
      { time: '16:00', title: 'Recepción de invitados', description: 'Registro y entrega de pases' },
      { time: '16:30', title: 'Presentación de mascotas', description: 'Luna y Max saludan a los invitados' },
      { time: '17:00', title: 'Sesión de fotos', description: 'Fotografías profesionales' },
      { time: '17:30', title: 'Concursos y juegos', description: 'Actividades para mascotas y dueños' },
      { time: '18:30', title: 'Cena', description: 'Servicio de comida para humanos y mascotas' },
      { time: '19:30', title: 'Celebración especial', description: 'Pastel y regalos' },
      { time: '20:30', title: 'Despedida', description: 'Entrega de recuerdos' }
    ],
    food: {
      human: [
        {
          type: 'Entradas',
          options: [
            'Tabla de quesos gourmet',
            'Canapés vegetarianos',
            'Bruschetta de temporada'
          ]
        },
        {
          type: 'Plato Principal',
          options: [
            'Risotto de hongos silvestres',
            'Salmon en costra de hierbas',
            'Opciones vegetarianas disponibles'
          ]
        },
        {
          type: 'Postres',
          options: [
            'Mini pasteles de vainilla',
            'Frutas de temporada con chocolate',
            'Macarons artesanales'
          ]
        }
      ],
      pets: [
        {
          petType: 'dog',
          options: [
            'Tiras de pollo orgánico',
            'Galletas gourmet para perros',
            'Helado especial canino'
          ]
        },
        {
          petType: 'cat',
          options: [
            'Paté premium de salmón',
            'Trozos de atún fresco',
            'Treats especiales para gatos'
          ]
        }
      ],
      drinks: [
        'Cócteles sin alcohol de frutas',
        'Champagne',
        'Agua mineralizada con sabores',
        'Estación de café y té'
      ]
    },
    dressSuggestions: {
      humanColors: ['Blanco', 'Dorado', 'Plateado', 'Tonos neutros'],
      humanStyle: 'Elegante pero cómodo para interactuar con las mascotas',
      petAccessories: ['Moños dorados', 'Corbatas elegantes', 'Bandanas decorativas', 'Collares especiales'],
      petStyle: 'Accesorios cómodos que no causen molestias',
      additional: [
        'Traer zapatos cómodos para las actividades al aire libre',
        'Se recomienda ropa que permita moverse con libertad',
        'Considere traer una muda extra para su mascota por si es necesario'
      ]
    },
    importantInfo: {
      pets: [
        'Todas las mascotas deben tener sus vacunas actualizadas',
        'Traer correa o transportador para momentos de alta actividad',
        'Habrá estaciones de agua y áreas de descanso disponibles',
        'Un veterinario estará presente durante todo el evento'
      ],
      humans: [
        'El evento es al aire libre con áreas techadas',
        'Se recomienda traer protección solar',
        'La mayoría de las áreas son accesibles para sillas de ruedas',
        'Habrá personal de apoyo para asistir con las mascotas si es necesario'
      ]
    },
    emergencyContacts: [
      {
        name: 'Dr. Rivera',
        role: 'Veterinario en sitio',
        phone: '(555) 789-0123'
      },
      {
        name: 'Carlos Méndez',
        role: 'Coordinador del evento',
        phone: '(555) 456-7890'
      },
      {
        name: 'Clínica Veterinaria San Francisco',
        role: 'Emergencias 24/7',
        phone: '(555) 234-5678'
      }
    ]
  },

  // Cronograma detallado
  itinerary: [
    {
      time: '16:00',
      title: 'Bienvenida',
      description: 'Recepción de invitados humanos y mascotas',
      icon: 'door-open',
      forPets: true,
      forHumans: true
    },
    {
      time: '16:30',
      title: 'Sesión fotográfica',
      description: 'Fotografías profesionales con los festejados',
      icon: 'camera',
      forPets: true,
      forHumans: true
    },
    {
      time: '17:00',
      title: 'Buffet para mascotas',
      description: 'Deliciosas opciones gourmet para perros y gatos',
      icon: 'utensils',
      forPets: true,
      forHumans: false
    },
    {
      time: '17:30',
      title: 'Cóctel para humanos',
      description: 'Bebidas y aperitivos mientras las mascotas socializan',
      icon: 'glass-cheers',
      forPets: false,
      forHumans: true
    },
    {
      time: '18:00',
      title: 'Ceremonia principal',
      description: 'Celebración especial para Luna y Max',
      icon: 'birthday-cake',
      forPets: true,
      forHumans: true
    },
    {
      time: '18:30',
      title: 'Juegos interactivos',
      description: 'Actividades divertidas para mascotas y dueños',
      icon: 'gamepad',
      forPets: true,
      forHumans: true
    },
    {
      time: '19:30',
      title: 'Cena',
      description: 'Cena para todos los invitados',
      icon: 'hamburger',
      forPets: true,
      forHumans: true
    },
    {
      time: '20:30',
      title: 'Entrega de recuerdos',
      description: 'Obsequios especiales para los invitados',
      icon: 'gift',
      forPets: true,
      forHumans: true
    },
    {
      time: '21:00',
      title: 'Despedida',
      description: 'Fin de la celebración',
      icon: 'heart',
      forPets: true,
      forHumans: true
    }
  ],

  // Hospedaje recomendado para mascotas
  accommodation: [
    {
      id: 'pet-resort',
      name: 'Pet Paradise Resort',
      type: 'resort',
      address: 'Calle Principal 456, CDMX',
      description: 'Resort de lujo exclusivo para mascotas con habitaciones individuales y servicios premium.',
      petFriendlyFeatures: [
        'Camas ortopédicas',
        'Servicio de spa',
        'Menús personalizados',
        'Cámaras en vivo',
        'Áreas de juego privadas'
      ],
      priceRange: '$$$',
      image: '/images/pets/dogs-cats/cat_dog_2.jpeg',
      website: 'https://petparadise.example.com',
      phone: '+52 55 1234 5678'
    },
    {
      id: 'hotel-pawfect',
      name: 'Hotel Pawfect',
      type: 'hotel',
      address: 'Av. Reforma 789, CDMX',
      description: 'Hotel que admite mascotas con servicios especiales para perros y gatos.',
      petFriendlyFeatures: [
        'Sin cargo adicional por mascotas',
        'Kit de bienvenida para mascotas',
        'Menú especial',
        'Servicio de paseo',
        'Guardería durante el día'
      ],
      priceRange: '$$',
      image: '/images/pets/dogs-cats/cat_dog_3.jpeg',
      website: 'https://hotelpawfect.example.com',
      phone: '+52 55 2345 6789'
    },
    {
      id: 'pet-sitter-vip',
      name: 'Cuidadores VIP',
      type: 'petsitter',
      address: 'A domicilio',
      description: 'Servicio de cuidadores profesionales que pueden quedarse en tu alojamiento o recibir a tu mascota en su casa.',
      petFriendlyFeatures: [
        'Cuidado personalizado',
        'Atención 24/7',
        'Administración de medicamentos',
        'Actualizaciones por mensaje',
        'Transporte incluido'
      ],
      priceRange: '$$',
      image: '/images/pets/dogs-cats/cat_dog_1.jpeg',
      website: 'https://petsittersvip.example.com',
      phone: '+52 55 3456 7890'
    }
  ],
  
  // Cuidadores especiales
  caretakers: [
    {
      id: 'veterinario',
      name: 'Dr. Carlos Rodríguez',
      role: 'Veterinario de Guardia',
      photo: '/images/pets/dogs/dog_1.jpeg',
      description: 'Especialista en medicina de emergencia para perros y gatos, con más de 15 años de experiencia.',
      specialties: ['Primeros auxilios', 'Medicina de emergencia', 'Tratamiento del estrés'],
      contact: '+52 55 4567 8901'
    },
    {
      id: 'groomer',
      name: 'Laura Méndez',
      role: 'Estilista Profesional',
      photo: '/images/pets/cats/cat_1.jpeg',
      description: 'Estilista especializada en preparación para eventos, con técnicas que hacen que los peludos estén cómodos durante todo el proceso.',
      specialties: ['Corte de pelo', 'Baño aromático', 'Accesorios de lujo'],
      contact: '+52 55 5678 9012'
    },
    {
      id: 'petsitter',
      name: 'Miguel Ángel Torres',
      role: 'Cuidador Certificado',
      photo: '/images/pets/dogs-cats/cat_dog_1.jpeg',
      description: 'Cuidador profesional con certificación en comportamiento animal y primeros auxilios.',
      specialties: ['Manejo de ansiedad', 'Juegos interactivos', 'Socialización'],
      contact: '+52 55 6789 0123'
    }
  ],
  
  // Listas de reproducción
  playlists: [
    {
      id: 'calm',
      name: 'Momentos Tranquilos',
      description: 'Música relajante para momentos de calma con tus mascotas',
      icon: 'moon',
      tracks: [
        {
          id: 'track-1',
          title: 'Serenidad Felina',
          artist: 'Música para Mascotas',
          duration: '3:45',
          file: '/music/calm-emotional-cello-main1.mp3',
          mood: 'calm'
        },
        {
          id: 'track-2',
          title: 'Sueños de Cachorro',
          artist: 'Pet Sounds',
          duration: '4:20',
          file: '/music/beautiful-fairy-piano1.mp3',
          mood: 'calm'
        },
        {
          id: 'track-3',
          title: 'Meditación Gatuna',
          artist: 'Ronroneos',
          duration: '3:30',
          file: '/music/piano-strings1.mp3',
          mood: 'calm'
        }
      ]
    },
    {
      id: 'playful',
      name: 'Hora de Jugar',
      description: 'Música energética para momentos de diversión y actividad',
      icon: 'play-circle',
      tracks: [
        {
          id: 'track-4',
          title: 'Aventuras Peludas',
          artist: 'Pet Party',
          duration: '2:50',
          file: '/music/feel-good1.mp3',
          mood: 'playful'
        },
        {
          id: 'track-5',
          title: 'Carrera de Gatos',
          artist: 'Miau Mix',
          duration: '3:15',
          file: '/music/summer-upbeat-motivational1.mp3',
          mood: 'energetic'
        },
        {
          id: 'track-6',
          title: 'Día en el Parque',
          artist: 'Woof Beats',
          duration: '3:40',
          file: '/music/choose-motivation1.mp3',
          mood: 'playful'
        }
      ]
    },
    {
      id: 'memories',
      name: 'Recuerdos Especiales',
      description: 'Música emotiva para celebrar los momentos más especiales',
      icon: 'heart',
      tracks: [
        {
          id: 'track-7',
          title: 'Primer Encuentro',
          artist: 'Pet Emotions',
          duration: '4:10',
          file: '/music/emotional-violin1.mp3',
          mood: 'emotional'
        },
        {
          id: 'track-8',
          title: 'Amistad Eterna',
          artist: 'Harmony Tails',
          duration: '3:55',
          file: '/music/hopeful-cinematic-piano1.mp3',
          mood: 'emotional'
        },
        {
          id: 'track-9',
          title: 'Momentos Juntos',
          artist: 'Paws & Notes',
          duration: '4:30',
          file: '/music/romantic-love-piano1.mp3',
          mood: 'emotional'
        }
      ]
    }
  ],
  
  // Categorías de galería
  gallery: [
    {
      id: 'friends',
      name: 'Mejores Amigos',
      description: 'Luna y Max compartiendo momentos especiales juntos',
      cover: '/images/pets/dogs-cats/cat_dog_1.jpeg',
      photos: [
        {
          src: '/images/pets/dogs-cats/cat_dog_1.jpeg',
          caption: 'Primer día juntos en casa',
          petIds: ['luna', 'max']
        },
        {
          src: '/images/pets/dogs-cats/cat_dog_2.jpeg',
          caption: 'Compartiendo una siesta en el sofá',
          petIds: ['luna', 'max']
        },
        {
          src: '/images/pets/dogs-cats/cat_dog_3.jpeg',
          caption: 'Esperando la cena juntos',
          petIds: ['luna', 'max']
        },
        {
          src: '/images/pets/dogs-cats/cat_dog_4.jpeg',
          caption: 'Explorando el jardín',
          petIds: ['luna', 'max']
        }
      ]
    },
    {
      id: 'luna-solo',
      name: 'Luna en Solitario',
      description: 'Momentos especiales de nuestra gata Luna',
      cover: '/images/pets/cats/cat_1.jpeg',
      photos: [
        {
          src: '/images/pets/cats/cat_1.jpeg',
          caption: 'Luna observando por la ventana',
          petIds: ['luna']
        },
        {
          src: '/images/pets/cats/cat_2.jpeg',
          caption: 'Estirándose después de una siesta',
          petIds: ['luna']
        },
        {
          src: '/images/pets/cats/cat_3.jpeg',
          caption: 'Luna en su lugar favorito',
          petIds: ['luna']
        },
        {
          src: '/images/pets/cats/cat_4.jpeg',
          caption: 'Momento juguetón',
          petIds: ['luna']
        }
      ]
    },
    {
      id: 'max-solo',
      name: 'Max en Acción',
      description: 'Aventuras y momentos especiales de nuestro perro Max',
      cover: '/images/pets/dogs/dog_1.jpeg',
      photos: [
        {
          src: '/images/pets/dogs/dog_1.jpeg',
          caption: 'Max disfrutando del parque',
          petIds: ['max']
        },
        {
          src: '/images/pets/dogs/dog_2.jpeg',
          caption: 'Posando para la cámara',
          petIds: ['max']
        },
        {
          src: '/images/pets/dogs/dog_3.jpeg',
          caption: 'Max con su juguete favorito',
          petIds: ['max']
        },
        {
          src: '/images/pets/dogs/dog_4.jpeg',
          caption: 'Listo para la aventura',
          petIds: ['max']
        }
      ]
    }
  ],
  
  // Registro de regalos
  gifts: {
    suggestions: [
      {
        id: 'gift-1',
        name: 'Cama ortopédica de lujo',
        description: 'Cama especial con materiales premium para el máximo confort',
        image: '/images/pets/pet-bed.jpg',
        price: '$1,200',
        petType: 'both',
        category: 'both',
        reserved: false,
        featured: true
      },
      {
        id: 'gift-2',
        name: 'Set de juguetes interactivos',
        description: 'Colección de juguetes que estimulan la mente y promueven el ejercicio',
        image: '/images/pets/pet-toys.jpg',
        price: '$850',
        petType: 'both',
        category: 'both',
        reserved: true,
        reservedBy: 'Familia Martínez'
      },
      {
        id: 'gift-3',
        name: 'Rascador de diseño',
        description: 'Elegante rascador con múltiples niveles y áreas de descanso',
        image: '/images/pets/cat-tree.jpg',
        price: '$1,800',
        petType: 'cat',
        category: 'cat',
        reserved: false
      },
      {
        id: 'gift-4',
        name: 'Dispensador inteligente de comida',
        description: 'Dispensador automático programable con cámara integrada',
        image: '/images/pets/smart-feeder.jpg',
        price: '$2,200',
        petType: 'both',
        category: 'both',
        reserved: false,
        featured: true
      },
      {
        id: 'gift-5',
        name: 'Arnés de aventura',
        description: 'Arnés profesional para caminatas y aventuras al aire libre',
        image: '/images/pets/dog-harness.jpg',
        price: '$950',
        petType: 'dog',
        category: 'dog',
        reserved: false
      },
      {
        id: 'gift-6',
        name: 'Set de grooming profesional',
        description: 'Kit completo para el cuidado del pelaje de alta calidad',
        image: '/images/pets/grooming-kit.jpg',
        price: '$1,500',
        petType: 'both',
        category: 'both',
        reserved: true,
        reservedBy: 'Ana y Pedro'
      },
      {
        id: 'gift-7',
        name: 'Donación a refugio animal',
        description: 'Tu contribución ayudará a animales sin hogar',
        image: '/images/pets/animal-shelter.jpg',
        price: 'Cualquier cantidad',
        petType: 'both',
        category: 'donation',
        reserved: false
      }
    ],
    registries: [
      {
        id: 'registry-1',
        store: 'PetMart',
        description: 'Tienda especializada en productos de alta gama para mascotas',
        logo: '/images/stores/petmart-logo.png',
        code: 'VIP-PETS-2025',
        link: 'https://petmart.example.com/registry/vippets2025'
      },
      {
        id: 'registry-2',
        store: 'LuxuryPets',
        description: 'Boutique exclusiva para accesorios premium de mascotas',
        logo: '/images/stores/luxurypets-logo.png',
        code: 'LUNA-MAX-0813',
        link: 'https://luxurypets.example.com/registry/lunamax0813'
      }
    ],
    monetaryContribution: {
      description: 'Si prefieres hacer una contribución monetaria para los festejos de Luna y Max, puedes hacerlo a través de las siguientes cuentas:',
      contactEmail: 'lunamax@example.com',
      accounts: [
        {
          type: 'Transferencia bancaria',
          number: '1234-5678-9012-3456'
        },
        {
          type: 'PayPal',
          number: 'lunamax@example.com'
        },
        {
          type: 'Efectivo',
          number: 'Confirmar con anfitrión'
        }
      ]
    },
    charitableDonations: [
      {
        id: 'charity-1',
        organization: 'Refugio Patitas Felices',
        description: 'Ayuda a perros y gatos sin hogar a encontrar una familia',
        image: '/images/pets/charity-dogs.jpg',
        donationLink: 'https://patitasfelices.org/donar'
      },
      {
        id: 'charity-2',
        organization: 'Fundación Mascotas Saludables',
        description: 'Brinda atención veterinaria a mascotas de familias sin recursos',
        image: '/images/pets/charity-vet.jpg',
        donationLink: 'https://mascotassaludables.org/ayudar'
      }
    ]
  },
  
  // Sección CTA
  cta: {
    title: '¡Crea Tu Celebración VIP para Mascotas!',
    subtitle: 'Convierte el cumpleaños de tus compañeros peludos en una experiencia extraordinaria con todas estas características exclusivas.',
    features: [
      'Hospedaje premium para invitados peludos',
      'Itinerario completo personalizado',
      'Servicio de cuidadores profesionales',
      'Múltiples listas de reproducción temáticas',
      'Galería avanzada categorizada',
      'Registro de regalos con notificaciones'
    ],
    buttonText: 'Contactar ahora',
    price: '$699'
  }
};
