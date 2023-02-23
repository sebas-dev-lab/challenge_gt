import { Express } from 'express';
import { requestFetch, responseType } from '../http_requests/types.http_request';

export interface ConfigConnectionInterface {
  routes: any
  path: string
  middlewares(): void
}

export interface HttpConnectionInterface extends ConfigConnectionInterface {
  get_server(): Express
  start(port: number): void
}

export interface HttpSubscriptionsInterface {
  fetch: (arg: any) => Promise<responseType>
  baseUrl: requestFetch
}
