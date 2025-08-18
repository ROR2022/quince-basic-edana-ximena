"use client"

import React, { useState } from 'react'
import { 
  Users, 
  Settings, 
  Send, 
  Eye, 
  BarChart3, 
  UserPlus, 
  Bell, 
  Download,
  Calendar,
  Home,
  LogOut,
  Menu,
  X,
  Hash,
  Clock
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { 
  GuestManagementProvider, 
  useGuestManagement 
} from '@/context/GuestManagementContext'

// Importar todos nuestros componentes
import { GuestManagement } from './GuestManagement'
import { InvitationSender } from './InvitationSender'
import { NotificationSimulator } from './NotificationSimulator'
import { InvitationPreview } from './InvitationPreview'
import { BasicAttendance } from './BasicAttendance'
import { DataExportImport } from './DataExportImport'
import { UniqueInvitationCodes } from './UniqueInvitationCodes'
import { AdvancedAnalytics } from './AdvancedAnalytics'
import { AutomatedReminders } from './AutomatedReminders'
import { ToastProvider, useToast, AnimatedCard, SuccessAnimation, FloatingActionButton, triggerConfetti } from './AnimationsAndFeedback'

// Tipos para la navegación
type AdminSection = 
  | 'dashboard' 
  | 'guests' 
  | 'invitations' 
  | 'notifications' 
  | 'preview' 
  | 'attendance' 
  | 'analytics'
  | 'export'
  | 'codes'
  | 'reminders'

interface NavigationItem {
  id: AdminSection
  label: string
  icon: React.ComponentType<{ className?: string }>
  description: string
  badge?: string | number
}

// Componente de Login
function AdminLogin({ 
  onLogin 
}: { 
  onLogin: (credentials: { user: string, password: string }) => void 
}) {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !password) return

    setIsLoading(true)
    setError('')
    
    try {
      // Simular autenticación
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Credenciales demo
      if (user === 'admin' && password === 'demo123') {
        onLogin({ user, password })
      } else {
        setError('Credenciales incorrectas. Usa: admin / demo123')
      }
    } catch (_err) {
      setError('Error de conexión')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Panel de Administración
          </CardTitle>
          <CardDescription>
            Sistema de Gestión de Invitados
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                Usuario
              </label>
              <Input
                id="username"
                type="text"
                placeholder="Ingresa tu usuario"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Contraseña
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
                {error}
              </div>
            )}
            
            {/* Credenciales demo */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="text-sm font-medium text-blue-900 mb-1">
                💡 Credenciales Demo
              </div>
              <div className="text-sm text-blue-800">
                Usuario: <code className="bg-blue-100 px-1 rounded">admin</code><br />
                Contraseña: <code className="bg-blue-100 px-1 rounded">demo123</code>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading || !user || !password}
            >
              {isLoading ? 'Verificando...' : 'Iniciar Sesión'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

// Sidebar de navegación
function AdminSidebar({ 
  activeSection, 
  onSectionChange, 
  stats,
  isMobile = false,
  onClose 
}: {
  activeSection: AdminSection
  onSectionChange: (section: AdminSection) => void
  stats: {
    total: number
    confirmed: number
    declined: number
    pending: number
    notInvited: number
    totalConfirmedPeople: number
    responseRate: number
  }
  isMobile?: boolean
  onClose?: () => void
}) {
  const navigationItems: NavigationItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      description: 'Resumen general'
    },
    {
      id: 'guests',
      label: 'Gestión de Invitados',
      icon: Users,
      description: 'Lista y gestión completa',
      badge: stats.total
    },
    {
      id: 'invitations',
      label: 'Agregar Invitados',
      icon: UserPlus,
      description: 'Formularios de registro'
    },
    {
      id: 'notifications',
      label: 'Notificaciones',
      icon: Bell,
      description: 'Envío y seguimiento',
      badge: stats.pending
    },
    {
      id: 'preview',
      label: 'Vista Previa',
      icon: Eye,
      description: 'Preview de invitaciones'
    },
    {
      id: 'attendance',
      label: 'Confirmaciones',
      icon: Calendar,
      description: 'Portal público',
      badge: stats.confirmed
    },
    {
      id: 'analytics',
      label: 'Analíticas',
      icon: BarChart3,
      description: 'Reportes y estadísticas'
    },
    {
      id: 'export',
      label: 'Exportar/Importar',
      icon: Download,
      description: 'Gestión de datos'
    },
    {
      id: 'codes',
      label: 'Códigos Únicos',
      icon: Hash,
      description: 'Códigos de acceso'
    },
    {
      id: 'reminders',
      label: 'Recordatorios',
      icon: Clock,
      description: 'Recordatorios automáticos'
    }
  ]

  const handleItemClick = (section: AdminSection) => {
    onSectionChange(section)
    if (isMobile && onClose) {
      onClose()
    }
  }

  return (
    <div className="h-full flex flex-col bg-white border-r">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Admin Panel</h2>
            <p className="text-sm text-gray-500">Gestión de Invitados</p>
          </div>
          {isMobile && onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id
          
          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                isActive 
                  ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{item.label}</div>
                <div className="text-xs text-gray-500 truncate">{item.description}</div>
              </div>
              {item.badge && (
                <Badge variant={isActive ? 'default' : 'secondary'} className="ml-auto">
                  {item.badge}
                </Badge>
              )}
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t">
        <Button variant="ghost" className="w-full justify-start text-gray-600">
          <LogOut className="h-4 w-4 mr-2" />
          Cerrar Sesión
        </Button>
      </div>
    </div>
  )
}

// Dashboard principal
function AdminDashboard({ 
  stats, 
  onNavigate 
}: { 
  stats: {
    total: number
    confirmed: number
    declined: number
    pending: number
    notInvited: number
    totalConfirmedPeople: number
    responseRate: number
  }
  onNavigate: (section: AdminSection) => void 
}) {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onNavigate('guests')}
        >
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{stats.total}</div>
                <div className="text-sm text-gray-600">Total Invitados</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onNavigate('attendance')}
        >
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold">{stats.confirmed}</div>
                <div className="text-sm text-gray-600">Confirmados</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onNavigate('notifications')}
        >
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Send className="h-8 w-8 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold">{stats.notInvited}</div>
                <div className="text-sm text-gray-600">Sin Invitar</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onNavigate('reminders')}
        >
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Bell className="h-8 w-8 text-red-600" />
              <div>
                <div className="text-2xl font-bold">{stats.pending}</div>
                <div className="text-sm text-gray-600">Pendientes</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
          <CardDescription>
            Las acciones más comunes para gestionar tu evento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              className="h-20 flex-col space-y-2"
              onClick={() => onNavigate('invitations')}
            >
              <UserPlus className="h-6 w-6" />
              <span>Agregar Invitados</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col space-y-2"
              onClick={() => onNavigate('notifications')}
            >
              <Send className="h-6 w-6" />
              <span>Enviar Invitaciones</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col space-y-2"
              onClick={() => onNavigate('preview')}
            >
              <Eye className="h-6 w-6" />
              <span>Vista Previa</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col space-y-2"
              onClick={() => onNavigate('export')}
            >
              <Download className="h-6 w-6" />
              <span>Exportar Lista</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Demo Note */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <Settings className="h-6 w-6 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                🎉 Sistema de Gestión de Invitados - Demo Completo
              </h3>
              <p className="text-blue-800 mb-4">
                Este es un sistema completo de gestión de invitados que incluye todas las funcionalidades 
                necesarias para organizar tu evento: desde agregar invitados hasta hacer seguimiento 
                de confirmaciones y enviar recordatorios.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium text-blue-900 mb-2">✨ Funcionalidades Principales:</h4>
                  <ul className="space-y-1 text-blue-700">
                    <li>• Gestión completa de invitados</li>
                    <li>• Envío de invitaciones por WhatsApp/Email</li>
                    <li>• Portal de confirmación público</li>
                    <li>• Seguimiento en tiempo real</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-blue-900 mb-2">🚀 Herramientas Avanzadas:</h4>
                  <ul className="space-y-1 text-blue-700">
                    <li>• Vista previa de invitaciones</li>
                    <li>• Simulador de notificaciones</li>
                    <li>• Analíticas y reportes</li>
                    <li>• Exportación de datos</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Componente principal del admin integrado
function AdminContent() {
  const { stats } = useGuestManagement()
  const { success, info } = useToast()
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)

  const handleSectionChange = (section: AdminSection) => {
    setActiveSection(section)
    info(`Navegando a ${getSectionLabel(section)}`, 'Sección cargada')
  }

  const getSectionLabel = (section: AdminSection): string => {
    const labels = {
      dashboard: 'Dashboard',
      guests: 'Gestión de Invitados',
      invitations: 'Agregar Invitados',
      notifications: 'Notificaciones',
      preview: 'Vista Previa',
      attendance: 'Confirmaciones',
      analytics: 'Analíticas',
      export: 'Exportar/Importar',
      codes: 'Códigos Únicos',
      reminders: 'Recordatorios'
    }
    return labels[section] || section
  }

  const renderContent = () => {
    const ContentComponent = () => {
      switch (activeSection) {
        case 'dashboard':
          return <AdminDashboard stats={stats} onNavigate={handleSectionChange} />
        case 'guests':
          return <GuestManagement onNavigate={handleSectionChange} />
        case 'invitations':
          return <InvitationSender />
        case 'notifications':
          return <NotificationSimulator />
        case 'preview':
          return <InvitationPreview />
        case 'attendance':
          return <BasicAttendance />
        case 'analytics':
          return <AdvancedAnalytics />
        case 'export':
          return <DataExportImport />
        case 'codes':
          return <UniqueInvitationCodes />
        case 'reminders':
          return <AutomatedReminders />
        default:
          return <AdminDashboard stats={stats} onNavigate={handleSectionChange} />
      }
    }

    return (
      <AnimatedCard key={activeSection} className="h-full">
        <ContentComponent />
      </AnimatedCard>
    )
  }

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-80">
        <AdminSidebar 
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
          stats={stats}
        />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-80 p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Menú de Navegación</SheetTitle>
            <SheetDescription>
              Menú principal para navegar entre las secciones del sistema de gestión de invitados
            </SheetDescription>
          </SheetHeader>
          <AdminSidebar 
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
            stats={stats}
            isMobile={true}
            onClose={() => setIsMobileMenuOpen(false)}
          />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {activeSection === 'dashboard' && 'Dashboard'}
                  {activeSection === 'guests' && 'Gestión de Invitados'}
                  {activeSection === 'invitations' && 'Agregar Invitados'}
                  {activeSection === 'notifications' && 'Notificaciones'}
                  {activeSection === 'preview' && 'Vista Previa'}
                  {activeSection === 'attendance' && 'Confirmaciones'}
                  {activeSection === 'analytics' && 'Analíticas'}
                  {activeSection === 'export' && 'Exportar/Importar'}
                  {activeSection === 'codes' && 'Códigos Únicos'}
                  {activeSection === 'reminders' && 'Recordatorios'}
                </h1>
                <p className="text-sm text-gray-500">
                  Sistema de Gestión de Invitados
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="outline">
                {stats.total} invitados
              </Badge>
              {/* Theme toggle ocultado por petición del usuario */}
              {/* <ThemeToggle /> */}
              {/* Botón de configuración ocultado por petición del usuario */}
              {/* <Button variant="ghost" size="sm" title="Configuración">
                <Settings className="h-4 w-4" />
              </Button> */}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          {renderContent()}
        </main>
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton
        onClick={() => {
          triggerConfetti()
          success('¡Invitaciones enviadas!', '🎉 ¡Gran trabajo!')
          setShowSuccessAnimation(true)
        }}
        icon={Send}
        label="Enviar todas las invitaciones"
        color="green"
      />

      {/* Success Animation */}
      <SuccessAnimation 
        show={showSuccessAnimation}
        onComplete={() => setShowSuccessAnimation(false)}
      />
    </div>
  )
}

// Componente wrapper que provee todos los contextos necesarios
function AdminContentWrapper() {
  return (
    <ToastProvider>
      <GuestManagementProvider config={{ loadDemoData: true, persistData: true }}>
        <AdminContent />
      </GuestManagementProvider>
    </ToastProvider>
  )
}

// Componente principal que maneja autenticación
const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = (_credentials: { user: string, password: string }) => {
    setIsAuthenticated(true)
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />
  }

  return <AdminContentWrapper />
}

export default AdminPage