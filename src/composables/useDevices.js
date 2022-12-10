import { ref } from 'vue'
const devices = ref([])

const getDevices = async () => {
  if (!navigator.mediaDevices?.enumerateDevices) {
    console.log('enumerateDevices() not supported.')
  } else {
    devices.value = await navigator.mediaDevices.enumerateDevices()
    console.log(devices.value)
  }
}

export { getDevices }
