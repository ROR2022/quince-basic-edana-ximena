"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { vipMascotaData } from './data/vip-mascota-data'
import Image from 'next/image'
import { ExternalLink, Gift, Heart, Copy, Check, AlertCircle } from 'lucide-react'

export const PetGiftOptions = () => {
  const { pets, gifts } = vipMascotaData
  const [activeCategory, setActiveCategory] = useState('all')
  const [copiedAccount, setCopiedAccount] = useState('')
  
  const categories = [
    { id: 'all', name: 'Todos los regalos' },
    { id: 'dog', name: 'Para perros' },
    { id: 'cat', name: 'Para gatos' },
    { id: 'both', name: 'Para ambos' },
    { id: 'donation', name: 'Donaciones' }
  ]
  
  const filteredGifts = activeCategory === 'all' 
    ? gifts.suggestions 
    : gifts.suggestions.filter(gift => gift.category === activeCategory)
  
  const handleCopyClick = (account: string) => {
    navigator.clipboard.writeText(account).then(() => {
      setCopiedAccount(account)
      setTimeout(() => setCopiedAccount(''), 2000)
    })
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-purple-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-4">Sugerencias de Regalos</h2>
          <p className="text-lg text-purple-600 max-w-3xl mx-auto">
            Si deseas hacer un regalo a 
            {pets.map((pet, i) => (
              <span key={pet.id} className="font-medium">
                {i === 0 ? ' ' : i === pets.length - 1 ? ' y ' : ', '}
                {pet.name}
              </span>
            ))}, 
            aquí tienes algunas ideas que harían esta celebración aún más especial.
          </p>
        </motion.div>
        
        {/* Filtros para categorías de regalos */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`py-2 px-4 rounded-full transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white shadow-md'
                  : 'bg-white text-purple-700 hover:bg-purple-50'
              }`}
            >
              <span className="font-medium">{category.name}</span>
            </button>
          ))}
        </div>
        
        {/* Lista de sugerencias de regalos */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredGifts.map((gift, index) => (
            <motion.div
              key={gift.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={gift.image}
                  alt={gift.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                    gift.category === 'dog' ? 'bg-blue-500' : 
                    gift.category === 'cat' ? 'bg-pink-500' :
                    gift.category === 'both' ? 'bg-purple-500' : 'bg-green-500'
                  }`}>
                    {gift.category === 'dog' ? '🐶 Perro' : 
                     gift.category === 'cat' ? '🐱 Gato' :
                     gift.category === 'both' ? '🐾 Ambos' : '❤️ Donación'}
                  </div>
                </div>
                {gift.featured && (
                  <div className="absolute top-3 right-3">
                    <div className="px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r from-amber-500 to-amber-600">
                      Destacado
                    </div>
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-purple-800 mb-2">{gift.name}</h3>
                <p className="text-sm text-purple-600 mb-4">{gift.description}</p>
                
                <div className="flex items-center justify-between">
                  {gift.price && (
                    <p className="text-fuchsia-600 font-medium">{gift.price}</p>
                  )}
                  {gift.link && (
                    <a 
                      href={gift.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm font-medium text-purple-700 hover:text-fuchsia-600 transition-colors"
                    >
                      Ver opciones <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Mesa de regalos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 bg-gradient-to-r from-purple-50 to-fuchsia-50 rounded-2xl p-6 md:p-8 shadow-md"
        >
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div className="md:w-1/3">
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
                    <Gift size={30} className="text-purple-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-purple-800 text-center mb-3">Mesa de Regalos</h3>
                <p className="text-purple-600 text-center">
                  Si prefieres contribuir a nuestra mesa de regalos, hemos registrado una en las siguientes tiendas:
                </p>
              </div>
            </div>
            
            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {gifts.registries.map((registry) => (
                <div key={registry.id} className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                      <div className="w-full h-full relative">
                        <Image
                          src={registry.logo}
                          alt={registry.store}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <h4 className="font-semibold text-purple-800">{registry.store}</h4>
                  </div>
                  <p className="text-sm text-purple-600 mb-3">{registry.description}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-purple-500"># {registry.code}</p>
                    <a
                      href={registry.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-fuchsia-600 hover:text-fuchsia-700 flex items-center gap-1 transition-colors"
                    >
                      Ver mesa <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Contribución económica */}
        {gifts.monetaryContribution && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-purple-100"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 flex items-center justify-center mb-4">
                <Heart size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-purple-800 mb-2">Contribución Monetaria</h3>
              <p className="text-purple-600 max-w-2xl mb-6">
                {gifts.monetaryContribution.description}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-3xl">
                {gifts.monetaryContribution.accounts.map((account) => (
                  <div key={account.type} className="bg-purple-50 rounded-lg p-4">
                    <p className="font-medium text-purple-700 mb-1">{account.type}</p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-sm text-purple-600 font-mono">{account.number}</p>
                      <button
                        onClick={() => handleCopyClick(account.number)}
                        className="p-1.5 rounded-full bg-white text-purple-600 hover:bg-purple-100 transition-colors"
                        aria-label="Copiar número de cuenta"
                      >
                        {copiedAccount === account.number ? (
                          <Check size={16} className="text-green-600" />
                        ) : (
                          <Copy size={16} />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-fuchsia-50 rounded-lg max-w-2xl">
                <div className="flex">
                  <AlertCircle size={18} className="text-fuchsia-600 shrink-0 mt-0.5 mr-2" />
                  <p className="text-sm text-fuchsia-700">
                    Si realizas una transferencia, por favor envía un comprobante a {gifts.monetaryContribution.contactEmail} para poder agradecerte personalmente.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Donaciones a causas */}
        {gifts.charitableDonations && gifts.charitableDonations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12"
          >
            <h3 className="text-2xl font-semibold text-purple-800 text-center mb-6">
              Donaciones a Causas Benéficas
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gifts.charitableDonations.map((charity) => (
                <div key={charity.id} className="bg-white rounded-xl overflow-hidden shadow-md">
                  <div className="relative h-48">
                    <Image
                      src={charity.image}
                      alt={charity.organization}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                      <div className="p-4 text-white">
                        <h4 className="font-semibold text-lg">{charity.organization}</h4>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-purple-600 mb-4">{charity.description}</p>
                    <a
                      href={charity.donationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white py-2 px-4 rounded-full text-sm font-medium hover:shadow-md transition-shadow"
                    >
                      Donar ahora <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
        
        {/* Mensaje final */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-lg text-purple-600 italic max-w-2xl mx-auto">
            Tu presencia es nuestro regalo más valioso. Estas sugerencias son opcionales,
            lo más importante para nosotros es compartir este día especial contigo.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
