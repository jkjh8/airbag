import { BrowserWindow as bw } from 'electron'
import db from '../../db'

export const updatePlayer = async (args) => {
  await db.update(
    { type: 'player', id: args.id },
    { $set: { ...args } },
    { upsert: true }
  )
}

export const getPlayer = async () => {
  return await db.find({ type: 'player' }).sort({ id: 1 })
  bw.fromId(1).webContents.send('onResponse', {
    type: 'player',
    value: players
  })
}

// db.remove({}, { multi: true }, function (err, result) {
//   console.log('removed')
// })
