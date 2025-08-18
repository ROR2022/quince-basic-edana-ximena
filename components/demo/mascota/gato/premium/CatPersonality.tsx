"use client"

import { useState } from 'react'
import Image from 'next/image'
import { catBirthdayPremiumData } from './data/premium-demo-data'
import { Heart, Star, Smile, Award, TrendingUp, Coffee, Pizza, Gift } from 'lucide-react'

// Definir tipo para los datos curiosos
type FunFactType = {
  title: string;
  description: string;
}

export function CatPersonality() {
  const { cat, personality } = catBirthdayPremiumData
  const [activeTab, setActiveTab] = useState<'personalidad' | 'curiosidades'>('personalidad')
  
  // Crear datos curiosos desde la información existente
  const funFacts: FunFactType[] = personality.fun_facts.map((fact, idx) => ({
    title: `Dato curioso #${idx + 1}`,
    description: fact
  }))

  // Lista de características de personalidad con iconos asociados
  const personalityTraits = [
    { trait: personality.temperament, icon: <Heart className="w-5 h-5 text-pink-500" /> },
    { trait: `Nivel de energía: ${personality.energy_level}/10`, icon: <TrendingUp className="w-5 h-5 text-purple-500" /> },
    { trait: `Sociabilidad: ${personality.sociability}/10`, icon: <Smile className="w-5 h-5 text-orange-500" /> }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Título de sección */}
          <div className="text-center mb-10">
            <div className="inline-block p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
              <Star className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Personalidad de {cat.name}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Conoce lo que hace única a nuestra festejada
            </p>
          </div>

          {/* Tabs de navegación */}
          <div className="flex justify-center mb-8">
            <div className="bg-purple-100 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('personalidad')}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'personalidad'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                    : 'text-purple-700 hover:bg-purple-200'
                }`}
              >
                Personalidad
              </button>
              
              <button
                onClick={() => setActiveTab('curiosidades')}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'curiosidades'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                    : 'text-purple-700 hover:bg-purple-200'
                }`}
              >
                Curiosidades
              </button>
            </div>
          </div>

          {/* Contenido de personalidad */}
          <div className={`transition-all duration-500 ${activeTab === 'personalidad' ? 'opacity-100' : 'opacity-0 hidden'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Imagen lateral */}
              <div className="relative rounded-2xl overflow-hidden h-80 shadow-lg">
                <Image
                  src={cat.photo}
                  alt={cat.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 via-purple-500/30 to-transparent"></div>
                <div className="absolute bottom-6 left-0 right-0 px-6 text-center">
                  <div className="inline-block bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl">
                    <h3 className="font-bold text-purple-800 text-lg">{cat.name}</h3>
                    <p className="text-sm text-purple-700">{cat.breed}</p>
                  </div>
                </div>
              </div>
              
              {/* Características de personalidad */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-lg border border-purple-100">
                <h3 className="text-xl font-bold text-purple-800 mb-6 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-pink-500" />
                  Características
                </h3>
                
                <div className="space-y-5">
                  {personalityTraits.map((item, index) => (
                    <div 
                      key={index}
                      className="bg-white rounded-xl p-4 flex items-center shadow-sm border border-purple-100"
                    >
                      <div className="bg-purple-100 p-2 rounded-lg mr-4">
                        {item.icon}
                      </div>
                      <p className="text-gray-800">{item.trait}</p>
                    </div>
                  ))}
                </div>
                
                {/* Descripción adicional */}
                <div className="mt-6 p-4 bg-purple-100 rounded-lg border-l-4 border-purple-500">
                  <p className="text-gray-700 italic">
                    &ldquo;{personality.traits.join('. ')}&rdquo;
                  </p>
                </div>
                
                {/* Actividades favoritas */}
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Actividades favoritas:</h4>
                  <div className="flex flex-wrap gap-2">
                    {cat.favorites.activities.map((activity, index) => (
                      <div 
                        key={index}
                        className="bg-white px-3 py-1 rounded-lg text-sm text-purple-700 border border-purple-200"
                      >
                        {activity}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contenido de curiosidades */}
          <div className={`transition-all duration-500 ${activeTab === 'curiosidades' ? 'opacity-100' : 'opacity-0 hidden'}`}>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-purple-100">
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6">
                <h3 className="text-xl font-bold text-purple-800">Datos curiosos sobre {cat.name}</h3>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {funFacts.map((fact: FunFactType, index: number) => (
                    <div 
                      key={index}
                      className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 shadow-sm border border-purple-100"
                    >
                      <div className="flex items-start">
                        <div className="bg-white p-2 rounded-full shadow-sm mr-3">
                          {index % 4 === 0 ? <Smile className="w-4 h-4 text-purple-500" /> :
                           index % 4 === 1 ? <Coffee className="w-4 h-4 text-pink-500" /> :
                           index % 4 === 2 ? <Gift className="w-4 h-4 text-orange-500" /> :
                           <Pizza className="w-4 h-4 text-indigo-500" />}
                        </div>
                        <div>
                          <h4 className="font-medium text-purple-800 mb-1">{fact.title}</h4>
                          <p className="text-sm text-gray-700">{fact.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Sabías que */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
                <h4 className="font-bold text-lg mb-3 flex items-center">
                  <Star className="w-5 h-5 mr-2 fill-white" />
                  ¿Sabías que?
                </h4>
                <p>{personality.fun_facts[0] || "A los gatos les encanta celebrar sus cumpleaños con amigos felinos"}</p>
              </div>
            </div>
          </div>
          
          {/* Nota del demo */}
          <div className="mt-10 p-4 bg-purple-50 rounded-lg border border-purple-200 text-center">
            <p className="text-sm text-purple-800">
              <strong>💡 Demo Premium:</strong> Esta sección permite presentar la personalidad y curiosidades
              de tu mascota de forma interactiva y visualmente atractiva. En tu invitación personalizada,
              podrás personalizar completamente el contenido.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
