import { CronJob } from 'cron'
import { configHelper } from '../helpers'
import { clothesPlusSizeCrowler } from '../crawler'
import ProductService from '../services/ProductService'
import logger from '../log'

const start = async () => {
  const totalProducts = await new ProductService().countProducts()
  const runOnInit = totalProducts === 0

  const { cronExpression } = configHelper.jobs.crwaler
  const job = new CronJob(
    cronExpression,
    async () => await clothesPlusSizeCrowler.init(),
    null,
    true,
    'America/Bahia',
    null,
    runOnInit,
  )
  job.start()

  logger.info(
    `Job clothesPlusSizeCrowler will run at ${job.nextDate().format('YYYY-MM-DDTHH:mm:ss.SSS')}`
  )
}

export { start }
