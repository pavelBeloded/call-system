import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { CommunicationPage } from '@/pages' 

const communicationSearchSchema = z.object({
  callId: z.string().optional(),
  
})

export type CommunicationSearch = z.infer<typeof communicationSearchSchema>

export const Route = createFileRoute('/communication')({
  validateSearch: (search) => communicationSearchSchema.parse(search),
  
  component: CommunicationPage,

  
})