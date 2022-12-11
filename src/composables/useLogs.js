export const info = (message) => {
  FN.onRequest({ command: 'log', level: 'info', message: message })
}

export const warn = (message) => {
  FN.onRequest({ command: 'warn', level: 'warn', message: message })
}

export const error = (message) => {
  FN.onRequest({ command: 'error', level: 'error', message: message })
}
