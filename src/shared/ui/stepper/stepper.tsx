import { cn } from '@/shared/lib'
import { ReactNode } from 'react'

interface StepperProps {
  step: number,
  stepsContent: {
    label: string,
    content: ReactNode
  }[]
}

const Stepper = ({ step, stepsContent }: StepperProps) => {
  return (
    <div className='w-full flex gap-6'>
      {stepsContent.map(({label}, index) => (
        <div className='flex-1 flex flex-col gap-2'>
          <div className='flex items-center gap-2'>
            <span className='w-8 h-8 flex items-center justify-center rounded-lg bg-background-input border border-disabled'>{index + 1}</span>
            <p className='text-p1-regular'>{label}</p>
          </div>
          <span className={cn('w-full h-1 bg-disabled rounded-2xl transition-colors duration-200', (step === index + 1) && 'shadow-2xl bg-branding-primary-pressed')} />
        </div>
      ))}
    </div>
  )
}

export {Stepper}