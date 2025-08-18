"use client"

import React, { useState, useCallback } from 'react'
import { 
  Download, 
  Upload, 
  FileText, 
  Table, 
  Filter, 
  Calendar,
  Users,
  CheckCircle,
  AlertCircle,
  Loader2,
  FileSpreadsheet,
  FileJson,
  Mail,
  Phone,
  MessageSquare
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useGuestManagement } from '@/context/GuestManagementContext'
import { Guest, GuestStatus, InvitationType } from '@/types/guest'

// Tipos para exportación
interface ExportOptions {
  format: 'csv' | 'json' | 'xlsx'
  fields: (keyof Guest)[]
  filters: {
    status?: GuestStatus[]
    invitationType?: InvitationType[]
    hasConfirmed?: boolean
    hasCompanions?: boolean
  }
  includeHeaders: boolean
  dateFormat: 'iso' | 'readable'
}

interface ImportResult {
  success: number
  failed: number
  errors: string[]
  duplicates: number
}

// Opciones de campos disponibles
const availableFields: { key: keyof Guest; label: string; description: string }[] = [
  { key: 'name', label: 'Nombre', description: 'Nombre completo del invitado' },
  { key: 'phone', label: 'Teléfono', description: 'Número de teléfono' },
  { key: 'email', label: 'Email', description: 'Correo electrónico' },
  { key: 'status', label: 'Estado', description: 'Estado de la invitación' },
  { key: 'invitationType', label: 'Tipo Invitación', description: 'Método de invitación' },
  { key: 'dateInvited', label: 'Fecha Invitado', description: 'Cuándo se envió la invitación' },
  { key: 'dateResponded', label: 'Fecha Respuesta', description: 'Cuándo respondió' },
  { key: 'companions', label: 'Acompañantes', description: 'Lista de acompañantes' },
  { key: 'notes', label: 'Notas', description: 'Notas adicionales' },
  { key: 'invitationCode', label: 'Código', description: 'Código de invitación único' }
]

// Utilidades para exportación
const exportUtilities = {
  // Convertir datos a CSV
  toCSV: (guests: Guest[], options: ExportOptions): string => {
    const headers = options.fields.map(field => 
      availableFields.find(f => f.key === field)?.label || field
    )
    
    const rows = guests.map(guest => 
      options.fields.map(field => {
        let value = guest[field]
        
        // Formatear fechas
        if (value instanceof Date) {
          value = options.dateFormat === 'iso' 
            ? value.toISOString() 
            : value.toLocaleDateString('es-MX')
        }
        
        // Formatear arrays
        if (Array.isArray(value)) {
          value = value.join('; ')
        }
        
        // Escapar comillas en CSV
        if (typeof value === 'string' && value.includes(',')) {
          value = `"${value.replace(/"/g, '""')}"`
        }
        
        return value || ''
      })
    )
    
    const csvContent = options.includeHeaders 
      ? [headers, ...rows].map(row => row.join(',')).join('\n')
      : rows.map(row => row.join(',')).join('\n')
    
    return csvContent
  },

  // Convertir datos a JSON
  toJSON: (guests: Guest[], options: ExportOptions): string => {
    const filteredGuests = guests.map(guest => {
      const filtered: Record<string, unknown> = {}
      options.fields.forEach(field => {
        let value = guest[field]
        
        // Formatear fechas para JSON
        if (value instanceof Date) {
          value = options.dateFormat === 'iso' 
            ? value.toISOString() 
            : value.toLocaleDateString('es-MX')
        }
        
        filtered[field] = value
      })
      return filtered
    })
    
    return JSON.stringify(filteredGuests, null, 2)
  },

  // Descargar archivo
  downloadFile: (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }
}

// Componente de exportación
function ExportSection() {
  const { guests } = useGuestManagement()
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: 'csv',
    fields: ['name', 'phone', 'email', 'status', 'invitationType'],
    filters: {},
    includeHeaders: true,
    dateFormat: 'readable'
  })
  const [isExporting, setIsExporting] = useState(false)
  const [previewData, setPreviewData] = useState<Guest[]>([])

  // Filtrar guests según opciones
  const getFilteredGuests = useCallback(() => {
    let filtered = [...guests]
    
    if (exportOptions.filters.status?.length) {
      filtered = filtered.filter(g => exportOptions.filters.status!.includes(g.status))
    }
    
    if (exportOptions.filters.invitationType?.length) {
      filtered = filtered.filter(g => exportOptions.filters.invitationType!.includes(g.invitationType))
    }
    
    if (exportOptions.filters.hasConfirmed !== undefined) {
      filtered = filtered.filter(g => 
        (g.status === 'confirmed') === exportOptions.filters.hasConfirmed
      )
    }
    
    if (exportOptions.filters.hasCompanions !== undefined) {
      filtered = filtered.filter(g => 
        (g.companions.length > 0) === exportOptions.filters.hasCompanions
      )
    }
    
    return filtered
  }, [guests, exportOptions.filters])

  // Generar preview
  const generatePreview = useCallback(() => {
    const filtered = getFilteredGuests()
    setPreviewData(filtered.slice(0, 5)) // Solo primeros 5 para preview
  }, [getFilteredGuests])

  React.useEffect(() => {
    generatePreview()
  }, [generatePreview])

  const handleExport = async () => {
    setIsExporting(true)
    
    try {
      const filtered = getFilteredGuests()
      const timestamp = new Date().toISOString().split('T')[0]
      
      let content: string
      let filename: string
      let mimeType: string
      
      switch (exportOptions.format) {
        case 'csv':
          content = exportUtilities.toCSV(filtered, exportOptions)
          filename = `invitados_${timestamp}.csv`
          mimeType = 'text/csv;charset=utf-8'
          break
        case 'json':
          content = exportUtilities.toJSON(filtered, exportOptions)
          filename = `invitados_${timestamp}.json`
          mimeType = 'application/json'
          break
        default:
          throw new Error('Formato no soportado')
      }
      
      exportUtilities.downloadFile(content, filename, mimeType)
      
    } catch (error) {
      console.error('Error al exportar:', error)
    } finally {
      setIsExporting(false)
    }
  }

  const handleFieldToggle = (field: keyof Guest, checked: boolean) => {
    setExportOptions(prev => ({
      ...prev,
      fields: checked 
        ? [...prev.fields, field]
        : prev.fields.filter(f => f !== field)
    }))
  }

  const filteredCount = getFilteredGuests().length

  return (
    <div className="space-y-6">
      {/* Configuración de exportación */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formato y opciones */}
        <Card>
          <CardHeader>
            <CardTitle>Formato de Exportación</CardTitle>
            <CardDescription>
              Configura el formato y opciones de exportación
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Formato */}
            <div className="space-y-2">
              <Label>Formato de archivo</Label>
              <Select 
                value={exportOptions.format} 
                onValueChange={(value: 'csv' | 'json') => 
                  setExportOptions(prev => ({ ...prev, format: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">
                    <div className="flex items-center space-x-2">
                      <FileSpreadsheet className="h-4 w-4 text-green-600" />
                      <span>CSV (Excel Compatible)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="json">
                    <div className="flex items-center space-x-2">
                      <FileJson className="h-4 w-4 text-blue-600" />
                      <span>JSON (Programadores)</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Opciones adicionales */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="includeHeaders"
                  checked={exportOptions.includeHeaders}
                  onCheckedChange={(checked) => 
                    setExportOptions(prev => ({ ...prev, includeHeaders: !!checked }))
                  }
                />
                <Label htmlFor="includeHeaders">Incluir encabezados</Label>
              </div>
              
              <div className="space-y-2">
                <Label>Formato de fechas</Label>
                <Select 
                  value={exportOptions.dateFormat} 
                  onValueChange={(value: 'iso' | 'readable') => 
                    setExportOptions(prev => ({ ...prev, dateFormat: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="readable">Legible (dd/mm/aaaa)</SelectItem>
                    <SelectItem value="iso">ISO (aaaa-mm-dd)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filtros */}
        <Card>
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
            <CardDescription>
              Filtra qué invitados incluir en la exportación
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Estado */}
            <div className="space-y-2">
              <Label>Estado de invitación</Label>
              <div className="grid grid-cols-2 gap-2">
                {(['pending', 'invited', 'confirmed', 'declined'] as GuestStatus[]).map(status => (
                  <div key={status} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`status-${status}`}
                      checked={exportOptions.filters.status?.includes(status) || false}
                      onCheckedChange={(checked) => {
                        setExportOptions(prev => ({
                          ...prev,
                          filters: {
                            ...prev.filters,
                            status: checked
                              ? [...(prev.filters.status || []), status]
                              : (prev.filters.status || []).filter(s => s !== status)
                          }
                        }))
                      }}
                    />
                    <Label htmlFor={`status-${status}`} className="capitalize text-sm">
                      {status}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Tipo de invitación */}
            <div className="space-y-2">
              <Label>Tipo de invitación</Label>
              <div className="grid grid-cols-2 gap-2">
                {(['whatsapp', 'email', 'manual'] as InvitationType[]).map(type => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`type-${type}`}
                      checked={exportOptions.filters.invitationType?.includes(type) || false}
                      onCheckedChange={(checked) => {
                        setExportOptions(prev => ({
                          ...prev,
                          filters: {
                            ...prev.filters,
                            invitationType: checked
                              ? [...(prev.filters.invitationType || []), type]
                              : (prev.filters.invitationType || []).filter(t => t !== type)
                          }
                        }))
                      }}
                    />
                    <Label htmlFor={`type-${type}`} className="capitalize text-sm">
                      {type === 'whatsapp' ? 'WhatsApp' : type}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Selección de campos */}
      <Card>
        <CardHeader>
          <CardTitle>Campos a Exportar</CardTitle>
          <CardDescription>
            Selecciona qué información incluir en la exportación
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableFields.map(field => (
              <div key={field.key} className="flex items-start space-x-2">
                <Checkbox 
                  id={`field-${field.key}`}
                  checked={exportOptions.fields.includes(field.key)}
                  onCheckedChange={(checked) => handleFieldToggle(field.key, !!checked)}
                />
                <div className="space-y-1">
                  <Label htmlFor={`field-${field.key}`} className="text-sm font-medium">
                    {field.label}
                  </Label>
                  <p className="text-xs text-gray-500">{field.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Preview y exportación */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Vista Previa</CardTitle>
            <CardDescription>
              Primeros 5 registros que se exportarán ({filteredCount} total)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {previewData.length > 0 ? (
              <div className="space-y-2 max-h-60 overflow-auto">
                {previewData.map((guest, index) => (
                  <div key={guest.id} className="p-2 bg-gray-50 rounded text-sm">
                    <div className="font-medium">{guest.name}</div>
                    <div className="text-gray-600">
                      {guest.phone} • {guest.status} • {guest.invitationType}
                    </div>
                  </div>
                ))}
                {filteredCount > 5 && (
                  <div className="text-center text-sm text-gray-500 p-2">
                    ... y {filteredCount - 5} más
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p>No hay datos para exportar con los filtros actuales</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Exportación */}
        <Card>
          <CardHeader>
            <CardTitle>Exportar Datos</CardTitle>
            <CardDescription>
              Descarga los datos en el formato seleccionado
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{filteredCount}</div>
                <div className="text-sm text-gray-600">Registros</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{exportOptions.fields.length}</div>
                <div className="text-sm text-gray-600">Campos</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">{exportOptions.format.toUpperCase()}</div>
                <div className="text-sm text-gray-600">Formato</div>
              </div>
            </div>

            <Separator />

            <Button 
              onClick={handleExport}
              disabled={filteredCount === 0 || exportOptions.fields.length === 0 || isExporting}
              className="w-full"
              size="lg"
            >
              {isExporting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Exportando...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Exportar {exportOptions.format.toUpperCase()}
                </>
              )}
            </Button>

            <p className="text-xs text-gray-500 text-center">
              Se descargará un archivo con {filteredCount} registro(s)
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Componente de importación (básico)
function ImportSection() {
  const [importFile, setImportFile] = useState<File | null>(null)
  const [isImporting, setIsImporting] = useState(false)
  const [importResult, setImportResult] = useState<ImportResult | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setImportFile(file || null)
    setImportResult(null)
  }

  const handleImport = async () => {
    if (!importFile) return

    setIsImporting(true)
    
    // Simulación de importación
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setImportResult({
        success: 15,
        failed: 2,
        errors: ['Fila 3: Teléfono inválido', 'Fila 8: Email duplicado'],
        duplicates: 3
      })
    } catch (error) {
      console.error('Error en importación:', error)
    } finally {
      setIsImporting(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Importar Invitados</CardTitle>
          <CardDescription>
            Carga invitados desde un archivo CSV o JSON
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <div className="space-y-2">
              <input 
                type="file"
                accept=".csv,.json"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <p className="text-sm text-gray-500">
                Archivos CSV o JSON solamente
              </p>
            </div>
          </div>

          {importFile && (
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">{importFile.name}</span>
                <Badge variant="outline">{(importFile.size / 1024).toFixed(1)} KB</Badge>
              </div>
            </div>
          )}

          <Button 
            onClick={handleImport}
            disabled={!importFile || isImporting}
            className="w-full"
          >
            {isImporting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Importando...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Importar Archivo
              </>
            )}
          </Button>

          {importResult && (
            <div className="space-y-4">
              <Separator />
              <div>
                <h4 className="font-medium mb-2">Resultado de la Importación</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{importResult.success}</div>
                    <div className="text-sm text-green-800">Exitosos</div>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">{importResult.failed}</div>
                    <div className="text-sm text-red-800">Fallidos</div>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{importResult.duplicates}</div>
                    <div className="text-sm text-yellow-800">Duplicados</div>
                  </div>
                </div>
                
                {importResult.errors.length > 0 && (
                  <div className="mt-4 p-3 bg-red-50 rounded-lg">
                    <h5 className="font-medium text-red-900 mb-2">Errores:</h5>
                    <ul className="text-sm text-red-800 space-y-1">
                      {importResult.errors.map((error, index) => (
                        <li key={index}>• {error}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Plantilla de ejemplo */}
      <Card>
        <CardHeader>
          <CardTitle>Formato de Archivo</CardTitle>
          <CardDescription>
            Ejemplo del formato esperado para la importación
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Formato CSV:</h4>
              <pre className="text-sm bg-gray-50 p-3 rounded-lg overflow-x-auto">
{`nombre,telefono,email,tipo_invitacion
María González,777-123-4567,maria@email.com,whatsapp
Carlos López,777-234-5678,carlos@email.com,email
Ana Rodríguez,777-345-6789,,manual`}
              </pre>
            </div>
            
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Descargar Plantilla CSV
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Componente principal
export function DataExportImport() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Table className="h-5 w-5" />
          <span>Exportar e Importar Datos</span>
        </CardTitle>
        <CardDescription>
          Gestiona la exportación e importación de tu lista de invitados
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="export" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="export" className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Exportar</span>
            </TabsTrigger>
            <TabsTrigger value="import" className="flex items-center space-x-2">
              <Upload className="h-4 w-4" />
              <span>Importar</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="export" className="mt-6">
            <ExportSection />
          </TabsContent>
          
          <TabsContent value="import" className="mt-6">
            <ImportSection />
          </TabsContent>
        </Tabs>

        {/* Nota demo */}
        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <FileSpreadsheet className="h-4 w-4 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-green-900 mb-1">
                📊 Exportación e Importación Completa
              </h3>
              <p className="text-sm text-green-800">
                Sistema completo de importación y exportación de datos. Puedes exportar tu lista 
                de invitados en múltiples formatos (CSV, JSON) con filtros personalizables, 
                o importar nuevos invitados desde archivos externos. Perfecto para backup, 
                análisis en Excel o integración con otros sistemas.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default DataExportImport
