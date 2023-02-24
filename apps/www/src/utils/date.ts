import {
  format,
  parseISO,
  formatDistanceToNow,
  differenceInDays,
  endOfDay,
  differenceInYears,
} from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { percentage } from './number'

export enum DateFormatTemplate {
  default = 'E, dd MMM yyy',
  numeric = 'dd/MM/yyy',
}

export const formatDateToAPIQuery = (date: Date) => format(date, 'yyyy-MM-dd')

export const formatDate = (
  date: string,
  template = DateFormatTemplate.default
) =>
  date
    ? format(parseISO(date), template, {
        locale: ptBR,
      })
    : ''

export const formatTime = (date: string) =>
  date
    ? format(parseISO(date), 'HH:mm', {
        locale: ptBR,
      })
    : ''

export const formatDateDistance = (date: string) =>
  date
    ? formatDistanceToNow(parseISO(date), {
        locale: ptBR,
      })
    : ''

export const dateRangePercentage = (start_date: string, end_date: string) => {
  // Total number of days
  const totalDays = differenceInDays(parseISO(end_date), parseISO(start_date))

  // Total days from now
  const daysTillToday = differenceInDays(
    endOfDay(new Date()),
    parseISO(start_date)
  )

  if (daysTillToday <= 0) {
    return 0
  }

  return percentage(totalDays, daysTillToday)
}

export const calculateAge = (dob: string) => {
  return differenceInYears(endOfDay(new Date()), parseISO(dob))
}
