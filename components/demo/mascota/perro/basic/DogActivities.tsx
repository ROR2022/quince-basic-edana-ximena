"use client"

import { dogBirthdayDemoData } from './data/basic-demo-data'
import { Clock, Calendar } from 'lucide-react'

export function DogActivities() {
  const { activities } = dogBirthdayDemoData
  const eventDate = new Date(dogBirthdayDemoData.event.date)
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Título de sección */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2 text-blue-800">
              Cronograma de Actividades
            </h2>
            <p className="text-gray-600 flex items-center justify-center">
              <Calendar className="w-4 h-4 mr-2" />
              {eventDate.toLocaleDateString('es-MX', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>
          </div>
          
          {/* Timeline */}
          <div className="relative">
            {/* Línea central */}
            <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-0.5 bg-blue-200 -ml-px"></div>
            
            {/* Actividades */}
            <div className="space-y-8">
              {activities.map((activity, index) => (
                <div 
                  key={index}
                  className={`flex ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} items-center gap-4`}
                >
                  {/* Punto indicador con huella */}
                  <div className="relative flex items-center justify-center z-10">
                    <div className="bg-white p-1 rounded-full">
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                        <Clock className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Contenido */}
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 shadow-sm">
                      <div className="font-bold text-blue-700">{activity.time}</div>
                      <div className="text-gray-700">{activity.activity}</div>
                    </div>
                  </div>
                  
                  {/* Espacio para alineación en móvil */}
                  <div className={`hidden md:block flex-1 ${index % 2 === 0 ? 'order-first' : ''}`}></div>
                </div>
              ))}
            </div>
            
            {/* Indicador final */}
            <div className="absolute left-5 md:left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2">
              <div className="w-4 h-4 rounded-full bg-blue-600"></div>
            </div>
          </div>
          
          {/* Nota adicional */}
          <div className="mt-12 bg-amber-50 rounded-lg p-4 border border-amber-100 text-center">
            <p className="text-amber-800">
              Todas las actividades están pensadas para que tanto <strong>{dogBirthdayDemoData.dog.name}</strong> como sus invitados humanos y caninos disfruten al máximo de la celebración.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
