import { createRouter } from '@x10sion/rpc'

const controllers = {
  sayHello: (name: string) => `Hello, ${name}!`,
  add: (a: number, b: number) => {
    return a + b
  },
}
export const fooRouter = createRouter(controllers)
