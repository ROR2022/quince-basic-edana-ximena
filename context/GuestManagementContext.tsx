"use client"

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react'
import { 
  Guest, 
  CreateGuestData, 
  UpdateGuestData, 
  AttendanceFormData, 
  GuestStats, 
  GuestFilters, 
  PaginationOptions, 
  PaginatedGuests, 
  BulkInviteOptions, 
  BulkInviteResult, 
  ExportData, 
  GuestManagementContextType, 
  GuestManagementConfig,
  GuestStatus,
  InvitationType
} from '@/types/guest'

// ===== TIPOS PARA EL REDUCER =====

type GuestAction = 
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_GUESTS'; payload: Guest[] }
  | { type: 'ADD_GUEST'; payload: Guest }
  | { type: 'UPDATE_GUEST'; payload: { id: string; data: Partial<Guest> } }
  | { type: 'DELETE_GUEST'; payload: string }
  | { type: 'BULK_ADD_GUESTS'; payload: Guest[] }
  | { type: 'CLEAR_ALL_GUESTS' }
  | { type: 'LOAD_DEMO_DATA'; payload: Guest[] }

interface GuestState {
  guests: Guest[]
  loading: boolean
  error: string | null
}

// ===== ESTADO INICIAL =====

const initialState: GuestState = {
  guests: [],
  loading: false,
  error: null
}

// ===== CONFIGURACIÓN POR DEFECTO =====

const defaultConfig: GuestManagementConfig = {
  loadDemoData: true,
  persistData: true,
  storageKey: 'guestManagement_data',
  notifications: {
    newConfirmations: true,
    declines: true,
    followUpReminders: true,
    followUpDays: 3
  }
}

// ===== REDUCER =====

function guestReducer(state: GuestState, action: GuestAction): GuestState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    
    case 'SET_GUESTS':
      return { ...state, guests: action.payload, loading: false, error: null }
    
    case 'ADD_GUEST':
      return { 
        ...state, 
        guests: [...state.guests, action.payload],
        loading: false,
        error: null
      }
    
    case 'UPDATE_GUEST':
      return {
        ...state,
        guests: state.guests.map(guest => 
          guest.id === action.payload.id 
            ? { ...guest, ...action.payload.data }
            : guest
        ),
        loading: false,
        error: null
      }
    
    case 'DELETE_GUEST':
      return {
        ...state,
        guests: state.guests.filter(guest => guest.id !== action.payload),
        loading: false,
        error: null
      }
    
    case 'BULK_ADD_GUESTS':
      return {
        ...state,
        guests: [...state.guests, ...action.payload],
        loading: false,
        error: null
      }
    
    case 'CLEAR_ALL_GUESTS':
      return { ...state, guests: [], loading: false, error: null }
    
    case 'LOAD_DEMO_DATA':
      return { ...state, guests: action.payload, loading: false, error: null }
    
    default:
      return state
  }
}

// ===== UTILIDADES =====

/**
 * Genera un código único para invitación
 */
const generateInvitationCode = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * Calcula estadísticas de invitados
 */
const calculateStats = (guests: Guest[]): GuestStats => {
  const total = guests.length
  const confirmed = guests.filter(g => g.status === 'confirmed').length
  const declined = guests.filter(g => g.status === 'declined').length
  const pending = guests.filter(g => g.status === 'invited').length
  const notInvited = guests.filter(g => g.status === 'pending').length
  
  const totalConfirmedPeople = guests
    .filter(g => g.status === 'confirmed')
    .reduce((sum, guest) => sum + 1 + guest.companions.length, 0)
  
  const responded = confirmed + declined
  const responseRate = total > 0 ? (responded / total) * 100 : 0
  const confirmationRate = responded > 0 ? (confirmed / responded) * 100 : 0
  
  return {
    total,
    confirmed,
    declined,
    pending,
    notInvited,
    totalConfirmedPeople,
    responseRate: Math.round(responseRate * 100) / 100,
    confirmationRate: Math.round(confirmationRate * 100) / 100
  }
}

/**
 * Filtra invitados según criterios
 */
const filterGuests = (guests: Guest[], filters: GuestFilters): Guest[] => {
  return guests.filter(guest => {
    // Filtro por estado
    if (filters.status && filters.status !== 'all' && guest.status !== filters.status) {
      return false
    }
    
    // Filtro por tipo de invitación
    if (filters.invitationType && filters.invitationType !== 'all' && guest.invitationType !== filters.invitationType) {
      return false
    }
    
    // Búsqueda por texto
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      const matchesName = guest.name.toLowerCase().includes(searchLower)
      const matchesPhone = guest.phone.includes(filters.search)
      const matchesEmail = guest.email?.toLowerCase().includes(searchLower)
      
      if (!matchesName && !matchesPhone && !matchesEmail) {
        return false
      }
    }
    
    // Filtro por fecha
    if (filters.dateFrom && guest.dateInvited < filters.dateFrom) {
      return false
    }
    if (filters.dateTo && guest.dateInvited > filters.dateTo) {
      return false
    }
    
    // Filtro por acompañantes
    if (filters.hasCompanions !== undefined) {
      const hasCompanions = guest.companions.length > 0
      if (filters.hasCompanions !== hasCompanions) {
        return false
      }
    }
    
    return true
  })
}

/**
 * Simula el envío de una invitación
 */
const simulateInvitationSend = async (guest: Guest): Promise<void> => {
  // Simular delay de envío
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))
  
  // Simular posible fallo (5% de probabilidad)
  if (Math.random() < 0.05) {
    throw new Error(`Error al enviar invitación a ${guest.name}`)
  }
  
  console.log(`📧 Invitación enviada a ${guest.name} vía ${guest.invitationType}`)
}

// ===== CONTEXTO =====

const GuestManagementContext = createContext<GuestManagementContextType | null>(null)

// ===== PROVIDER =====

interface GuestManagementProviderProps {
  children: React.ReactNode
  config?: Partial<GuestManagementConfig>
}

export function GuestManagementProvider({ 
  children, 
  config = {} 
}: GuestManagementProviderProps) {
  const finalConfig = { ...defaultConfig, ...config }
  const [state, dispatch] = useReducer(guestReducer, initialState)

  // ===== PERSISTENCIA =====

  const saveToStorage = useCallback((guests: Guest[]) => {
    if (finalConfig.persistData && typeof window !== 'undefined') {
      try {
        localStorage.setItem(finalConfig.storageKey, JSON.stringify(guests))
      } catch (error) {
        console.error('Error saving to localStorage:', error)
      }
    }
  }, [finalConfig.persistData, finalConfig.storageKey])

  const loadFromStorage = useCallback((): Guest[] => {
    if (finalConfig.persistData && typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(finalConfig.storageKey)
        if (stored) {
          const parsed = JSON.parse(stored)
          // Convertir fechas de string a Date
          return parsed.map((guest: any) => ({
            ...guest,
            dateInvited: new Date(guest.dateInvited),
            dateResponded: guest.dateResponded ? new Date(guest.dateResponded) : undefined,
            lastContactDate: guest.lastContactDate ? new Date(guest.lastContactDate) : undefined
          }))
        }
      } catch (error) {
        console.error('Error loading from localStorage:', error)
      }
    }
    return []
  }, [finalConfig.persistData, finalConfig.storageKey])

  // ===== EFECTOS =====

  // Cargar datos al inicializar
  useEffect(() => {
    const storedGuests = loadFromStorage()
    if (storedGuests.length > 0) {
      dispatch({ type: 'SET_GUESTS', payload: storedGuests })
    } else if (finalConfig.loadDemoData) {
      // Cargar datos demo si no hay datos guardados
      loadDemoData()
    }
  }, [finalConfig.loadDemoData, loadFromStorage])

  // Guardar en localStorage cuando cambian los invitados
  useEffect(() => {
    if (state.guests.length > 0) {
      saveToStorage(state.guests)
    }
  }, [state.guests, saveToStorage])

  // ===== OPERACIONES CRUD =====

  const addGuest = useCallback(async (data: CreateGuestData): Promise<Guest> => {
    dispatch({ type: 'SET_LOADING', payload: true })
    
    try {
      const newGuest: Guest = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: data.name,
        phone: data.phone,
        email: data.email,
        status: 'pending',
        companions: [],
        dateInvited: new Date(),
        invitationCode: generateInvitationCode(),
        invitationType: data.invitationType,
        notes: data.notes,
        contactAttempts: 0
      }
      
      dispatch({ type: 'ADD_GUEST', payload: newGuest })
      return newGuest
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al agregar invitado'
      dispatch({ type: 'SET_ERROR', payload: errorMessage })
      throw error
    }
  }, [])

  const updateGuest = useCallback(async (id: string, data: UpdateGuestData): Promise<Guest> => {
    dispatch({ type: 'SET_LOADING', payload: true })
    
    try {
      const existingGuest = state.guests.find(g => g.id === id)
      if (!existingGuest) {
        throw new Error('Invitado no encontrado')
      }
      
      const updatedData: Partial<Guest> = {
        ...data,
        ...(data.status && data.status !== existingGuest.status && {
          dateResponded: new Date()
        })
      }
      
      dispatch({ type: 'UPDATE_GUEST', payload: { id, data: updatedData } })
      
      return { ...existingGuest, ...updatedData }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al actualizar invitado'
      dispatch({ type: 'SET_ERROR', payload: errorMessage })
      throw error
    }
  }, [state.guests])

  const updateGuestStatus = useCallback(async (id: string, status: GuestStatus, additionalData?: Partial<Guest>): Promise<Guest> => {
    const updateData: UpdateGuestData = {
      status,
      ...additionalData
    }
    
    // Si es confirmación, establecer fecha de confirmación
    if (status === 'confirmed' && !additionalData?.confirmedAt) {
      updateData.confirmedAt = new Date().toISOString()
    }
    
    return updateGuest(id, updateData)
  }, [updateGuest])

  const findGuestByPhone = useCallback((phone: string): Guest | undefined => {
    // Normalizar teléfono para búsqueda (quitar espacios, guiones, etc.)
    const normalizedPhone = phone.replace(/[\s\-()]/g, '')
    
    return state.guests.find(guest => {
      const guestPhone = guest.phone.replace(/[\s\-()]/g, '')
      return guestPhone === normalizedPhone || guestPhone.includes(normalizedPhone)
    })
  }, [state.guests])

  const deleteGuest = useCallback(async (id: string): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: true })
    
    try {
      dispatch({ type: 'DELETE_GUEST', payload: id })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al eliminar invitado'
      dispatch({ type: 'SET_ERROR', payload: errorMessage })
      throw error
    }
  }, [])

  const getGuest = useCallback((id: string): Guest | undefined => {
    return state.guests.find(guest => guest.id === id)
  }, [state.guests])

  const getGuestByCode = useCallback((code: string): Guest | undefined => {
    return state.guests.find(guest => guest.invitationCode === code)
  }, [state.guests])

  // ===== OPERACIONES DE INVITACIÓN =====

  const sendInvitation = useCallback(async (guestId: string): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: true })
    
    try {
      const guest = getGuest(guestId)
      if (!guest) {
        throw new Error('Invitado no encontrado')
      }
      
      await simulateInvitationSend(guest)
      
      await updateGuest(guestId, {
        status: 'invited',
        contactAttempts: guest.contactAttempts + 1,
        lastContactDate: new Date()
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al enviar invitación'
      dispatch({ type: 'SET_ERROR', payload: errorMessage })
      throw error
    }
  }, [getGuest, updateGuest])

  const bulkInvite = useCallback(async (options: BulkInviteOptions): Promise<BulkInviteResult> => {
    dispatch({ type: 'SET_LOADING', payload: true })
    
    const result: BulkInviteResult = {
      success: [],
      failed: [],
      total: options.guests.length,
      successCount: 0,
      failedCount: 0
    }
    
    try {
      for (const guestData of options.guests) {
        try {
          const guest = await addGuest({
            ...guestData,
            invitationType: guestData.invitationType || options.defaultInvitationType
          })
          
          if (options.sendImmediately) {
            await sendInvitation(guest.id)
          }
          
          result.success.push(guest)
          result.successCount++
        } catch (error) {
          result.failed.push({
            data: guestData,
            error: error instanceof Error ? error.message : 'Error desconocido'
          })
          result.failedCount++
        }
      }
      
      return result
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error en envío masivo'
      dispatch({ type: 'SET_ERROR', payload: errorMessage })
      throw error
    }
  }, [addGuest, sendInvitation])

  const resendInvitation = useCallback(async (guestId: string): Promise<void> => {
    await sendInvitation(guestId)
  }, [sendInvitation])

  // ===== CONFIRMACIÓN DE ASISTENCIA =====

  const confirmAttendance = useCallback(async (data: AttendanceFormData): Promise<Guest> => {
    dispatch({ type: 'SET_LOADING', payload: true })
    
    try {
      const guest = getGuestByCode(data.invitationCode)
      if (!guest) {
        throw new Error('Código de invitación inválido')
      }
      
      // Verificar que el nombre coincida (básicamente)
      const nameSimilar = guest.name.toLowerCase().includes(data.name.toLowerCase()) ||
                         data.name.toLowerCase().includes(guest.name.toLowerCase())
      
      if (!nameSimilar) {
        throw new Error('El nombre no coincide con el invitado registrado')
      }
      
      const companions = data.companions 
        ? data.companions.split(',').map(name => name.trim()).filter(name => name.length > 0)
        : []
      
      const updatedGuest = await updateGuest(guest.id, {
        status: data.response === 'yes' ? 'confirmed' : 'declined',
        companions: data.response === 'yes' ? companions : [],
        phone: data.phone, // Actualizar teléfono si cambió
        notes: data.guestNotes ? guest.notes + '\n\nNota del invitado: ' + data.guestNotes : guest.notes
      })
      
      return updatedGuest
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al confirmar asistencia'
      dispatch({ type: 'SET_ERROR', payload: errorMessage })
      throw error
    }
  }, [getGuestByCode, updateGuest])

  // ===== FILTROS Y BÚSQUEDA =====

  const getFilteredGuests = useCallback((
    filters: GuestFilters, 
    pagination?: PaginationOptions
  ): PaginatedGuests => {
    let filtered = filterGuests(state.guests, filters)
    
    // Ordenamiento
    if (pagination?.sortBy) {
      filtered.sort((a, b) => {
        const aVal = a[pagination.sortBy!]
        const bVal = b[pagination.sortBy!]
        
        // Manejar valores undefined o null
        if (aVal == null && bVal == null) return 0
        if (aVal == null) return pagination.sortOrder === 'desc' ? 1 : -1
        if (bVal == null) return pagination.sortOrder === 'desc' ? -1 : 1
        
        if (aVal < bVal) return pagination.sortOrder === 'desc' ? 1 : -1
        if (aVal > bVal) return pagination.sortOrder === 'desc' ? -1 : 1
        return 0
      })
    }
    
    const total = filtered.length
    
    // Paginación
    if (pagination) {
      const startIndex = (pagination.page - 1) * pagination.limit
      const endIndex = startIndex + pagination.limit
      filtered = filtered.slice(startIndex, endIndex)
      
      return {
        guests: filtered,
        total,
        page: pagination.page,
        totalPages: Math.ceil(total / pagination.limit),
        hasNext: endIndex < total,
        hasPrev: pagination.page > 1
      }
    }
    
    return {
      guests: filtered,
      total,
      page: 1,
      totalPages: 1,
      hasNext: false,
      hasPrev: false
    }
  }, [state.guests])

  const searchGuests = useCallback((query: string): Guest[] => {
    return filterGuests(state.guests, { search: query })
  }, [state.guests])

  // ===== ESTADÍSTICAS =====

  const stats = calculateStats(state.guests)
  
  const refreshStats = useCallback(() => {
    // Las estadísticas se calculan automáticamente
    // Esta función existe para compatibilidad con la interfaz
  }, [])

  const getStatsByStatus = useCallback((): Record<GuestStatus, number> => {
    return {
      invited: state.guests.filter(g => g.status === 'invited').length,
      confirmed: state.guests.filter(g => g.status === 'confirmed').length,
      declined: state.guests.filter(g => g.status === 'declined').length,
      pending: state.guests.filter(g => g.status === 'pending').length
    }
  }, [state.guests])

  // ===== UTILIDADES =====

  // ===== HELPER FUNCTIONS FOR EXPORT =====
  
  const generateCSV = useCallback((guests: Guest[], fields: Array<keyof Guest>): Blob => {
    const headers = fields.map(field => {
      switch (field) {
        case 'name': return 'Nombre'
        case 'phone': return 'Teléfono'
        case 'email': return 'Email'
        case 'status': return 'Estado'
        case 'companions': return 'Acompañantes'
        case 'dateInvited': return 'Fecha Invitación'
        case 'dateResponded': return 'Fecha Respuesta'
        case 'invitationType': return 'Tipo Invitación'
        case 'notes': return 'Notas'
        case 'contactAttempts': return 'Intentos Contacto'
        default: return field
      }
    })

    const csvContent = [
      headers.join(','),
      ...guests.map(guest => 
        fields.map(field => {
          const value = guest[field]
          if (field === 'companions') {
            return `"${Array.isArray(value) ? value.join('; ') : ''}"`
          } else if (field === 'dateInvited' || field === 'dateResponded') {
            return value instanceof Date ? value.toLocaleDateString() : 
                   (typeof value === 'string' ? new Date(value).toLocaleDateString() : '')
          } else if (typeof value === 'string' && value.includes(',')) {
            return `"${value}"`
          }
          return value || ''
        }).join(',')
      )
    ].join('\n')

    return new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  }, [])

  const generateExcel = useCallback((guests: Guest[], fields: Array<keyof Guest>): Blob => {
    // Para Excel, usamos CSV con formato compatible
    const csvBlob = generateCSV(guests, fields)
    // Convertimos a formato que Excel puede abrir
    return new Blob([csvBlob], { type: 'application/vnd.ms-excel' })
  }, [generateCSV])

  const exportGuests = useCallback(async (options: ExportData): Promise<Blob> => {
    try {
      const { format, filters, fields } = options
      
      // Aplicar filtros si se especifican
      let filteredGuests = state.guests
      if (filters?.status && filters.status !== 'all') {
        filteredGuests = filteredGuests.filter(guest => guest.status === filters.status)
      }
      if (filters?.invitationType && filters.invitationType !== 'all') {
        filteredGuests = filteredGuests.filter(guest => guest.invitationType === filters.invitationType)
      }
      if (filters?.search) {
        const searchTerm = filters.search.toLowerCase()
        filteredGuests = filteredGuests.filter(guest => 
          guest.name.toLowerCase().includes(searchTerm) ||
          guest.email?.toLowerCase().includes(searchTerm) ||
          guest.phone?.toLowerCase().includes(searchTerm)
        )
      }
      if (filters?.hasCompanions !== undefined) {
        filteredGuests = filteredGuests.filter(guest => 
          filters.hasCompanions ? guest.companions.length > 0 : guest.companions.length === 0
        )
      }
      if (filters?.dateFrom) {
        filteredGuests = filteredGuests.filter(guest => 
          new Date(guest.dateInvited) >= filters.dateFrom!
        )
      }
      if (filters?.dateTo) {
        filteredGuests = filteredGuests.filter(guest => 
          new Date(guest.dateInvited) <= filters.dateTo!
        )
      }

      if (format === 'csv') {
        return generateCSV(filteredGuests, fields)
      } else if (format === 'excel') {
        return generateExcel(filteredGuests, fields)
      } else {
        throw new Error(`Formato no soportado: ${format}`)
      }
    } catch (error) {
      console.error('Error en exportGuests:', error)
      throw error
    }
  }, [state.guests, generateCSV, generateExcel])

  const importGuests = useCallback(async (file: File): Promise<BulkInviteResult> => {
    // Esta función se implementará en una fase posterior
    throw new Error('Importación no implementada aún')
  }, [])

  const loadDemoData = useCallback(() => {
    // Importar dinámicamente los datos demo
    import('@/components/admin/data/demo-guests').then(({ getUpdatedDemoGuests }) => {
      const demoGuests = getUpdatedDemoGuests()
      dispatch({ type: 'LOAD_DEMO_DATA', payload: demoGuests })
      console.log(`📋 Cargados ${demoGuests.length} invitados demo`)
    }).catch(error => {
      console.error('Error cargando datos demo:', error)
      dispatch({ type: 'SET_ERROR', payload: 'Error cargando datos demo' })
    })
  }, [])

  const clearAllData = useCallback(() => {
    dispatch({ type: 'CLEAR_ALL_GUESTS' })
    if (finalConfig.persistData && typeof window !== 'undefined') {
      localStorage.removeItem(finalConfig.storageKey)
    }
  }, [finalConfig.persistData, finalConfig.storageKey])

  const resetToInitialState = useCallback(() => {
    clearAllData()
    if (finalConfig.loadDemoData) {
      loadDemoData()
    }
  }, [clearAllData, loadDemoData, finalConfig.loadDemoData])

  // ===== VALOR DEL CONTEXTO =====

  const contextValue: GuestManagementContextType = {
    // Estado
    guests: state.guests,
    loading: state.loading,
    error: state.error,
    stats,
    
    // Acciones CRUD
    addGuest,
    updateGuest,
    updateGuestStatus,
    deleteGuest,
    getGuest,
    getGuestByCode,
    findGuestByPhone,
    
    // Acciones de invitación
    sendInvitation,
    bulkInvite,
    resendInvitation,
    
    // Confirmación de asistencia
    confirmAttendance,
    
    // Filtros y búsqueda
    getFilteredGuests,
    searchGuests,
    
    // Estadísticas
    refreshStats,
    getStatsByStatus,
    
    // Utilidades
    generateInvitationCode,
    exportGuests,
    importGuests,
    
    // Demo
    loadDemoData,
    clearAllData,
    resetToInitialState
  }

  return (
    <GuestManagementContext.Provider value={contextValue}>
      {children}
    </GuestManagementContext.Provider>
  )
}

// ===== HOOK PERSONALIZADO =====

export function useGuestManagement(): GuestManagementContextType {
  const context = useContext(GuestManagementContext)
  if (!context) {
    throw new Error('useGuestManagement debe usarse dentro de GuestManagementProvider')
  }
  return context
}

export default GuestManagementContext
