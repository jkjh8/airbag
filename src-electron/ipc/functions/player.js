import { BrowserWindow as bw } from 'electron'
import db from '../../db'

export const updatePlayer = async (args) => {
  await db.update(
    { type: 'player', id: args.id },
    { $set: { ...args } },
    { upsert: true }
  )
}

export const getPlayer = async (id) => {
  return await db.findOne({ type: 'player', id: id }).sort({ id: 1 })
}

export const getPlayers = async () => {
  return await db.find({ type: 'player' }).sort({ id: 1 })
}

// db.remove({}, { multi: true }, function (err, result) {
//   console.log('removed')
// })
