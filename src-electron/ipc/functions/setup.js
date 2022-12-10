import { BrowserWindow as bw } from 'electron'
import db from '../../db'
import logger from '../../logger'

const getSetupFromDB = async () => {
  const setupVal = await db.findOne({ type: 'setup' })
  if (setupVal) {
    bw.fromId(1).webContents.send('onResponse', {
      type: 'setup',
      value: setupVal
    })
  }
  logger.info('get setup from db')
  return setupVal
}

const setSetupToDB = async (args) => {
  await db.update({ type: 'setup' }, { $set: { ...args } }, { upsert: true })
  logger.info('set setup to db')
}

export { getSetupFromDB, setSetupToDB }
