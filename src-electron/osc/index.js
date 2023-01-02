import { BrowserWindow as bw } from 'electron'
import osc from 'osc'
import logger from '../logger'
var udpPort

const createOscServer = (port) => {
  return new Promise((resolve, reject) => {
    try {
      udpPort = new osc.UDPPort({
        localAddress: '0.0.0.0',
        localPort: port,
        metadata: true
      })

      udpPort.on('message', function (oscMsg, timeTag, info) {
        // console.log('OSC Arrived: ', oscMsg)
        // console.log('OSC TimeTag: ', timeTag)
        // console.log('OSC Info: ', info)
        oscParser(oscMsg, timeTag, info)
      })

      udpPort.open()
      logger.info(`OSC Server Started : ${port}`)
      resolve()
    } catch (err) {
      logger.error(`OSC Server Error: ${err}`)
      reject(err)
    }
  })
}

const sednBundle = () => {
  udpPort.send(
    {
      address: '/AirbagLightingEvent',
      args: [
        {
          type: 'i',
          value: 1
        }
      ]
    },
    '127.0.0.1',
    12345
  )
}

const oscParser = (oscMsg, timeTag, info) => {
  let channel
  const id = oscMsg.args[0].value - 1
  if (oscMsg.address === '/AirbagLightingEvent') {
    channel = 0
  } else if (oscMsg.address === '/AirbagBreathingEvent') {
    channel = 1
  }
  bw.fromId(1).webContents.send('onOsc', {
    command: 'play',
    id: id,
    channel: channel,
    oscMsg: oscMsg
  })
}

export { createOscServer, sednBundle }
