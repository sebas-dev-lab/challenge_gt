import { WebSocket } from 'ws';

export enum typeAuthContext {
  'private' = 'private'
}

export enum contextAuth {
  'reg' = 'register',
  'login' = 'signin',
  'logout' = 'signout',
  'onsession' = 'onsession'
}

export enum contexts {
  'auth' = 'auth.context',
  'ws_conn' = 'connection.context',
  'task' = 'task.context'
}

export type ws_connection = {
  connection: WebSocket
  date: Date
  _creds: {
    id_event: string
    id_conn: string
    online: boolean
  }
  subscribers?: Array<[]>
}
