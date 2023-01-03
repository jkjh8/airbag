import { BrowserWindow as bw } from 'electron'
import db from '../../db'
import path from 'path'

const updatePlayer = async (args) => {
  await db.update(
    { type: 'player', id: args.id },
    { $set: { ...args } },
    { upsert: true }
  )
}

const getPlayer = async (id) => {
  return await db.findOne({ type: 'player', id: id }).sort({ id: 1 })
}

const getPlayers = async () => {
  return await db.find({ type: 'player' }).sort({ id: 1 })
}

const updatePlaylink = async (id, value) => {
  await db.update(
    { type: 'player', id: id },
    { $set: { playlink: value } },
    { upsert: true }
  )
}

const initAudioFiles = (id, defaultPath) => {
  return [
    path.resolve(defaultPath, `int1_Tone_${id + 1}.wav`),
    path.resolve(defaultPath, `int2_Tone_${id + 1}.wav`),
    path.resolve(defaultPath, `int2_bm_Tone_${id + 1}.wav`)
  ]
}

export { updatePlayer, getPlayer, getPlayers, updatePlaylink, initAudioFiles }
// db.remove({}, { multi: true }, function (err, result) {
//   console.log('removed')
// })
