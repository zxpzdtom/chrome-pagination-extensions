const getItem = (key: string) => {
  return new Promise((resolve) => {
    chrome.storage.local.get([key], result => resolve(result[key]))
  })
}

const setItem = (key: string, value: any) => {
  return new Promise((resolve) => {
    chrome.storage.local.set({ [key]: value }, () => resolve(null))
  })
}

const removeItem = (key: string) => {
  return new Promise((resolve) => {
    chrome.storage.local.remove(key, () => resolve(null))
  })
}


export { getItem, setItem, removeItem }
