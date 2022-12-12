import { ref } from 'vue'

const player = ref([
  { id: 0, tag: [] },
  { id: 1, tag: [] },
  { id: 2, tag: [] },
  { id: 3, tag: [] },
  { id: 4, tag: [] },
  { id: 5, tag: [] },
  { id: 6, tag: [] }
])

const updateFileToDb = (id, files) => {
  FN.onRequest({ command: 'updateFiles', id: id, files: [...files] })
}

const updatePlaylinkToDb = (id, playlink) => {
  FN.onRequest({ command: 'updatePlaylink', id: id, playlink: playlink })
}

const setSink = (audio, device) => {
  audio.forEach((ad) => {
    ad.setSinkId(device)
  })
}

const updateDeviceToDb = (id, device) => {
  FN.onRequest({ command: 'setDevice', id: id, deviceId: device })
}

export { player, updateFileToDb, updatePlaylinkToDb, setSink, updateDeviceToDb }
