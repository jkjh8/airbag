import { dialog } from 'electron'

const getFileDialog = async (args) => {
  const file = dialog.showOpenDialog({
    title: 'Select Audio File',
    filters: [
      { name: 'Audio', extensions: ['wav', 'mp3'] },
      { name: 'All Files', extensions: ['*'] }
    ],
    properties: ['openFile']
  })
}

export { getFileDialog }
