import db from '../../db'
import { dialog } from 'electron'
import logger from '../../logger'

const getFileDialog = async () => {
  const file = dialog.showOpenDialogSync({
    title: 'Select Audio File',
    filters: [
      { name: 'Audio', extensions: ['wav', 'mp3'] },
      { name: 'All Files', extensions: ['*'] }
    ],
    properties: ['openFile']
  })
  return file[0]
}

const updateFiles = async (id, files) => {
  await db.update(
    { type: 'player', id: id },
    { $set: { files: files } },
    { upsert: true }
  )
  logger.info(`update files id: ${id} files: ${files}`)
}

export { getFileDialog, updateFiles }
