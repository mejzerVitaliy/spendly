import React from 'react'
import { Button, Popover, PopoverContent, PopoverTrigger } from '../ui-lib';
import { useToggle } from 'usehooks-ts';
import { Calendar } from '../ui-lib/calendar';
import { cn } from '@/shared/lib';
import { CalendarSearchIcon } from 'lucide-react';

interface DatePickerProps {
  className?: string;
  date?: string;
  onDateChange: (date?: string) => void;
  disableDates?: Date[];
}

const DatePicker = ({ className, date, onDateChange, disableDates }: DatePickerProps) => {
  const [open, toggleOpen] = useToggle()
  
  const selectedDate = date ? (() => {
    if (date.includes('.')) {
      const [day, month, year] = date.split('.').map(Number)
      const result = new Date(year, month - 1, day)

      return result
    } else if (date.includes('/')) {
      const parts = date.split('/').map(Number)

      let result

      if (parts[0] > 12) {
        result = new Date(parts[2], parts[1] - 1, parts[0])
      } else {
        result = new Date(parts[2], parts[0] - 1, parts[1])
      }

      return result
    } else {
      const result = new Date(date)

      return result
    }
  })() : undefined

  const handleDateSelect = (selectedDate?: Date) => {
    if (!selectedDate) {
      onDateChange()
      toggleOpen()
      return
    }

    const selectedDateString = selectedDate.toLocaleDateString()
    
    if (date === selectedDateString) {
      onDateChange()
    } else {
      onDateChange(selectedDateString)
    }
    
    toggleOpen()
  }
  
  return (
    <Popover
      open={open}
      onOpenChange={toggleOpen}
    >
      <PopoverTrigger asChild>
        <Button
          variant={'branding'}
          size='icon'
          rightIcon={<CalendarSearchIcon className='!w-5 !h-5 !flex-shrink-0' />}
        />
      </PopoverTrigger>

      <PopoverContent 
        className={cn("w-fit p-0 z-[100]", className)}
        align="center"
        sideOffset={4}
      >
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          disableDates={disableDates}
        />
      </PopoverContent>
    </Popover>
  );
}

export { DatePicker }