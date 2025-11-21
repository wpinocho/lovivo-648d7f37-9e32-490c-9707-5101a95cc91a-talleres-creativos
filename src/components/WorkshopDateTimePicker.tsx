import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Calendar, Clock } from 'lucide-react'
import { format, addDays, startOfWeek, isSaturday, isSunday } from 'date-fns'
import { es } from 'date-fns/locale'

/**
 * WorkshopDateTimePicker
 * 
 * Selector de fecha y hora para talleres
 * Disponibilidad: Lunes a Viernes, 9am - 5pm
 */

interface WorkshopDateTimePickerProps {
  onSelect?: (date: Date, time: string) => void
  selectedDate?: Date
  selectedTime?: string
}

export const WorkshopDateTimePicker = ({ 
  onSelect, 
  selectedDate, 
  selectedTime 
}: WorkshopDateTimePickerProps) => {
  const [date, setDate] = useState<Date | undefined>(selectedDate)
  const [time, setTime] = useState<string | undefined>(selectedTime)

  // Generar próximos 14 días hábiles (Lun-Vie)
  const getAvailableDates = () => {
    const dates: Date[] = []
    let currentDate = new Date()
    
    while (dates.length < 14) {
      if (!isSaturday(currentDate) && !isSunday(currentDate)) {
        dates.push(new Date(currentDate))
      }
      currentDate = addDays(currentDate, 1)
    }
    
    return dates
  }

  // Horarios disponibles (9am - 5pm, cada 2 horas para slots de 3 horas)
  const availableTimes = [
    '9:00 - 12:00',
    '10:00 - 13:00',
    '11:00 - 14:00',
    '12:00 - 15:00',
    '13:00 - 16:00',
    '14:00 - 17:00'
  ]

  const availableDates = getAvailableDates()

  const handleDateSelect = (selectedDate: Date) => {
    setDate(selectedDate)
    if (onSelect && time) {
      onSelect(selectedDate, time)
    }
  }

  const handleTimeSelect = (selectedTime: string) => {
    setTime(selectedTime)
    if (onSelect && date) {
      onSelect(date, selectedTime)
    }
  }

  return (
    <Card className="border-2 border-border">
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center gap-2 text-primary">
          <Calendar className="h-5 w-5" />
          <h3 className="font-bold text-lg">Selecciona Fecha y Hora</h3>
        </div>

        {/* Date Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-foreground">
            Fecha del Taller (Lunes - Viernes)
          </Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {availableDates.slice(0, 6).map((availableDate) => {
              const isSelected = date?.toDateString() === availableDate.toDateString()
              return (
                <Button
                  key={availableDate.toISOString()}
                  variant={isSelected ? 'default' : 'outline'}
                  className={`flex flex-col h-auto py-3 ${
                    isSelected 
                      ? 'bg-primary text-primary-foreground border-2 border-primary' 
                      : 'border-2 hover:border-primary'
                  }`}
                  onClick={() => handleDateSelect(availableDate)}
                >
                  <span className="text-xs font-medium">
                    {format(availableDate, 'EEEE', { locale: es })}
                  </span>
                  <span className="text-lg font-bold">
                    {format(availableDate, 'd')}
                  </span>
                  <span className="text-xs">
                    {format(availableDate, 'MMM', { locale: es })}
                  </span>
                </Button>
              )
            })}
          </div>
          <p className="text-xs text-muted-foreground">
            Más fechas disponibles próximamente
          </p>
        </div>

        {/* Time Selection */}
        {date && (
          <div className="space-y-3 animate-in slide-in-from-top-2 duration-300">
            <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Horario (3 horas)
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {availableTimes.map((availableTime) => {
                const isSelected = time === availableTime
                return (
                  <Button
                    key={availableTime}
                    variant={isSelected ? 'default' : 'outline'}
                    className={`font-medium ${
                      isSelected 
                        ? 'bg-accent text-accent-foreground border-2 border-accent' 
                        : 'border-2 hover:border-accent'
                    }`}
                    onClick={() => handleTimeSelect(availableTime)}
                  >
                    {availableTime}
                  </Button>
                )
              })}
            </div>
          </div>
        )}

        {/* Selected Summary */}
        {date && time && (
          <div className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg border-2 border-primary/20 animate-in slide-in-from-bottom-2 duration-300">
            <p className="text-sm font-semibold text-foreground mb-1">
              📅 Taller Reservado:
            </p>
            <p className="text-base font-bold text-primary">
              {format(date, "EEEE, d 'de' MMMM", { locale: es })}
            </p>
            <p className="text-sm font-medium text-foreground">
              🕐 {time}
            </p>
          </div>
        )}

        {/* Info */}
        <div className="pt-4 border-t space-y-2 text-xs text-muted-foreground">
          <p>✓ Duración: 3 horas</p>
          <p>✓ Todos los materiales incluidos</p>
          <p>✓ Grupos pequeños para atención personalizada</p>
          <p>✓ Ubicación en CDMX (se enviará por email)</p>
        </div>
      </CardContent>
    </Card>
  )
}