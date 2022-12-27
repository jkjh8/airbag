import osc from 'osc'
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
        console.log('OSC Arrived: ', oscMsg)
        console.log('OSC TimeTag: ', timeTag)
        console.log('OSC Info: ', info)
        oscParser(oscMsg, timeTag, info)
      })

      udpPort.open()
      resolve()
    } catch (err) {
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
  if (oscMsg.address === '/AirbagLightingEvent') {
    console.log(oscMsg.args)
  }
}

export { createOscServer, sednBundle }
