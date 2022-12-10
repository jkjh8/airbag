import { BrowserWindow as bw, ipcMain, dialog } from 'electron'
import logger from '../logger'

import writeFrontLog from './functions/writeFrontendLog'
import { getSetupFromDB, setSetupToDB } from './functions/setup'
import { setDevice } from './functions/devices'
import { createServer } from '../net/udp'
import db from '../db'

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
      // UPDATE DEVICE
      case 'setDevice':
        setDevice(args)
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
