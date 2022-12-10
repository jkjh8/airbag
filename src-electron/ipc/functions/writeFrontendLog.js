import logger from '../../logger'

function writeFrontLog(args) {
  if (args.level === 'error') {
    logger.error(args.message)
  } else {
    logger.info(args.message)
  }
}

export default writeFrontLog
