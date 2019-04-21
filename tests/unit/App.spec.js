jest.mock('@/services/api', () => {
  return {
    getTools: jest.fn(),
    createTool: jest.fn()
  }
})

import { mount, createLocalVue } from '@vue/test-utils'

import App from '@/App'
import api from '@/services/api'

let localVue
describe('App', async () => {
  beforeEach(async () => {
    localVue = createLocalVue()
  })

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

  describe('adiciona uma nova ferramenta', async () => {
    beforeEach(async () => {
      api.createTool.mockImplementationOnce((tool) => {
        const result = { ...tool, id: 1 }
        return Promise.resolve(result)
      })
    })

    it('quando a lista não possui qualquer ferramenta', async () => {
      api.getTools.mockImplementationOnce(() => {
        const result = []
        return Promise.resolve(result)
      })
      const wrapper = await mount(App, {
        localVue
      })
      await wrapper.find(`[action-trigger='nova']`).trigger('click')
      const input = wrapper.find(`[data-input='title']`)
      input.element.value = 'Título da Ferramenta'
      input.trigger('change')
      await wrapper.find(`[action-trigger='adicionar']`).trigger('click')
      expect(await wrapper.findAll(`[data-set='ferramenta']`)).toHaveLength(1)
      expect(api.createTool).toHaveBeenCalledWith({ title: 'Título da Ferramenta' })
    })

    it('quando a lista possui apenas uma ferramenta', async () => {
      api.getTools.mockImplementationOnce(() => {
        const result = [{ title: 'Título da Ferramenta 1' }]
        return Promise.resolve(result)
      })
      const wrapper = await mount(App, {
        localVue
      })
      await wrapper.find(`[action-trigger='nova']`).trigger('click')
      await wrapper.find(`[action-trigger='adicionar']`).trigger('click')
      expect(await wrapper.findAll(`[data-set='ferramenta']`)).toHaveLength(2)
    })

    it('quando a lista possui mais que uma ferramenta', async () => {
      api.getTools.mockImplementationOnce(() => {
        const result = [
          { title: 'Título da Ferramenta 1' },
          { title: 'Título da Ferramenta 2' }
        ]
        return Promise.resolve(result)
      })
      const wrapper = await mount(App, {
        localVue
      })
      await wrapper.find(`[action-trigger='nova']`).trigger('click')
      await wrapper.find(`[action-trigger='adicionar']`).trigger('click')
      expect(await wrapper.findAll(`[data-set='ferramenta']`)).toHaveLength(3)
    })
  })
})
