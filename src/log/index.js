import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file'
import { configHelper } from '../helpers';

const options = {
  datePattern: 'YYYY-MM-DD',
  zippedArchive: false,
  maxSize: '50m',
  maxFiles: '14d',
}

const { path, service } = configHelper.log;

const fileTransports = [
  new DailyRotateFile({
    ...options,
    level: 'error',
    filename: `${path}/${service}-error-%DATE%.log`,
  }),
  new DailyRotateFile({
    ...options,
    filename: `${path}/${service}-%DATE%.log`,
  }),
]

const { combine, timestamp, json } = format;

const logger = createLogger({
  level: 'info',
  defaultMeta: { service },
  exitOnError: false,
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    json(),
  ),
  transports: [
    ...fileTransports
  ]
})

if (configHelper.nodeEnv !== 'production') {
  logger.add(new transports.Console({
    format: format.simple()
  }))
}

export default logger
