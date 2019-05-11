import { setDefaultTimeout, Before, After, AfterAll, BeforeAll } from 'cucumber'
import { createSession, startWebDriver, stopWebDriver, client } from 'nightwatch-api'
import config from './nightwatch.conf.js'
import S from 'string'
import fs from 'fs'

setDefaultTimeout(60 * 1000)

BeforeAll(async () => {
  await startWebDriver({ env: process.env.browser || 'firefox' })
  await createSession()
})

Before(async () => {
  if (false) {
    await client
      .getLog('browser', result => {
        console.error('$$$$$$$', result)
        return client
      })
      .getLog('driver', result => {
        console.error('%%%%%%%', result)
        return client
      })
      .getLog('client', result => {
        console.error('@@@@@@@', result)
        return client
      })
      .getLog('server', result => {
        console.error('!!!!!!!', result)
        return client
      })
  }
})

After(async (context) => {
  const status = context.result.status
  const screenshots = config.test_settings.default.screenshots.path
  const feature = context
    .sourceLocation.uri.replace(/^features\//, '').replace(/\.feature$/, '')
  const scenario = S(context.pickle.name).slugify().s
  const filename = `${screenshots}/${status}/${feature}/${scenario}`
  await client.saveScreenshot(`${filename}.png`)
  await client.source((result) => {
    fs.writeFile(`${filename}.html`, result.value, (error) => {
      if (error) {
        return console.error(error)
      }
    })
  })
})

AfterAll(async () => {
  await stopWebDriver()
})
