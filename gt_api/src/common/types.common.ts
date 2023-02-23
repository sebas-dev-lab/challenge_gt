import { taskSubscription } from '../core/task/subscriptions.task';

export type responseCasesType = {
  message?: string
  code: number
  error: boolean
  data?: any
}

export type pagination = {
  page: number
  limit?: number
}

export type paginationTask = {
  items: Array<taskSubscription>
  meta: { page: number; limit: number; _length: number }
}
