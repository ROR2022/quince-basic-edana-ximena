"use client"

import React, { useState, useMemo } from 'react'
import { 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  Users, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Send, 
  CheckCircle, 
  XCircle, 
  Clock,
  ChevronUp,
  ChevronDown,
  Eye,
  AlertCircle
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useGuestManagement } from '@/context/GuestManagementContext'
import { Guest, GuestStatus, PaginationOptions, type GuestFilters as GuestFiltersType } from '@/types/guest'

interface GuestTableProps {
  filters?: GuestFiltersType
  showPagination?: boolean
  pageSize?: number
}

type SortField = keyof Guest
type SortOrder = 'asc' | 'desc'

// Componente para el estado del invitado
function GuestStatusBadge({ status }: { status: GuestStatus }) {
  const statusConfig = {
    confirmed: {
      icon: CheckCircle,
      label: 'Confirmado',
      variant: 'default' as const,
      className: 'bg-green-100 text-green-800 border-green-200'
    },
    declined: {
      icon: XCircle,
      label: 'Declinó',
      variant: 'destructive' as const,
      className: 'bg-red-100 text-red-800 border-red-200'
    },
    invited: {
      icon: Clock,
      label: 'Pendiente',
      variant: 'secondary' as const,
      className: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    },
    pending: {
      icon: AlertCircle,
      label: 'Sin invitar',
      variant: 'outline' as const,
      className: 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <Badge className={config.className}>
      <Icon className="h-3 w-3 mr-1" />
      {config.label}
    </Badge>
  )
}

// Componente para el tipo de invitación
function InvitationTypeBadge({ type }: { type: string }) {
  const typeConfig = {
    whatsapp: { label: 'WhatsApp', className: 'bg-green-50 text-green-700' },
    email: { label: 'Email', className: 'bg-blue-50 text-blue-700' },
    manual: { label: 'Manual', className: 'bg-purple-50 text-purple-700' }
  }

  const config = typeConfig[type as keyof typeof typeConfig] || { 
    label: type, 
    className: 'bg-gray-50 text-gray-700' 
  }

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  )
}

// Componente para acciones de fila
function GuestRowActions({ guest, onEdit, onDelete, onResend, onView }: {
  guest: Guest
  onEdit?: (guest: Guest) => void
  onDelete?: (guest: Guest) => void
  onResend?: (guest: Guest) => void
  onView?: (guest: Guest) => void
}) {
  const { sendInvitation, resendInvitation } = useGuestManagement()
  const [isLoading, setIsLoading] = useState(false)

  const handleSendInvitation = async () => {
    setIsLoading(true)
    try {
      await sendInvitation(guest.id)
    } catch (error) {
      console.error('Error enviando invitación:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendInvitation = async () => {
    setIsLoading(true)
    try {
      await resendInvitation(guest.id)
      onResend?.(guest)
    } catch (error) {
      console.error('Error reenviando invitación:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onView?.(guest)}>
          <Eye className="mr-2 h-4 w-4" />
          Ver detalles
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => onEdit?.(guest)}>
          <Edit className="mr-2 h-4 w-4" />
          Editar
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        {guest.status === 'pending' && (
          <DropdownMenuItem 
            onClick={handleSendInvitation}
            disabled={isLoading}
          >
            <Send className="mr-2 h-4 w-4" />
            {isLoading ? 'Enviando...' : 'Enviar invitación'}
          </DropdownMenuItem>
        )}
        
        {(guest.status === 'invited' || guest.status === 'confirmed' || guest.status === 'declined') && (
          <DropdownMenuItem 
            onClick={handleResendInvitation}
            disabled={isLoading}
          >
            <Send className="mr-2 h-4 w-4" />
            {isLoading ? 'Reenviando...' : 'Reenviar invitación'}
          </DropdownMenuItem>
        )}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={() => onDelete?.(guest)}
          className="text-red-600 focus:text-red-600"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Componente principal de la tabla
export function GuestTable({ 
  filters = {}, 
  showPagination = true, 
  pageSize = 10 
}: GuestTableProps) {
  const { guests, getFilteredGuests } = useGuestManagement()
  const [sortField, setSortField] = useState<SortField>('dateInvited')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
  const [currentPage, setCurrentPage] = useState(1)

  // Aplicar filtros y paginación
  const filteredResult = useMemo(() => {
    console.log('🔍 GuestTable: Applying filters:', filters)
    
    // Convertir filtros a formato compatible con getFilteredGuests
    const guestFilters: GuestFiltersType = {
      ...filters,
      status: filters?.status === 'all' ? undefined : filters?.status
    }
    
    console.log('🔍 GuestTable: Processed filters:', guestFilters)
    
    const paginationOptions: PaginationOptions = {
      page: currentPage,
      limit: pageSize,
      sortBy: sortField,
      sortOrder
    }
    
    const result = getFilteredGuests(guestFilters, showPagination ? paginationOptions : undefined)
    
    console.log('🔍 GuestTable: Filtered result:', result)
    
    return result
  }, [getFilteredGuests, filters, showPagination, currentPage, pageSize, sortField, sortOrder])

  // Manejar ordenamiento
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
    setCurrentPage(1) // Reset a primera página
  }

  // Componente para encabezado sorteable
  const SortableHeader = ({ field, children }: { field: SortField, children: React.ReactNode }) => (
    <button
      className="flex items-center space-x-1 hover:text-blue-600 transition-colors"
      onClick={() => handleSort(field)}
    >
      <span>{children}</span>
      {sortField === field && (
        sortOrder === 'asc' ? 
          <ChevronUp className="h-4 w-4" /> : 
          <ChevronDown className="h-4 w-4" />
      )}
    </button>
  )

  // Formatear fecha
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date)
  }

  // Formatear teléfono
  const formatPhone = (phone: string) => {
    return phone.replace(/(\d{3})-(\d{3})-(\d{4})/, '($1) $2-$3')
  }

  // Obtener iniciales para avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  // Manejadores de acciones
  const handleEdit = (guest: Guest) => {
    console.log('Editar invitado:', guest.name)
    // Aquí se abriría un modal de edición
  }

  const handleDelete = async (guest: Guest) => {
    if (window.confirm(`¿Estás seguro de eliminar a ${guest.name}?`)) {
      try {
        // Aquí se llamaría a deleteGuest
        console.log('Eliminar invitado:', guest.name)
      } catch (error) {
        console.error('Error eliminando invitado:', error)
      }
    }
  }

  const handleView = (guest: Guest) => {
    console.log('Ver detalles de:', guest.name)
    // Aquí se abriría un modal con detalles
  }

  const handleResend = (guest: Guest) => {
    console.log('Invitación reenviada a:', guest.name)
  }

  if (guests.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Users className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No hay invitados registrados
          </h3>
          <p className="text-gray-600 text-center max-w-md">
            Comienza agregando invitados a tu lista para poder gestionar las confirmaciones de asistencia.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Lista de Invitados</CardTitle>
              <CardDescription>
                {filteredResult.total} invitado{filteredResult.total !== 1 ? 's' : ''} 
                {filters.search && ` encontrado${filteredResult.total !== 1 ? 's' : ''} para "${filters.search}"`}
                {filters.status && filters.status !== 'all' && ` con estado "${filters.status}"`}
              </CardDescription>
            </div>
            {showPagination && filteredResult.totalPages > 1 && (
              <div className="text-sm text-gray-600">
                Página {filteredResult.page} de {filteredResult.totalPages}
              </div>
            )}
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>
                    <SortableHeader field="name">Invitado</SortableHeader>
                  </TableHead>
                  <TableHead>
                    <SortableHeader field="status">Estado</SortableHeader>
                  </TableHead>
                  <TableHead>Contacto</TableHead>
                  <TableHead>
                    <SortableHeader field="dateInvited">Invitado</SortableHeader>
                  </TableHead>
                  <TableHead>
                    <SortableHeader field="dateResponded">Respondió</SortableHeader>
                  </TableHead>
                  <TableHead>Acompañantes</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              
              <TableBody>
                {filteredResult.guests.map((guest) => (
                  <TableRow key={guest.id} className="hover:bg-gray-50">
                    {/* Avatar */}
                    <TableCell>
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {getInitials(guest.name)}
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    
                    {/* Nombre */}
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">
                          {guest.name}
                        </div>
                        {guest.notes && (
                          <div className="text-sm text-gray-600 truncate max-w-[200px]" title={guest.notes}>
                            {guest.notes}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    
                    {/* Estado */}
                    <TableCell>
                      <GuestStatusBadge status={guest.status} />
                    </TableCell>
                    
                    {/* Contacto */}
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-900">
                          <Phone className="h-3 w-3 mr-1 text-gray-400" />
                          {formatPhone(guest.phone)}
                        </div>
                        {guest.email && (
                          <div className="flex items-center text-sm text-gray-600">
                            <Mail className="h-3 w-3 mr-1 text-gray-400" />
                            <span className="truncate max-w-[150px]" title={guest.email}>
                              {guest.email}
                            </span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    
                    {/* Fecha invitado */}
                    <TableCell>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-3 w-3 mr-1 text-gray-400" />
                        {formatDate(guest.dateInvited)}
                      </div>
                    </TableCell>
                    
                    {/* Fecha respuesta */}
                    <TableCell>
                      {guest.dateResponded ? (
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-3 w-3 mr-1 text-gray-400" />
                          {formatDate(guest.dateResponded)}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </TableCell>
                    
                    {/* Acompañantes */}
                    <TableCell>
                      {guest.companions.length > 0 ? (
                        <div className="flex items-center text-sm">
                          <Users className="h-3 w-3 mr-1 text-gray-400" />
                          <span className="font-medium">{guest.companions.length}</span>
                          {guest.companions.length === 1 && (
                            <span className="ml-1 text-gray-600 truncate max-w-[100px]" title={guest.companions[0]}>
                              ({guest.companions[0]})
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </TableCell>
                    
                    {/* Tipo invitación */}
                    <TableCell>
                      <InvitationTypeBadge type={guest.invitationType} />
                    </TableCell>
                    
                    {/* Acciones */}
                    <TableCell>
                      <GuestRowActions
                        guest={guest}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onView={handleView}
                        onResend={handleResend}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Paginación */}
      {showPagination && filteredResult.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Mostrando {Math.min((currentPage - 1) * pageSize + 1, filteredResult.total)} - {Math.min(currentPage * pageSize, filteredResult.total)} de {filteredResult.total} invitados
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={!filteredResult.hasPrev}
            >
              Anterior
            </Button>
            
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, filteredResult.totalPages) }, (_, i) => {
                const page = i + 1
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="w-8 h-8 p-0"
                  >
                    {page}
                  </Button>
                )
              })}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={!filteredResult.hasNext}
            >
              Siguiente
            </Button>
          </div>
        </div>
      )}

      {/* Nota demo */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-purple-900 mb-1">
              💡 Demo de Tabla de Invitados
            </h3>
            <p className="text-sm text-purple-800">
              Esta tabla muestra todos los invitados con opciones completas de gestión. 
              Puedes ordenar por cualquier columna, ver detalles, editar información, 
              enviar/reenviar invitaciones y más. Los datos se actualizan en tiempo real.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GuestTable
