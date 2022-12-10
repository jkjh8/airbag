import db from '../../db'
import logger from '../../logger'

export const setDevice = async (args) => {
  await db.update(
    { type: 'player', id: args.id },
    { $set: { deviceId: args.deviceId } },
    { upsert: true }
  )
  logger.info(`set device id: ${args.id}, deviceId: ${args.deviceId}`)
}
