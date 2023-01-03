import { ref } from 'vue'
import { info, warn, error } from 'src/composables/useLogs'
import { setup } from 'src/composables/useSetup'
let delay

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

const setAudioFiles = (audioTags, files) => {
  if (files) {
    files.forEach((file, idx) => {
      audioTags[idx].src = `local://${file}`
    })
  }
}

const initAudioTags = async (audioTags, id) => {
  const r = await FN.onPromise({ command: 'getPlayer', id: id })
  if (r.files && r.files.length) {
    setAudioFiles(audioTags, r.files)
  }
  if (r.deviceId) {
    setSink(audioTags, r.deviceId)
  }
  return r
}

const fnPlayBtn = (audioTag, id, idx, playlink) => {
  try {
    // play
    if (isPlaying(audioTag[idx])) {
      audioTag[idx].pause()
      audioTag[idx].load()
      return false
    } else {
      audioTag[idx].play()
      if (playlink && idx === 1) {
        delayedPlay(audioTag)
      }
      return true
    }
  } catch (err) {
    error(`Play Id: ${id}, Idx: ${idx} Error: ${err}`)
    return false
  }
}

const fnRemotePlay = (audioTag, id, idx, playlink) => {
  try {
    if (isPlaying(audioTag[idx])) {
      audioTag[idx].pause()
      audioTag[idx].load()
    }
    audioTag[idx].play()
    if (playlink && idx === 1) {
      delayedPlay(audioTag)
    }
    return true
  } catch (err) {
    error(`Remote Play Id: ${id}, Idx: ${idx} Error: ${err}`)
    return false
  }
}

const delayedPlay = (audioTag) => {
  delay = setTimeout(() => {
    if (isPlaying(audioTag[2])) {
      audioTag[2].load()
    }
    audioTag[2].play()
  }, setup.value.delay)
}

const isPlaying = (audioTag) => {
  if (audioTag.readyState < 2) {
    warn(`Player idx: ${idx} id not ready`)
    return false
  }
  return (
    audioTag &&
    audioTag.currentTime > 0 &&
    !audioTag.paused &&
    !audioTag.ended &&
    audioTag.readyState > 2
  )
}
// const play = idx

export {
  player,
  updateFileToDb,
  updatePlaylinkToDb,
  setSink,
  updateDeviceToDb,
  setAudioFiles,
  initAudioTags,
  delayedPlay,
  isPlaying,
  fnPlayBtn,
  fnRemotePlay
}
