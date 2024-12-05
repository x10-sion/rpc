import { createRouter, handleRPC } from '@x10sion/rpc'

import { fooRouter } from './api/foo'
import { userRouter } from './api/user'

const controllers = {
  p: async ({ a, b }: { a: number; b: number }) => {
    return Promise.resolve(a + b)
  },
  foo: fooRouter,
  user: userRouter,
}
const rootRouter = createRouter(controllers)

handleRPC(rootRouter, chrome)

export type RouterTypes = typeof rootRouter
