import xCrawl from 'x-crawl'

const run = async () => {
  const client = xCrawl({ maxRetry: 3, intervalTime: { max: 2000, min: 1000 } })

  const pageResults = await client.crawlPage({
    targets: ['https://www.qufair.com'],
    viewport: { width: 1920, height: 1080 },
  })

  const imgUrls = []
  for (const item of pageResults) {
    const { id } = item
    const { page } = item.data

    const content = await page.content()
    // console.log('page.content', content)

    const title = await page.title()
    // console.log('page.title', title)

    const metaArr = await page.$$eval(`meta`, (metas) => {
      console.log('metas', metas)
      return metas.map((meta) => meta.attributes.getNamedItem('name'))
    })

    console.log('metaArr', metaArr)

    const keywords = await page.$$eval(`meta[name="keywords"]`, (ele) => {
      console.log('meta[name="keywords"] ele', ele)
      const values = ele.values()

      console.log('meta[name="keywords"] ele.values()', values)
    })

    // 等待页面元素出现
    // await page.waitForSelector(elSelector)

    // 获取页面图片的 URL
    const urls = await page.$$eval(`a`, (ele) => {
      console.log('meta[name="keywords"] ele', ele)
      const values = ele.values()

      console.log('meta[name="keywords"] ele.values()', values)
    })

    console.log('urls', urls)

    // 关闭页面
    page.close()
  }
}

run()
