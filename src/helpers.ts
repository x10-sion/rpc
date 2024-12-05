import { RPCRouter } from './rpc'
import type { RPCRouter as RPCRouterType } from './rpc'
import { ControllerRecord } from './types'

export const createRouter = <T extends ControllerRecord>(
  functions: T
): RPCRouter<T> => {
  return new RPCRouter(functions)
}
export const handleRPC = <T extends RPCRouterType<any>>(
  router: T,
  browser: typeof chrome
) => {
  browser.runtime.onMessage.addListener((msg, _, response) => {
    Promise.resolve(router.handle(msg)).then((res) => response(res))
    return true
  })
}
