export const dogBirthdayDemoData = {
  dog: {
    name: "Max",
    breed: "Golden Retriever",
    age: {
      human: 7,
      dog: 49
    },
    photo: "/images/pets/dogs/dog_1.jpeg",
    gallery: [
      "/images/pets/dogs/dog_1.jpeg",
      "/images/pets/dogs/dog_2.jpeg",
      "/images/pets/dogs/dog_3.jpeg",
      "/images/pets/dogs/dog_4.jpeg"
    ]
  },
  event: {
    title: "¡Woofday Party de Max!",
    date: "2025-09-15T16:00:00",
    location: {
      name: "Parque Canino Las Américas",
      address: "Av. Principal #123, Col. Centro, CDMX",
      coordinates: { lat: 19.4326, lng: -99.1332 }
    },
    description: "¡Ven a celebrar los 7 años de nuestro peludo favorito! Habrá juegos, premios y diversión para perros y humanos."
  },
  features: [
    "Galería de fotos de Max",
    "Cuenta regresiva al gran día",
    "Confirma tu asistencia",
    "Mapa del lugar",
    "Itinerario de actividades"
  ],
  activities: [
    { time: "16:00", activity: "Llegada de invitados" },
    { time: "16:30", activity: "Juegos para perros" },
    { time: "17:15", activity: "Pastel para Max" },
    { time: "17:30", activity: "Pastel para humanos" },
    { time: "18:00", activity: "Regalos y juguetes" },
    { time: "19:00", activity: "Despedida" }
  ],
  gifts: [
    "Juguetes mordedores",
    "Galletas para perros",
    "Pelota para jugar",
    "Donación a refugio animal"
  ],
  petFriendly: true,
  otherPetsWelcome: true,
  dressCode: "Casual y cómodo para humanos y perros",
  demo: {
    package: "basic",
    price: 299,
    features: [
      "Cuenta regresiva personalizada",
      "Información del evento con mapas",
      "Confirmación de asistencia",
      "Cronograma de actividades",
      "Adaptable a cualquier raza de perro"
    ]
  }
};
