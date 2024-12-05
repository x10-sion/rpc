import type { RPCRouter as RPCRouterType } from './rpc'
import { Message, RPCActions } from './types'

export const bgCaller = <T extends RPCRouterType<any>>(
  callback: (
    message: Message<string, any[]>,
    resolve: (value: any) => void,
    reject: (reason?: any) => void
  ) => void
) => {
  type RootActions = RPCActions<T>
  return async <Action extends string & RootActions['action']>(
    action: Action,
    ...args: Extract<RootActions, { action: Action }>['args']
  ): Promise<Extract<RootActions, { action: Action }>['return']> => {
    const message: Message<Action, any[]> = {
      action,
      value: args
    }
    return new Promise((resolve, reject) => {
      callback(message, resolve, reject)
    })
  }
}
