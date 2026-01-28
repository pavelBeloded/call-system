import { TaskManagmentPage } from '@/pages/taskManagmentPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/task-managment')({
  component: TaskManagmentPage,
})


