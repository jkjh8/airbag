import { BrowserWindow as bw, ipcMain, dialog } from 'electron'
import logger from '../logger'
ipcMain.on('onRequest', async (e, args) => {
  try {
    switch (args.command) {
      // LOG MESSAGE FROM FRONTEND
      case 'log':
        if (args.level === 'error') {
          logger.error(args.message)
        } else {
          logger.info(args.message)
        }
        break
      // GET AUDIO FILE PATH
      case 'getFilePath':
        console.log(
          dialog.showOpenDialogSync({
            title: 'Select Audio File',
            filters: [
              { name: 'Audio', extensions: ['wav', 'mp3'] },
              { name: 'All Files', extensions: ['*'] }
            ],
            properties: ['openFile']
          })
        )
        break
      default:
        logger.info(args)
        break
    }
  } catch (err) {
    logger.error(`IPC request data error: ${err}`)
  }
})
