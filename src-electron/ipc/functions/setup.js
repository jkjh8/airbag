import { BrowserWindow as bw } from 'electron'
import db from '../../db'
import logger from '../../logger'
import path from 'path'

const getSetupFromDB = async () => {
  let setupVal = await db.findOne({ type: 'setup' })
  if (!setupVal) {
    setupVal = {
      port: 12345,
      delay: 2000,
      mode: 'Simple',
      audioFilePath:
        process.env.NODE_ENV === 'production'
          ? path.resolve(path.join(process.resourcesPath, 'audioFiles'))
          : path.resolve(path.join(__dirname, '../../../audioFiles'))
    }
  }
  if (setupVal && !setupVal.audioFilePath) {
    setupVal.audioFilePath =
      process.env.NODE_ENV === 'production'
        ? path.resolve(path.join(process.resourcesPath, 'audioFiles'))
        : path.resolve(path.join(__dirname, '../../../audioFiles'))
  }
  bw.fromId(1).webContents.send('onResponse', {
    type: 'setup',
    value: setupVal
  })
  logger.info('get setup from db')
  return setupVal
}

const setSetupToDB = async (args) => {
  await db.update({ type: 'setup' }, { $set: { ...args } }, { upsert: true })
  logger.info('set setup to db')
}

const setDefault = async () => {
  return await db.remove({}, { multi: true })
}

export { getSetupFromDB, setSetupToDB, setDefault }
