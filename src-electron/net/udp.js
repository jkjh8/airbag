import { BrowserWindow as bw } from 'electron'
import logger from '../logger'
import dgram from 'dgram'

let server = null

const createServer = (port) => {
  return new Promise((resolve, reject) => {
    try {
      const timeout = setTimeout(() => {
        reject('server creation timed out')
      }, 5000)

      server = dgram.createSocket('udp4')

      server.bind(port, () => {
        clearTimeout(timeout)
        logger.info('create server')
      })

      server.on('listening', () => {
        const addr = server.address()
        logger.info(`server listening on ${addr.address}:${addr.port}`)
      })

      server.on('message', (msg) => {
        // 차후 수정
        console.log(msg)
      })

      server.on('error', (err) => {
        logger.error(`server error: ${err}`)
        server.close()
        server = null
        logger.error(`server closed`)
      })
    } catch (err) {
      reject(err)
    }
  })
}

export { server, createServer }
