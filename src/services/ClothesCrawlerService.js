import CrawlerService from './CrawlerService'

export default class ClothesCrawlerService extends CrawlerService {
  constructor(subcategory) {
    super(
      'https://www.vkmodaplussize.com.br/plus-size/',
      new RegExp(`\/${subcategory}\/ `, 'g')
    )
  }
}
