import Crawler from 'simplecrawler'

export default class CrowlerService {
  constructor(initialUrl, categoryRegex) {
    this.crawler = new Crawler(initialUrl)

    this.crawler.interval = 10000
    this.crawler.maxConcurrency = 3
    //this.crawler.maxDepth = 3
    //this.crawler.allowInitialDomainChange = false
    //this.crawler.filterByDomain = true
    //this.crawler.downloadUnsupported = false
    //this.crawler.decodeResponses = true

    this.crawler.addFetchCondition((queueItem) => {
      if (queueItem.path.match(categoryRegex)) {
        console.log('***************************************************')
        console.log(queueItem.path, queueItem.url)
        return true
      }
      return false
    })

    this.crawler.on('crawlstart', function () {
      console.log('crawlstart')
    })

    this.crawler.on('fetch404', function (queueItem, response) {
      console.log('fetch404', queueItem.url, response.statusCode)
    })

    this.crawler.on('fetcherror', function (queueItem, response) {
      console.log('fetcherror', queueItem.url, response.statusCode)
    })

    this.crawler.on('complete', function () {
      console.log('complete')
    })
  }

  start() {
    this.crawler.start()
  }

  onFetchcomplete(callback) {
    this.crawler.on('fetchcomplete', (queueItem, responseBuffer) => {
      console.log('fetchcomplete', queueItem.url)
      callback(responseBuffer)
    })
  }
}
