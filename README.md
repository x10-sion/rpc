# x10sion/rpc

This is a lightweight and efficient RPC (Remote Procedure Call) library designed specifically for Chrome extensions to facilitate full type safe communication between content scripts, popup, options, and background workers.

## Features

- Simple and intuitive API
- Lightweight and fast

## Installation

To install the RPC library, you can use npm:

```sh
npm install @x10sion/rpc
```

Or if you prefer using yarn:

```sh
yarn add @x10sion/rpc
```

## Usage

Here is a basic example of how to use the RPC library in a Chrome extension:

### Background Worker

```typescript
import { createRouter, handleRPC } from '@x10sion/rpc'

const userControllers = {
  signin: async ({
    username,
    password
  }: {
    username: string
    password: string
  }) => {
    console.log('signin', username, password)
    return Promise.resolve({ username, msg: 'signin done' })
  },
  signout: async () => {
    console.log('signout')
    return Promise.resolve({ msg: 'signout done' })
  }
}

export const userRouter = createRouter(userControllers)

const controllers = {
  p: async ({ a, b }: { a: number; b: number }) => {
    return Promise.resolve(a + b)
  },
  user: userRouter
}

const rootRouter = createRouter(controllers)

handleRPC(rootRouter, chrome)
```

### Content Script/Popup/Options

```typescript
import { bgCaller } from '@x10sion/rpc'

export const rpc = bgCaller((message, resolve, reject) => {
  chrome.runtime.sendMessage(message, (response) => {
    if (response.error) {
      reject(new Error(response.error))
    } else {
      resolve(response.data)
    }
  })
})

// Usage in a React component
import React, { useEffect } from 'react'
import { rpc } from '@/utils/bgCaller'

export default function Content(): JSX.Element {
  useEffect(() => {
    ;(async () => {
      try {
        const res = await rpc('user.signin', {
          username: 'admin',
          password: 'admin'
        })
        console.log(res)
      } catch (e) {
        console.error(e)
      }
    })()
  }, [])

  return <div>{/* Your component JSX */}</div>
}
```

## Contributing

We welcome contributions to the RPC library. To contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes and commit them with a clear message.
4. Push your changes to your fork.
5. Create a pull request to the main repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
