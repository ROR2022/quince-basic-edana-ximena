// 📋 TIPOS PARA SISTEMA DE GESTIÓN DE INVITADOS
// Fecha: Agosto 11, 2025
// Descripción: Definiciones TypeScript para el sistema demo de gestión de invitaciones

/**
 * Estados posibles de un invitado
 */
export type GuestStatus = 
  | 'invited'    // Invitación enviada, sin respuesta
  | 'confirmed'  // Confirmó asistencia
  | 'declined'   // Declinó asistencia
  | 'pending'    // Pendiente de envío de invitación

/**
 * Tipos de invitación disponibles
 */
export type InvitationType = 
  | 'whatsapp'   // Envío por WhatsApp
  | 'email'      // Envío por Email
  | 'manual'     // Entrega manual/personal

/**
 * Interfaz principal para un invitado
 */
export interface Guest {
  /** ID único del invitado */
  id: string
  
  /** Nombre completo del invitado */
  name: string
  
  /** Número de teléfono (requerido) */
  phone: string
  
  /** Email (opcional) */
  email?: string
  
  /** Estado actual del invitado */
  status: GuestStatus
  
  /** Lista de acompañantes confirmados */
  companions: string[]
  
  /** Fecha en que se envió la invitación */
  dateInvited: Date
  
  /** Fecha en que respondió (si ya respondió) */
  dateResponded?: Date
  
  /** Fecha en que confirmó asistencia (formato ISO string) */
  confirmedAt?: string
  
  /** Código único para acceder al formulario de confirmación */
  invitationCode: string
  
  /** Tipo de invitación enviada */
  invitationType: InvitationType
  
  /** Notas adicionales sobre el invitado */
  notes?: string
  
  /** Número de intentos de contacto */
  contactAttempts: number
  
  /** Fecha del último intento de contacto */
  lastContactDate?: Date
}

/**
 * Datos para crear un nuevo invitado
 */
export interface CreateGuestData {
  name: string
  phone: string
  email?: string
  invitationType: InvitationType
  notes?: string
}

/**
 * Datos para actualizar un invitado existente
 */
export interface UpdateGuestData {
  name?: string
  phone?: string
  email?: string
  notes?: string
  status?: GuestStatus
  companions?: string[]
  contactAttempts?: number
  lastContactDate?: Date
  confirmedAt?: string
}

/**
 * Datos que se reciben del formulario de confirmación
 */
export interface AttendanceFormData {
  /** Código de invitación */
  invitationCode: string
  
  /** Nombre del invitado (para verificación) */
  name: string
  
  /** Respuesta de asistencia */
  response: 'yes' | 'no'
  
  /** Nombres de acompañantes (si confirma asistencia) */
  companions?: string
  
  /** Número de teléfono */
  phone: string
  
  /** Notas adicionales del invitado */
  guestNotes?: string
}

/**
 * Estadísticas de invitados
 */
export interface GuestStats {
  /** Total de invitados */
  total: number
  
  /** Invitados que confirmaron asistencia */
  confirmed: number
  
  /** Invitados que declinaron */
  declined: number
  
  /** Invitados pendientes de respuesta */
  pending: number
  
  /** Invitaciones no enviadas aún */
  notInvited: number
  
  /** Total de personas confirmadas (incluyendo acompañantes) */
  totalConfirmedPeople: number
  
  /** Porcentaje de respuesta */
  responseRate: number
  
  /** Porcentaje de confirmación */
  confirmationRate: number
}

/**
 * Filtros para la tabla de invitados
 */
export interface GuestFilters {
  /** Filtro por estado */
  status?: GuestStatus | 'all'
  
  /** Filtro por tipo de invitación */
  invitationType?: InvitationType | 'all'
  
  /** Búsqueda por texto (nombre, teléfono) */
  search?: string
  
  /** Filtro por fecha de invitación */
  dateFrom?: Date
  dateTo?: Date
  
  /** Solo invitados con acompañantes */
  hasCompanions?: boolean
}

/**
 * Opciones de paginación
 */
export interface PaginationOptions {
  /** Página actual (empezando en 1) */
  page: number
  
  /** Elementos por página */
  limit: number
  
  /** Campo por el cual ordenar */
  sortBy?: keyof Guest
  
  /** Dirección del ordenamiento */
  sortOrder?: 'asc' | 'desc'
}

/**
 * Resultado paginado de invitados
 */
export interface PaginatedGuests {
  /** Lista de invitados */
  guests: Guest[]
  
  /** Total de invitados (sin paginación) */
  total: number
  
  /** Página actual */
  page: number
  
  /** Total de páginas */
  totalPages: number
  
  /** ¿Hay página siguiente? */
  hasNext: boolean
  
  /** ¿Hay página anterior? */
  hasPrev: boolean
}

/**
 * Opciones para envío masivo de invitaciones
 */
export interface BulkInviteOptions {
  /** Lista de invitados a crear */
  guests: CreateGuestData[]
  
  /** Tipo de invitación por defecto */
  defaultInvitationType: InvitationType
  
  /** Enviar inmediatamente o solo crear */
  sendImmediately: boolean
  
  /** Plantilla de mensaje personalizada */
  customMessage?: string
}

/**
 * Resultado del envío masivo
 */
export interface BulkInviteResult {
  /** Invitados creados exitosamente */
  success: Guest[]
  
  /** Invitados que fallaron */
  failed: Array<{
    data: CreateGuestData
    error: string
  }>
  
  /** Total procesados */
  total: number
  
  /** Total exitosos */
  successCount: number
  
  /** Total fallidos */
  failedCount: number
}

/**
 * Configuración de notificaciones
 */
export interface NotificationConfig {
  /** Activar notificaciones de nuevas confirmaciones */
  newConfirmations: boolean
  
  /** Activar notificaciones de declinaciones */
  declines: boolean
  
  /** Activar recordatorios de seguimiento */
  followUpReminders: boolean
  
  /** Días para recordatorio de seguimiento */
  followUpDays: number
}

/**
 * Datos para exportación
 */
export interface ExportData {
  /** Formato de exportación */
  format: 'csv' | 'excel' | 'pdf'
  
  /** Filtros aplicados */
  filters?: GuestFilters
  
  /** Campos a incluir */
  fields: Array<keyof Guest>
  
  /** Incluir estadísticas */
  includeStats: boolean
}

/**
 * Plantilla de invitación
 */
export interface InvitationTemplate {
  /** ID de la plantilla */
  id: string
  
  /** Nombre de la plantilla */
  name: string
  
  /** Asunto (para email) */
  subject?: string
  
  /** Mensaje de la invitación */
  message: string
  
  /** Variables disponibles en la plantilla */
  variables: string[]
  
  /** Tipo de invitación compatible */
  compatibleWith: InvitationType[]
}

/**
 * Contexto de gestión de invitados
 */
export interface GuestManagementContextType {
  // Estado
  guests: Guest[]
  loading: boolean
  error: string | null
  stats: GuestStats
  
  // Acciones CRUD
  addGuest: (data: CreateGuestData) => Promise<Guest>
  updateGuest: (id: string, data: UpdateGuestData) => Promise<Guest>
  updateGuestStatus: (id: string, status: GuestStatus, data?: Partial<Guest>) => Promise<Guest>
  deleteGuest: (id: string) => Promise<void>
  getGuest: (id: string) => Guest | undefined
  getGuestByCode: (code: string) => Guest | undefined
  findGuestByPhone: (phone: string) => Guest | undefined
  
  // Acciones de invitación
  sendInvitation: (guestId: string) => Promise<void>
  bulkInvite: (options: BulkInviteOptions) => Promise<BulkInviteResult>
  resendInvitation: (guestId: string) => Promise<void>
  
  // Confirmación de asistencia
  confirmAttendance: (data: AttendanceFormData) => Promise<Guest>
  
  // Filtros y búsqueda
  getFilteredGuests: (filters: GuestFilters, pagination?: PaginationOptions) => PaginatedGuests
  searchGuests: (query: string) => Guest[]
  
  // Estadísticas
  refreshStats: () => void
  getStatsByStatus: () => Record<GuestStatus, number>
  
  // Utilidades
  generateInvitationCode: () => string
  exportGuests: (options: ExportData) => Promise<Blob>
  importGuests: (file: File) => Promise<BulkInviteResult>
  
  // Demo
  loadDemoData: () => void
  clearAllData: () => void
  resetToInitialState: () => void
}

/**
 * Configuración inicial para el contexto
 */
export interface GuestManagementConfig {
  /** Cargar datos demo al inicializar */
  loadDemoData: boolean
  
  /** Persistir datos en localStorage */
  persistData: boolean
  
  /** Clave para localStorage */
  storageKey: string
  
  /** Configuración de notificaciones */
  notifications: NotificationConfig
}
