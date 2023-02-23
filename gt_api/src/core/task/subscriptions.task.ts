export type baseTask = {
  title: string
  alarm: boolean
  start_alarm?: Date
  init_date?: Date
  final_date?: Date
}
export type taskSubscription = baseTask & {
  user_id: string
  id: string
  completed: boolean
}

export type filterTask = {
  completed: boolean
  alarm: boolean
}
