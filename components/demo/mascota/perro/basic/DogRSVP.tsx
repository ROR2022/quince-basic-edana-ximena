"use client"

import { useState } from 'react'
import { Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'

export function DogRSVP() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [bringingPet, setBringingPet] = useState(false)
  const [guestName, setGuestName] = useState("")
  const [petName, setPetName] = useState("")
  const [message, setMessage] = useState("")
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // En un caso real, aquí se enviaría la información a un backend
    // Por ahora, solo mostramos un mensaje de confirmación
    setFormSubmitted(true)
  }
  
  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Título de sección */}
          <h2 className="text-3xl font-bold text-center mb-6 text-blue-800">
            Confirma tu Asistencia
          </h2>
          
          <p className="text-center text-gray-700 mb-8">
            Ayúdanos a planificar este día especial confirmando tu asistencia
          </p>
          
          {!formSubmitted ? (
            <div className="bg-white rounded-xl shadow-md p-6">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="guestName">Nombre completo</Label>
                    <Input 
                      id="guestName" 
                      placeholder="Tu nombre" 
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="bringingPet"
                      checked={bringingPet}
                      onCheckedChange={setBringingPet}
                    />
                    <Label htmlFor="bringingPet">Llevaré a mi mascota</Label>
                  </div>
                  
                  {bringingPet && (
                    <div>
                      <Label htmlFor="petName">Nombre de tu mascota</Label>
                      <Input 
                        id="petName" 
                        placeholder="Nombre de tu mascota" 
                        value={petName}
                        onChange={(e) => setPetName(e.target.value)}
                      />
                    </div>
                  )}
                  
                  <div>
                    <Label htmlFor="message">Mensaje para el cumpleañero (opcional)</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Escribe un mensaje para el cumpleañero..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                  
                  <div className="pt-4 flex gap-4">
                    <Button 
                      type="submit" 
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Asistiré
                    </Button>
                    
                    <Button 
                      type="button"
                      variant="outline" 
                      className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
                      onClick={() => setFormSubmitted(true)}
                    >
                      <X className="w-4 h-4 mr-2" />
                      No podré asistir
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-green-100">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              
              <h3 className="text-xl font-bold mb-2">¡Gracias por confirmar!</h3>
              
              <p className="text-gray-700 mb-4">
                Hemos recibido tu respuesta. {guestName ? `¡Nos vemos pronto, ${guestName}!` : "¡Nos vemos pronto!"}
                {bringingPet && petName && <span> {petName} también será bienvenido.</span>}
              </p>
              
              <Button 
                variant="outline" 
                onClick={() => setFormSubmitted(false)}
                className="mt-4"
              >
                Modificar respuesta
              </Button>
            </div>
          )}
          
          <div className="mt-8 text-center text-gray-600 text-sm">
            <p>Fecha límite para confirmaciones: 10 de septiembre de 2025</p>
          </div>
        </div>
      </div>
    </section>
  )
}
