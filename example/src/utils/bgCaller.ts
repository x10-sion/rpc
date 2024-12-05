import { bgCaller } from '@x10sion/rpc'

import { type RouterTypes } from '../background'

export const rpc = bgCaller<RouterTypes>((message, resolve, reject) => {
  chrome.runtime.sendMessage(message, (response) => {
    if (response.error) {
      reject(new Error(response.error))
    } else {
      resolve(response.data)
    }
  })
})
