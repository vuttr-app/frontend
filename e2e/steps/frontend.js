import { client } from 'nightwatch-api'

export default class Frontend {
  constructor (url) {
    this.url = url
    this.browser = client
  }

  async entrar (delay = 10000) {
    await this.browser.url(this.url)
      .pause(delay)
  }

  async titulo (delay = 5000) {
    let result
    await this.browser
      .pause(delay)
      .getTitle((value) => {
        result = value
      })
    return result
  }

  async adicionar () {
    await this.browser
      .click(`//*[@action-trigger='nova']`)
      .setValue(`//*[@data-input='title']`, 'Título da Ferramenta')
      .click(`//*[@action-trigger='adicionar']`)
  }

  async remover () {
    await this.browser
      .click(`//*[@action-trigger='remover']`)
      .click(`//*[contains(@class, 'data-set-confirm')]//*[text()='Yes, remove']`)
  }

  async procurar (criterio, tag) {
    await this.browser
      .setValue(`//*[@data-input='criterio']`, criterio)
    if (tag) {
      await this.browser
        .click(`//*[@data-input='tags']`)
    }
  }

  async ferramentas (delay = 500) {
    let result
    await this.browser
      .pause(delay)
      .elements('xpath', `//*[@data-set='ferramenta']`, (outcome) => {
        result = outcome.value
      })
    return result
  }
}


