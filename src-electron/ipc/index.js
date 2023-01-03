import path from 'path'
import fs from 'fs'
import { BrowserWindow as bw, ipcMain, dialog } from 'electron'
import logger from '../logger'

import writeFrontLog from './functions/writeFrontendLog'
import { getSetupFromDB, setSetupToDB } from './functions/setup'
import { setDevice } from './functions/devices'
import {
  updatePlayer,
  getPlayer,
  updatePlaylink,
  initAudioFiles
} from './functions/player'
import { createServer } from '../net/udp'
import { createOscServer, sednBundle } from '../osc'
import db from '../db'
import { getFileDialog, updateFiles } from './functions/files'

let setup

ipcMain.on('onRequest', async (e, args) => {
  try {
    switch (args.command) {
      // LOG MESSAGE FROM FRONTEND
      case 'log':
        writeFrontLog(args)
        break
      // GET PLAYER
      case 'getPlayer':
        await getPlayer()
        break
      case 'updatePlayer':
        await updatePlayer(args)
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
        await setDevice(args)
        break
      // GET AUDIO FILE PATH
      case 'updateFiles':
        await updateFiles(args.id, args.files)
        break
      case 'updatePlaylink':
        await updatePlaylink(args.id, args.playlink)
        break
      default:
        logger.info(args)
        break
    }
  } catch (err) {
    logger.error(`IPC request data error: ${err}`)
  }
})

ipcMain.handle('onPromise', async (e, args) => {
  let rt
  switch (args.command) {
    case 'start':
      // console.log('start setup ', setup)
      // console.log(fs.existsSync(setup.audioFilePath))
      try {
        await createOscServer(setup.port)
        // sednBundle()
      } catch (err) {
        logger.error(`server creation failed: ${err}`)
      }
      break
    case 'getPlayer':
      rt = await getPlayer(args.id)
      if (!rt) {
        rt = {
          id: args.id,
          deviceId: 'default',
          files: initAudioFiles(args.id, setup.audioFilePath)
        }
      }
      if (rt && !rt.files) {
        rt.files = initAudioFiles(args.id, setup.audioFilePath)
      }
      if (rt && !rt.deviceId) {
        rt.deviceId = 'default'
      }
      console.log(rt)
      break
    case 'getFilePath':
      rt = await getFileDialog()
      break
  }

  return rt
})

const getSetup = async () => {
  setup = await getSetupFromDB()
  console.log(setup)
}

getSetup()
