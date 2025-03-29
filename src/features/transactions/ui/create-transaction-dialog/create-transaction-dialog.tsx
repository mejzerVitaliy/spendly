'use client'

import { cn } from '@/shared/lib'
import { Button, Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/ui'
import { PlusCircleIcon } from 'lucide-react'
import { useStep, useToggle } from 'usehooks-ts'


const MAX_STEPS = 2
const CreateTransactionDialog = () => {
  const [open, toggleOpen] = useToggle()
  const [step, {goToNextStep, goToPrevStep, reset}] = useStep(MAX_STEPS)

  return (
    <Dialog open={open} onOpenChange={toggleOpen}>
      <DialogTrigger asChild>
        <Button size='sm' leftIcon={<PlusCircleIcon />}>Add New Transaction</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Transaction</DialogTitle>

          <div className='w-full flex gap-6'>
            <div className='flex-1 flex flex-col gap-2'>
              <div className='flex items-center gap-2'>
                <span className='w-8 h-8 flex items-center justify-center rounded-lg bg-background-input border border-disabled'>1</span>
                <p className='text-p1-regular'>Fill Inputs</p>
              </div>

              <span className={cn('w-full h-1 bg-disabled rounded-2xl transition-colors duration-200', step === 1 && 'shadow-2xl bg-branding-primary-pressed')} />
            </div>

            <div className='flex-1 flex flex-col gap-2'>
              <div className='flex items-center gap-2'>
                <span className='w-8 h-8 flex items-center justify-center rounded-lg bg-background-input border border-disabled'>2</span>
                <p className='text-p1-regular'>Select Category</p>
              </div>
              
              <span className={cn('w-full h-1 bg-disabled rounded-2xl transition-colors duration-200', step === 2 && 'shadow-2xl bg-branding-primary-pressed')} />
            </div>

          </div>
        </DialogHeader>

        <DialogFooter className='w-full flex gap-6'>
          <Button 
            variant='outline' 
            className='flex-1' 
            onClick={() => {
              if (step === 1) {
                toggleOpen()
              } else {
                goToPrevStep()
              }
            }}
          >
            {step === 1 ? 'Cancel' : 'Back'}
          </Button>

          <Button 
            className='flex-1' 
            onClick={() => {
              if (step === 1) {
                goToNextStep()
              } else {
                reset()
                toggleOpen()
              }
            }}
          >
            {step === 1 ? 'Next Step' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export {CreateTransactionDialog}