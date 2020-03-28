import Lien from 'lien'
import { getPlusSizeCategories } from '../src/scraper'
import scrapeTestConfig from './mock/scrapeTestConfig'

const PORT = 8080
const HOST = `http://localhost:${PORT}`

beforeAll((cb) => {
  new Lien({
    port: PORT,
    public: `${__dirname}/www`
  }).on('load', cb)

  scrapeTestConfig.initialUrl = HOST
})

describe('Scraper Tests', () => {

  it('getPlusSizeCategories', async () => {
    const categories = await getPlusSizeCategories(scrapeTestConfig)

    expect(categories).not.toBeNull()
    expect(categories).toHaveLength(5)
    expect(categories[0].name).toContain('Category A')
    expect(categories[0].url).toContain('/category-a')
  })

})
