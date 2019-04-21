jest.mock('@/services/api', () => {
  return {
    removeTool: jest.fn(),
    createTool: jest.fn(),
    getTools: jest.fn()
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

  describe('lista', async () => {
    it('não deve apresentar a lista', async () => {
      api.getTools.mockImplementationOnce(() => {
        const result = []
        return Promise.resolve(result)
      })
      const wrapper = await mount(App, {
        localVue
      })
      expect(wrapper.findAll(`[data-set='ferramenta']`)).toHaveLength(0)
    })

    it('deve apresentar uma lista de tamanho 1', async () => {
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

    it('deve apresentar uma lista de tamanho 2', async () => {
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

  describe('adiciona', async () => {
    beforeEach(async () => {
      api.createTool.mockImplementationOnce((tool) => {
        const result = { ...tool, id: 1 }
        return Promise.resolve(result)
      })
    })

    it('deve apresentar uma lista de tamanho 1', async () => {
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

    it('deve apresentar uma lista de tamanho 2', async () => {
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

    it('deve apresentar uma lista de tamanho 3', async () => {
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

  describe('remove', async () => {
    beforeEach(async () => {
      api.removeTool.mockImplementationOnce((id) => {
        const result = {}
        return Promise.resolve(result)
      })
    })

    it('não deve apresentar uma lista', async () => {
      api.getTools.mockImplementationOnce(() => {
        const result = [{ id: 1, title: 'Título da Ferramenta 1' }]
        return Promise.resolve(result)
      })
      const wrapper = await mount(App, {
        localVue
      })
      await wrapper.find(`[action-trigger='remover']`).trigger('click')
      expect(await wrapper.findAll(`[data-set='ferramenta']`)).toHaveLength(0)
      expect(api.removeTool).toHaveBeenCalledWith(1)
    })

    it('deve apresentar uma lista de tamanho 1', async () => {
      api.getTools.mockImplementationOnce(() => {
        const result = [
          { id: 1, title: 'Título da Ferramenta 1' },
          { id: 2, title: 'Título da Ferramenta 2' }
        ]
        return Promise.resolve(result)
      })
      const wrapper = await mount(App, {
        localVue
      })
      await wrapper.find(`[action-trigger='remover']`).trigger('click')
      expect(await wrapper.findAll(`[data-set='ferramenta']`)).toHaveLength(1)
    })
  })
})
