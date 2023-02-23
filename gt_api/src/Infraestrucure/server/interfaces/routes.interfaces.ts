import { Router, Request } from 'express';
import { pagination, paginationTask, responseCasesType } from '../../../common/types.common';
import { authToken, authUsers, credentials, loginType } from '../../../core/auth/credentials.auth';
import { baseTask, filterTask, taskSubscription } from '../../../core/task/subscriptions.task';

// ============== HTTP INTERFACES ================ //
export interface HttpRoutesInterface {
  router: Router
  index(): Router
}

export interface TypedRequestBody<T> extends Request {
  body: T
}

// ============== AUTH INTERFACES ================ //
export interface AuthCasesInterface {
  register(data: credentials): Promise<authUsers | boolean>
  login(data: credentials): Promise<loginType | boolean>
  logout(data: authToken): boolean
}

export interface AuthServicesInterface {
  register(data: credentials): Promise<responseCasesType>
  login(data: credentials): Promise<responseCasesType>
  logout(data: authToken): responseCasesType
}

// ============== TASK INTERFACES ================ //
export interface TasksInterface {
  insert_task(user_id: string, baseTask: baseTask): responseCasesType
  update_task(user_id: string, tkid: string, baseTask: baseTask): responseCasesType
  find_task_by_id(user_id: string, tkid: string): responseCasesType
  find_all_tasks(user_id: string, pagination: pagination, filter?: filterTask): responseCasesType
  deletetask_by_id(user_id: string, tkid: string): responseCasesType
}

export interface TasksCasesInterface {
  insert_task(user_id: string, baseTask: baseTask): { id: string } | boolean
  update_task(user_id: string, tkid: string, baseTask: baseTask): { id: string } | boolean
  find_task_by_id(user_id: string, tkid: string): taskSubscription
  find_all_tasks(user_id: string, pagination: pagination, filter?: filterTask): paginationTask
  deletetask_by_id(user_id: string, tkid: string): { id: string } | boolean
}
