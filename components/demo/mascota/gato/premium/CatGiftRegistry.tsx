"use client"

import { useState } from 'react'
import Image from 'next/image'
import { catBirthdayPremiumData } from './data/premium-demo-data'
import { Gift, Star, Check, Heart, ShoppingCart, Link, ExternalLink } from 'lucide-react'

// Definir los tipos necesarios para los regalos
type GiftDataItem = {
  name: string;
  description: string;
  image: string;
  price: string;
}

type GiftItem = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: string;
  reserved: boolean;
}

export function CatGiftRegistry() {
  const { cat, gifts } = catBirthdayPremiumData
  
  // Crear estructura adecuada para los elementos de regalo
  const [giftItems, setGiftItems] = useState<GiftItem[]>(
    gifts.map((gift, index) => {
      // Extraer los datos del string del regalo, o usar valores por defecto
      let giftName = "Regalo misterioso";
      let giftDescription = "Un regalo perfecto para cualquier gato";
      let giftImage = "/images/pets/cats/cat-gift.jpg";
      let giftPrice = "$0";
      
      // Tratar el regalo como un objeto tipado
      const giftObj = gift as unknown as GiftDataItem;
      
      // Si es un objeto con las propiedades necesarias, usarlas
      if (typeof gift === 'object' && gift !== null) {
        giftName = giftObj.name || giftName;
        giftDescription = giftObj.description || giftDescription;
        giftImage = giftObj.image || giftImage;
        giftPrice = giftObj.price || giftPrice;
      }
      // Si es un string simple, usarlo como nombre
      else if (typeof gift === 'string') {
        giftName = gift;
      }
      
      return {
        id: index + 1,
        name: giftName,
        description: giftDescription,
        image: giftImage,
        price: giftPrice,
        reserved: false
      };
    })
  )

  // Función para reservar un regalo
  const handleReserveGift = (id: number) => {
    setGiftItems(
      giftItems.map(item => 
        item.id === id ? { ...item, reserved: !item.reserved } : item
      )
    )
  }

  // Filtrar los regalos en reservados y disponibles
  const reservedGifts = giftItems.filter(item => item.reserved)
  const availableGifts = giftItems.filter(item => !item.reserved)

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Título de sección */}
          <div className="text-center mb-12">
            <div className="inline-block p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Regalos para {cat.name}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ayuda a {cat.name} a celebrar su día con uno de estos regalos especiales
            </p>
          </div>

          {/* Estadísticas de regalos */}
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 shadow-sm inline-flex space-x-8">
              <div className="text-center">
                <p className="text-sm text-purple-700">Total</p>
                <p className="text-2xl font-bold text-purple-800">{giftItems.length}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-green-600">Reservados</p>
                <p className="text-2xl font-bold text-green-600">{reservedGifts.length}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-pink-600">Disponibles</p>
                <p className="text-2xl font-bold text-pink-600">{availableGifts.length}</p>
              </div>
            </div>
          </div>

          {/* Lista de regalos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {giftItems.map(gift => (
              <div 
                key={gift.id}
                className={`rounded-xl overflow-hidden shadow-md border transition-all ${
                  gift.reserved 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-purple-100 bg-white hover:shadow-lg'
                }`}
              >
                {/* Imagen del regalo */}
                <div className="relative h-48 w-full">
                  <Image
                    src={gift.image}
                    alt={gift.name}
                    fill
                    className="object-cover"
                  />
                  {/* Insignia de estado */}
                  {gift.reserved && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center">
                      <Check className="w-3 h-3 mr-1" />
                      Reservado
                    </div>
                  )}
                  
                  {/* Precio */}
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded-md">
                    {gift.price}
                  </div>
                </div>
                
                {/* Información del regalo */}
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-1 flex items-center">
                    {gift.name}
                    {gift.id % 2 === 0 && (
                      <span className="ml-2 bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full">
                        Popular
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">{gift.description}</p>
                  
                  {/* Botones de acción */}
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleReserveGift(gift.id)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center ${
                        gift.reserved
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                      }`}
                    >
                      {gift.reserved ? (
                        <>
                          <Check className="w-4 h-4 mr-1" />
                          Reservado
                        </>
                      ) : (
                        <>
                          <Heart className="w-4 h-4 mr-1" />
                          Reservar
                        </>
                      )}
                    </button>
                    
                    <button 
                      className="py-2 px-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                      title="Ver en tienda"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                    
                    <button 
                      className="py-2 px-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                      title="Compartir"
                    >
                      <Link className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Otras opciones de regalo */}
          <div className="mt-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 shadow-md">
            <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
              <Star className="w-5 h-5 mr-2 text-pink-500" />
              Otras ideas de regalo
            </h3>
            
            <p className="text-gray-700 mb-4">
              Si prefieres traer otro regalo que no está en la lista, aquí tienes algunas ideas de lo que a {cat.name} le encantaría recibir:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4 border border-purple-200 flex items-start">
                <div className="bg-purple-100 p-2 rounded-lg mr-3">
                  <Gift className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Juguetes</h4>
                  <p className="text-sm text-gray-600">
                    Ratones de peluche, juguetes interactivos o con catnip, plumas y varitas.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 border border-purple-200 flex items-start">
                <div className="bg-purple-100 p-2 rounded-lg mr-3">
                  <Gift className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Accesorios</h4>
                  <p className="text-sm text-gray-600">
                    Collares elegantes, camas acogedoras o rascadores divertidos.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 border border-purple-200 flex items-start">
                <div className="bg-purple-100 p-2 rounded-lg mr-3">
                  <Gift className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Treats Gourmet</h4>
                  <p className="text-sm text-gray-600">
                    Snacks especiales para gatos, hierba gatera fresca o golosinas de salmón.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 border border-purple-200 flex items-start">
                <div className="bg-purple-100 p-2 rounded-lg mr-3">
                  <ExternalLink className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Donaciones</h4>
                  <p className="text-sm text-gray-600">
                    Donativos a refugios de animales en nombre de {cat.name}.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Nota del demo */}
          <div className="mt-10 p-4 bg-purple-50 rounded-lg border border-purple-200 text-center">
            <p className="text-sm text-purple-800">
              <strong>💡 Demo Premium:</strong> El registro de regalos permite a los invitados 
              reservar obsequios para evitar duplicaciones. En tu invitación personalizada, 
              podrás vincular con tiendas en línea y personalizar la lista completa.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
