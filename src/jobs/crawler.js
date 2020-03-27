import { CronJob } from 'cron'
import { configHelper } from '../helpers'
import { clothesPlusSizeCrowler } from '../crawler'
import ProductService from '../services/ProductService'

const start = async () => {
  const { cronExpression } = configHelper.jobs.crwaler

  const productService = new ProductService()
  const totalProducts = await productService.countProducts()

  const runOnInit = totalProducts === 0

  const job = new CronJob(
    cronExpression,
    async () => await clothesPlusSizeCrowler.init(),
    null,
    true,
    'America/Los_Angeles',
    null,
    runOnInit
  )
  job.start();

  console.log(`Job clothesPlusSizeCrowler will run at ${job.nextDate().format('YYYY-MM-DDTHH:mm:ss.SSS')} `);
}

export { start }
