'use client'

import * as React from 'react'
import { DayPicker } from 'react-day-picker'
import { cn } from '@/shared/lib'
import { format } from 'date-fns'

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  disableDates?: Date[]
}

const Calendar = ({
  className,
  classNames,
  disableDates,
  ...props
}: CalendarProps) => {
  return (
    <DayPicker
      className={cn(
        'bg-white rounded-xl shadow-lg p-3',
        className
      )}
      classNames={{
        chevron: 'w-4 h-4',
        selected: 'bg-black text-white font-bold',
        months: 'flex flex-col text-center relative',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-lg font-bold text-gray-900',
        nav: 'absolute w-full top-2 flex justify-between items-center',
        table: 'w-full border-collapse justify-center space-y-1',
        head_row: 'flex',
        head_cell:
          'text-gray-400 font-semibold rounded-md w-9 text-xs text-center',
        row: 'flex w-full mt-2',
        cell: 'h-9 w-9 rounded-full text-center text-sm p-0 relative',
        day: cn(
          'h-9 w-9 p-0 font-normal text-center rounded-full transition-colors hover:bg-background-input duration-300 aria-selected:opacity-100'
        ),
        range_end: 'day-range-end',
        outside:
          'day-outside text-gray-300 opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
        disabled: 'text-gray-300 opacity-50',
        range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground',
        hidden: 'invisible',
        ...classNames,
      }}
      formatters={{
        formatCaption: (date, options) => {
          return format(date, 'MMMM yyyy', { locale: options?.locale })
        },
      }}
      disabled={disableDates}
      {...props}
    />
  )
}

Calendar.displayName = 'Calendar'

export { Calendar } 