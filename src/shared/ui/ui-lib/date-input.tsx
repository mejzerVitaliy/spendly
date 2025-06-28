'use client';

import { useState } from 'react';
import { CalendarIcon } from '@/shared/icons';
import { cn } from '@/shared/lib/utils';
import { DateFormat, formatDate } from '@/shared/lib/date';
import { Button } from '@/shared/ui';
import { Calendar } from '@/shared/ui';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui';
import { CalendarDaysIcon } from 'lucide-react';

interface DateInputProps {
  className?: string;
  size?: 'default' | 'sm' | 'lg' | 'icon';
  date: Date;
  onCalendarChange: (date: Date) => void;
  onBlur?: () => void;
  disableDates?: Date[];
  hasIcon?: boolean;
}

const DateInput = ({
  className,
  size = 'default',
  date,
  onCalendarChange,
  disableDates,
  hasIcon,
}: DateInputProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger asChild>
        <Button
          type="button"
          className={cn(
            'h-12 w-full justify-between bg-background-input text-p1-regular text-text-primary',
            className,
          )}
          variant='outline'
          size={size}
          rightIcon={hasIcon && <CalendarDaysIcon className='!w-5 !h-5' />}
          onClick={() => setOpen(true)}
        >
          {formatDate(date, DateFormat['DD/MM/YYYY'])}
        </Button>
      </PopoverTrigger>

      <PopoverContent 
        className="w-auto p-0 z-[100]"
        align="center"
        sideOffset={4}
      >
        <Calendar
          required
          mode="single"
          selected={date}
          onSelect={(date) => {
            onCalendarChange(date);
            setOpen(false);
          }}
          disableDates={disableDates}
        />
      </PopoverContent>
    </Popover>
  );
};

export { DateInput };