export function createResizeObserver(callback: ResizeObserverCallback) {
  if (typeof ResizeObserver !== 'function') {
    return null
  }

  return new ResizeObserver(callback)
}
