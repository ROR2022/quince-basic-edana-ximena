import React from 'react'
import { Heart } from 'lucide-react'

const BasicCTA = () => {
  return (
    <div>
        {/* Contenido principal */}
          <div className="relative z-10 text-center text-white bg-slate-900 rounded-xl p-6">
            {/* Icono principal */}
            <div 
            style={{display:'none'}}
            className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 border-2 border-white/30">
                <Heart className="w-8 h-8 text-pink-100" />
              </div>
            </div>
            
            {/* Título principal */}
            <h3 className="font-normal text-xl md:text-xl  mb-4 text-pink-50">
              Tienes un Evento en Puerta?
            </h3>
            
            {/* Descripción */}
            <p className="font-playfair text-normal mb-8 text-pink-100 leading-relaxed max-w-2xl mx-auto">
              crea tu invitación digital personalizada y sorprende a tus invitados con una experiencia única.
            </p>
            
            {/* Botón CTA principal */}
            <div className="space-y-4">
              <a
                href="https://www.invitacionesweb.lat"
                className="group inline-flex items-center gap-3 bg-white text-pink-300 px-8 py-4 rounded-2xl font-bold text-sm shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 hover:bg-pink-50"
              >
                <span>con gusto te atendemos aqui</span>
                <Heart className="w-5 h-5 group-hover:animate-pulse" />
              </a>
              
              
            </div>
          </div>
    </div>
  )
}

export default BasicCTA