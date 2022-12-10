import { BrowserWindow as bw, ipcMain, dialog } from 'electron'
import logger from '../logger'

import writeFrontLog from './functions/writeFrontendLog'
import { getSetupFromDB, setSetupToDB } from './functions/setup'
import { createServer } from '../net/udp'

let setup

ipcMain.on('onRequest', async (e, args) => {
  try {
    switch (args.command) {
      // STARTING
      case 'start':
        setup = await getSetupFromDB()
        try {
          await createServer(setup.port)
        } catch (err) {
          logger.error(`server creation failed: ${err}`)
        }

        break
      // LOG MESSAGE FROM FRONTEND
      case 'log':
        writeFrontLog(args)
        break

      // GET SETUP
      case 'getSetup':
        setup = await getSetupFromDB()
        break
      // SET SETUP
      case 'setSetup':
        await setSetupToDB(args.value)
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