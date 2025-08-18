"use client"

import React, { useState, useCallback, useEffect } from 'react'
import { 
  Search, 
  Filter, 
  X, 
  Calendar,
  Users,
  Mail,
  Phone,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  SlidersHorizontal,
  RefreshCw
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useGuestManagement } from '@/context/GuestManagementContext'
import { GuestStatus, InvitationType, type GuestFilters as GuestFiltersType } from '@/types/guest'

interface GuestFiltersProps {
  onFiltersChange: (filters: GuestFiltersType) => void
  showAdvanced?: boolean
  className?: string
}

// Configuración de los filtros disponibles
const statusOptions = [
  { value: 'all', label: 'Todos los estados', icon: Users, color: 'bg-gray-100 text-gray-800' },
  { value: 'confirmed', label: 'Confirmados', icon: CheckCircle, color: 'bg-green-100 text-green-800' },
  { value: 'declined', label: 'Declinaron', icon: XCircle, color: 'bg-red-100 text-red-800' },
  { value: 'invited', label: 'Pendientes', icon: Clock, color: 'bg-yellow-100 text-yellow-800' },
  { value: 'pending', label: 'Sin invitar', icon: AlertCircle, color: 'bg-gray-100 text-gray-800' }
]

const invitationTypeOptions = [
  { value: 'all', label: 'Todos los tipos', color: 'bg-gray-100 text-gray-800' },
  { value: 'whatsapp', label: 'WhatsApp', color: 'bg-green-100 text-green-800' },
  { value: 'email', label: 'Email', color: 'bg-blue-100 text-blue-800' },
  { value: 'manual', label: 'Manual', color: 'bg-purple-100 text-purple-800' }
]

// Hook personalizado para debounce
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// Componente principal
export function GuestFilters({ 
  onFiltersChange, 
  showAdvanced = false, 
  className = ""
}: GuestFiltersProps) {
  const { stats } = useGuestManagement()
  
  // Estados de los filtros
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<GuestStatus | 'all'>('all')
  const [selectedInvitationType, setSelectedInvitationType] = useState<InvitationType | 'all'>('all')
  const [dateFrom, setDateFrom] = useState<string>('')
  const [dateTo, setDateTo] = useState<string>('')
  const [hasCompanions, setHasCompanions] = useState<boolean | undefined>(undefined)
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

  // Debounce para la búsqueda
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  // Aplicar filtros cuando cambien
  useEffect(() => {
    const filters: GuestFiltersType = {
      search: debouncedSearchTerm || undefined,
      status: selectedStatus === 'all' ? undefined : selectedStatus,
      invitationType: selectedInvitationType === 'all' ? undefined : selectedInvitationType,
      dateFrom: dateFrom ? new Date(dateFrom) : undefined,
      dateTo: dateTo ? new Date(dateTo) : undefined,
      hasCompanions
    }

    console.log('🔧 GuestFilters: Sending filters:', filters)
    onFiltersChange(filters)
  }, [
    debouncedSearchTerm,
    selectedStatus,
    selectedInvitationType,
    dateFrom,
    dateTo,
    hasCompanions,
    onFiltersChange
  ])

  // Manejar reset de filtros
  const handleReset = useCallback(() => {
    setSearchTerm('')
    setSelectedStatus('all')
    setSelectedInvitationType('all')
    setDateFrom('')
    setDateTo('')
    setHasCompanions(undefined)
  }, [])

  // Contar filtros activos
  const activeFiltersCount = [
    debouncedSearchTerm,
    selectedStatus !== 'all' ? selectedStatus : null,
    selectedInvitationType !== 'all' ? selectedInvitationType : null,
    dateFrom,
    dateTo,
    hasCompanions !== undefined ? hasCompanions : null
  ].filter(Boolean).length

  return (
    <Card className={`${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filtros</span>
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {activeFiltersCount}
                </Badge>
              )}
            </CardTitle>
            <CardDescription>
              Filtra y busca invitados específicos
            </CardDescription>
          </div>
          {activeFiltersCount > 0 && (
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Limpiar
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Búsqueda por texto */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar por nombre, teléfono o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filtros principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Filtro por estado */}
          <div className="space-y-2">
            <Label htmlFor="status-filter">Estado</Label>
            <Select value={selectedStatus} onValueChange={(value) => setSelectedStatus(value as GuestStatus | 'all')}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar estado" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => {
                  const IconComponent = option.icon
                  return (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center space-x-2">
                        <IconComponent className="h-4 w-4" />
                        <span>{option.label}</span>
                      </div>
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Filtro por tipo de invitación */}
          <div className="space-y-2">
            <Label htmlFor="type-filter">Tipo de Invitación</Label>
            <Select value={selectedInvitationType} onValueChange={(value) => setSelectedInvitationType(value as InvitationType | 'all')}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                {invitationTypeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <span>{option.label}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Filtros avanzados */}
        {(showAdvanced || showAdvancedFilters) && (
          <>
            <Separator />
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Filtros Avanzados</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  {showAdvancedFilters ? 'Ocultar' : 'Mostrar'}
                </Button>
              </div>

              {showAdvancedFilters && (
                <div className="space-y-4">
                  {/* Filtro por fechas */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date-from">Desde</Label>
                      <Input
                        id="date-from"
                        type="date"
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date-to">Hasta</Label>
                      <Input
                        id="date-to"
                        type="date"
                        value={dateTo}
                        onChange={(e) => setDateTo(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Filtro por acompañantes */}
                  <div className="space-y-2">
                    <Label>Acompañantes</Label>
                    <div className="flex space-x-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="has-companions"
                          checked={hasCompanions === true}
                          onCheckedChange={(checked) => 
                            setHasCompanions(checked ? true : undefined)
                          }
                        />
                        <Label htmlFor="has-companions">Con acompañantes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="no-companions"
                          checked={hasCompanions === false}
                          onCheckedChange={(checked) => 
                            setHasCompanions(checked ? false : undefined)
                          }
                        />
                        <Label htmlFor="no-companions">Sin acompañantes</Label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Resumen de resultados */}
        {stats && (
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-sm text-gray-600">
              <div className="flex items-center justify-between">
                <span>Total encontrados:</span>
                <span className="font-medium">{stats.total}</span>
              </div>
              {activeFiltersCount > 0 && (
                <div className="mt-2 text-xs">
                  <span className="text-blue-600">
                    {activeFiltersCount} filtro{activeFiltersCount !== 1 ? 's' : ''} activo{activeFiltersCount !== 1 ? 's' : ''}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default GuestFilters
