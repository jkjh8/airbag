import { ref, computed } from 'vue'
const devices = ref([])
const audioOutput = ref([])

const getDevices = async () => {
  if (!navigator.mediaDevices?.enumerateDevices) {
    FN.onRequest({
      command: 'log',
      leval: 'error',
      message: 'enumerateDevices() not supported.'
    })
  } else {
    devices.value = await navigator.mediaDevices.enumerateDevices()
    audioOutput.value = devices.value.filter(
      (device) => device.kind === 'audiooutput'
    )
    FN.onRequest({
      command: 'log',
      leval: 'info',
      message: 'get audio devices'
    })
  }
}

export { getDevices, audioOutput }
