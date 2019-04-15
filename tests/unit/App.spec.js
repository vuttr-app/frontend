jest.mock('@/services/api', () => {
  return {
    getTools: jest.fn()
  }
})

import api from '@/services/api'

import { mount, createLocalVue } from '@vue/test-utils'
import App from '@/App'

describe('App', async () => {
  const localVue = createLocalVue()
  describe('renderiza a lista de ferramentas', async () => {
    it('quando a lista não possui qualquer ferramenta', async () => {
      api.getTools.mockImplementationOnce(() => {
        const result = []
        return Promise.resolve(result)
      })
      const wrapper = await mount(App, {
        localVue
      })
      expect(wrapper.findAll(`[data-set='ferramenta']`)).toHaveLength(0)
    })

    it('quando a lista possui apenas uma ferramenta', async () => {
      api.getTools.mockImplementationOnce(() => {
        const result = [
          { title: 'Ferramenta 1' }
        ]
        return Promise.resolve(result)
      })
      const wrapper = await mount(App, {
        localVue
      })
      expect(wrapper.findAll(`[data-set='ferramenta']`)).toHaveLength(1)
    })

    it('quando a lista possui mais que uma ferramenta', async () => {
      api.getTools.mockImplementationOnce(() => {
        const result = [
          { title: 'Ferramenta 1' },
          { title: 'Ferramenta 2' }
        ]
        return Promise.resolve(result)
      })
      const wrapper = await mount(App, {
        localVue
      })
      expect(wrapper.findAll(`[data-set='ferramenta']`)).toHaveLength(2)
    })
  })
})
