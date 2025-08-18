"use client"

import React, { useState, useCallback, useEffect } from 'react'
import { 
  Key, 
  RefreshCw, 
  Copy, 
  Eye, 
  Share, 
  QrCode, 
  Download,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Hash,
  Lock,
  Unlock,
  Calendar,
  Users,
  MapPin
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { useGuestManagement } from '@/context/GuestManagementContext'
import { useToast } from './AnimationsAndFeedback'

// Tipos para códigos únicos
interface InvitationCode {
  id: string
  code: string
  guestId?: string
  guestName?: string
  type: 'individual' | 'family' | 'table' | 'general'
  status: 'active' | 'used' | 'expired' | 'revoked'
  usedAt?: Date
  expiresAt?: Date
  maxUses: number
  currentUses: number
  metadata: {
    tableNumber?: number
    familyGroup?: string
    notes?: string
    allowPlusOnes?: boolean
    maxPlusOnes?: number
  }
  generatedAt: Date
  generatedBy: string
  url: string
}

interface CodeGenerationOptions {
  type: 'individual' | 'family' | 'table' | 'general'
  quantity: number
  prefix?: string
  length: number
  expirationDays?: number
  maxUses: number
  assignToExistingGuests: boolean
  tableNumbers?: number[]
  familyGroups?: string[]
  allowPlusOnes?: boolean
  maxPlusOnes?: number
}

// Utilidades para generar códigos
const generateRandomCode = (length: number = 8, prefix?: string): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  
  return prefix ? `${prefix}-${result}` : result
}

const generateReadableCode = (type: string, index?: number): string => {
  const prefixes = {
    individual: 'INV',
    family: 'FAM',
    table: 'TBL',
    general: 'GEN'
  }
  
  const prefix = prefixes[type as keyof typeof prefixes] || 'INV'
  const suffix = index ? index.toString().padStart(3, '0') : Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  
  return `${prefix}-${suffix}`
}

// Mock del contexto de códigos (en una app real, esto sería un hook de contexto separado)
const useInvitationCodes = () => {
  const [codes, setCodes] = useState<InvitationCode[]>([])
  const { guests } = useGuestManagement()
  const { success, error } = useToast()

  // Cargar códigos del localStorage al iniciar
  useEffect(() => {
    const savedCodes = localStorage.getItem('invitation-codes')
    if (savedCodes) {
      try {
        const parsedCodes = JSON.parse(savedCodes).map((code: Record<string, unknown>) => ({
          ...code,
          generatedAt: new Date(code.generatedAt as string),
          usedAt: code.usedAt ? new Date(code.usedAt as string) : undefined,
          expiresAt: code.expiresAt ? new Date(code.expiresAt as string) : undefined
        }))
        setCodes(parsedCodes)
      } catch (err) {
        console.error('Error loading codes:', err)
      }
    }
  }, [])

  // Guardar códigos en localStorage
  useEffect(() => {
    localStorage.setItem('invitation-codes', JSON.stringify(codes))
  }, [codes])

  const generateCodes = useCallback((options: CodeGenerationOptions): InvitationCode[] => {
    const newCodes: InvitationCode[] = []
    const baseUrl = typeof window !== 'undefined' ? `${window.location.origin}/rsvp` : 'https://example.com/rsvp'
    
    for (let i = 0; i < options.quantity; i++) {
      const code = generateRandomCode(options.length, options.prefix)
      const expiresAt = options.expirationDays 
        ? new Date(Date.now() + options.expirationDays * 24 * 60 * 60 * 1000)
        : undefined

      let assignedGuest = null
      if (options.assignToExistingGuests && guests.length > 0) {
        const availableGuests = guests.filter(g => 
          !codes.some(c => c.guestId === g.id) && 
          !newCodes.some(c => c.guestId === g.id)
        )
        if (availableGuests.length > 0) {
          assignedGuest = availableGuests[i % availableGuests.length]
        }
      }

      const newCode: InvitationCode = {
        id: `code-${Date.now()}-${i}`,
        code,
        guestId: assignedGuest?.id,
        guestName: assignedGuest?.name,
        type: options.type,
        status: 'active',
        maxUses: options.maxUses,
        currentUses: 0,
        metadata: {
          allowPlusOnes: options.allowPlusOnes,
          maxPlusOnes: options.maxPlusOnes,
          tableNumber: options.tableNumbers?.[i % (options.tableNumbers.length || 1)],
          familyGroup: options.familyGroups?.[i % (options.familyGroups.length || 1)]
        },
        generatedAt: new Date(),
        generatedBy: 'admin',
        url: `${baseUrl}?code=${code}`,
        expiresAt
      }

      newCodes.push(newCode)
    }

    setCodes(prev => [...prev, ...newCodes])
    success(`${newCodes.length} códigos generados`, 'Códigos creados exitosamente')
    return newCodes
  }, [codes, guests, success])

  const revokeCode = useCallback((codeId: string) => {
    setCodes(prev => prev.map(code => 
      code.id === codeId 
        ? { ...code, status: 'revoked' as const }
        : code
    ))
    success('Código revocado', 'El código ha sido desactivado')
  }, [success])

  const regenerateCode = useCallback((codeId: string) => {
    setCodes(prev => prev.map(code => {
      if (code.id === codeId) {
        const newCodeValue = generateRandomCode(8, code.code.split('-')[0])
        const baseUrl = typeof window !== 'undefined' ? `${window.location.origin}/rsvp` : 'https://example.com/rsvp'
        return {
          ...code,
          code: newCodeValue,
          url: `${baseUrl}?code=${newCodeValue}`,
          status: 'active' as const,
          currentUses: 0,
          generatedAt: new Date()
        }
      }
      return code
    }))
    success('Código regenerado', 'Se ha creado un nuevo código')
  }, [success])

  const copyToClipboard = useCallback(async (text: string, label: string = 'Código') => {
    try {
      await navigator.clipboard.writeText(text)
      success(`${label} copiado`, 'Copiado al portapapeles')
    } catch (_err) {
      error('Error al copiar', 'No se pudo copiar al portapapeles')
    }
  }, [success, error])

  return {
    codes,
    generateCodes,
    revokeCode,
    regenerateCode,
    copyToClipboard,
    stats: {
      total: codes.length,
      active: codes.filter(c => c.status === 'active').length,
      used: codes.filter(c => c.status === 'used').length,
      expired: codes.filter(c => c.status === 'expired').length,
      revoked: codes.filter(c => c.status === 'revoked').length
    }
  }
}

// Componente para generar códigos
function CodeGenerator({ onGenerate }: { onGenerate: (codes: InvitationCode[]) => void }) {
  const [options, setOptions] = useState<CodeGenerationOptions>({
    type: 'individual',
    quantity: 10,
    prefix: 'INV',
    length: 6,
    expirationDays: 30,
    maxUses: 1,
    assignToExistingGuests: false,
    allowPlusOnes: false,
    maxPlusOnes: 2
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const { generateCodes } = useInvitationCodes()

  const handleGenerate = async () => {
    setIsGenerating(true)
    try {
      const newCodes = generateCodes(options)
      onGenerate(newCodes)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Key className="h-5 w-5" />
          <span>Generar Códigos Únicos</span>
        </CardTitle>
        <CardDescription>
          Crea códigos únicos para invitaciones con diferentes configuraciones
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="type">Tipo de Código</Label>
            <Select value={options.type} onValueChange={(value: 'individual' | 'family' | 'table' | 'general') => setOptions(prev => ({ ...prev, type: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="individual">Individual</SelectItem>
                <SelectItem value="family">Familiar</SelectItem>
                <SelectItem value="table">Por Mesa</SelectItem>
                <SelectItem value="general">General</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Cantidad</Label>
            <Input
              type="number"
              min="1"
              max="100"
              value={options.quantity}
              onChange={(e) => setOptions(prev => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="prefix">Prefijo (opcional)</Label>
            <Input
              value={options.prefix}
              onChange={(e) => setOptions(prev => ({ ...prev, prefix: e.target.value }))}
              placeholder="INV"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="length">Longitud del Código</Label>
            <Select value={options.length.toString()} onValueChange={(value) => setOptions(prev => ({ ...prev, length: parseInt(value) }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="4">4 caracteres</SelectItem>
                <SelectItem value="6">6 caracteres</SelectItem>
                <SelectItem value="8">8 caracteres</SelectItem>
                <SelectItem value="10">10 caracteres</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="expiration">Días de Expiración</Label>
            <Input
              type="number"
              min="1"
              max="365"
              value={options.expirationDays || ''}
              onChange={(e) => setOptions(prev => ({ ...prev, expirationDays: parseInt(e.target.value) || undefined }))}
              placeholder="Sin expiración"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxUses">Máximo de Usos</Label>
            <Input
              type="number"
              min="1"
              max="10"
              value={options.maxUses}
              onChange={(e) => setOptions(prev => ({ ...prev, maxUses: parseInt(e.target.value) || 1 }))}
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch 
              checked={options.assignToExistingGuests}
              onCheckedChange={(checked) => setOptions(prev => ({ ...prev, assignToExistingGuests: checked }))}
            />
            <Label>Asignar a invitados existentes</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch 
              checked={options.allowPlusOnes}
              onCheckedChange={(checked) => setOptions(prev => ({ ...prev, allowPlusOnes: checked }))}
            />
            <Label>Permitir acompañantes</Label>
          </div>

          {options.allowPlusOnes && (
            <div className="space-y-2 ml-6">
              <Label htmlFor="maxPlusOnes">Máximo de acompañantes</Label>
              <Input
                type="number"
                min="1"
                max="5"
                value={options.maxPlusOnes}
                onChange={(e) => setOptions(prev => ({ ...prev, maxPlusOnes: parseInt(e.target.value) || 2 }))}
              />
            </div>
          )}
        </div>

        <Button 
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Generando...
            </>
          ) : (
            <>
              <Key className="h-4 w-4 mr-2" />
              Generar {options.quantity} Código{options.quantity !== 1 ? 's' : ''}
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

// Componente para listar y gestionar códigos
function CodeList() {
  const { codes, revokeCode, regenerateCode, copyToClipboard, stats } = useInvitationCodes()
  const [filter, setFilter] = useState<'all' | 'active' | 'used' | 'expired' | 'revoked'>('all')
  const [search, setSearch] = useState('')

  const filteredCodes = codes.filter(code => {
    const matchesFilter = filter === 'all' || code.status === filter
    const matchesSearch = search === '' || 
      code.code.toLowerCase().includes(search.toLowerCase()) ||
      code.guestName?.toLowerCase().includes(search.toLowerCase())
    
    return matchesFilter && matchesSearch
  })

  const getStatusBadge = (status: InvitationCode['status']) => {
    const variants = {
      active: 'default',
      used: 'secondary',
      expired: 'destructive',
      revoked: 'outline'
    } as const

    const labels = {
      active: 'Activo',
      used: 'Usado',
      expired: 'Expirado',
      revoked: 'Revocado'
    }

    return (
      <Badge variant={variants[status]}>
        {labels[status]}
      </Badge>
    )
  }

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Total</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            <p className="text-xs text-muted-foreground">Activos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.used}</div>
            <p className="text-xs text-muted-foreground">Usados</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{stats.expired}</div>
            <p className="text-xs text-muted-foreground">Expirados</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-600">{stats.revoked}</div>
            <p className="text-xs text-muted-foreground">Revocados</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Buscar por código o nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />
        <Select value={filter} onValueChange={(value: 'all' | 'active' | 'used' | 'expired' | 'revoked') => setFilter(value)}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="active">Activos</SelectItem>
            <SelectItem value="used">Usados</SelectItem>
            <SelectItem value="expired">Expirados</SelectItem>
            <SelectItem value="revoked">Revocados</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Invitado</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Usos</TableHead>
                <TableHead>Expira</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCodes.map((code) => (
                <TableRow key={code.id}>
                  <TableCell className="font-mono">
                    <div className="flex items-center space-x-2">
                      <span>{code.code}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(code.code, 'Código')}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {code.type === 'individual' && 'Individual'}
                      {code.type === 'family' && 'Familiar'}
                      {code.type === 'table' && 'Mesa'}
                      {code.type === 'general' && 'General'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {code.guestName || (
                      <span className="text-muted-foreground">Sin asignar</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(code.status)}
                  </TableCell>
                  <TableCell>
                    <span className={code.currentUses >= code.maxUses ? 'text-red-600' : ''}>
                      {code.currentUses}/{code.maxUses}
                    </span>
                  </TableCell>
                  <TableCell>
                    {code.expiresAt ? (
                      <span className={code.expiresAt < new Date() ? 'text-red-600' : ''}>
                        {code.expiresAt.toLocaleDateString()}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">Sin expiración</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(code.url, 'URL')}
                        title="Copiar URL"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => regenerateCode(code.id)}
                        disabled={code.status === 'revoked'}
                        title="Regenerar código"
                      >
                        <RefreshCw className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => revokeCode(code.id)}
                        disabled={code.status === 'revoked'}
                        title="Revocar código"
                      >
                        {code.status === 'revoked' ? (
                          <Lock className="h-3 w-3" />
                        ) : (
                          <Unlock className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredCodes.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No se encontraron códigos con los filtros aplicados
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Componente principal
export function UniqueInvitationCodes() {
  const [activeTab, setActiveTab] = useState<'generate' | 'manage'>('generate')
  const [generatedCodes, setGeneratedCodes] = useState<InvitationCode[]>([])

  const handleCodesGenerated = (codes: InvitationCode[]) => {
    setGeneratedCodes(codes)
    setActiveTab('manage')
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Códigos Únicos de Invitación</h2>
        <p className="text-muted-foreground">
          Genera y gestiona códigos únicos para controlar el acceso a las invitaciones
        </p>
      </div>

      <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
        <Button
          variant={activeTab === 'generate' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('generate')}
        >
          <Key className="h-4 w-4 mr-2" />
          Generar
        </Button>
        <Button
          variant={activeTab === 'manage' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('manage')}
        >
          <Users className="h-4 w-4 mr-2" />
          Gestionar
        </Button>
      </div>

      {activeTab === 'generate' && (
        <CodeGenerator onGenerate={handleCodesGenerated} />
      )}

      {activeTab === 'manage' && (
        <CodeList />
      )}
    </div>
  )
}

export default UniqueInvitationCodes
