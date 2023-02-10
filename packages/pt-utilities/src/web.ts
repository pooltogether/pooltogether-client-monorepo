export const replaceQueryParam = (key: string, value: string) => {
  const url = new URL(window.location.href)
  url.searchParams.set(key, value)
  window.history.replaceState(null, '', url.toString())
}

export const pushQueryParam = (key: string, value: string) => {
  const url = new URL(window.location.href)
  url.searchParams.set(key, value)
  window.history.pushState(null, '', url.toString())
}

export const deleteQueryParam = (key: string) => {
  const url = new URL(window.location.href)
  url.searchParams.delete(key)
  window.history.replaceState(null, '', url.toString())
}
