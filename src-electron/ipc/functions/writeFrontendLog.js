import logger from '../../logger'

function writeFrontLog(args) {
  switch (args.level) {
    case 'error':
      logger.error(args.message)
      break
    case 'warn':
      logger.warn(args.message)
      break
    case 'info':
      logger.info(args.message)
      break
  }
}

export default writeFrontLog
