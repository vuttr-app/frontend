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

  describe('procurar', async () => {
    let wrapper

    beforeEach(async () => {
      api.getTools.mockImplementationOnce(() => {
        const result = [
          { id: 1, title: 'Título da Ferramenta 1', tags: ['a'] },
          { id: 2, title: 'Título da Ferramenta 2', tags: ['a', 'b', 'c'] },
          { id: 3, title: 'Título da Ferramenta 3', tags: ['a', 'c'] }
        ]
        return Promise.resolve(result)
      })
      wrapper = await mount(App, {
        localVue
      })
      expect(await wrapper.findAll(`[data-set='ferramenta']`)).toHaveLength(3)
    })

    it('deve filtrar lista pelo critério em todos os atributos', async () => {
      const input = await wrapper.find(`[data-input='criterio']`)
      input.element.value = 'Ferramenta 2',
      input.trigger('keyup')
      expect(await wrapper.findAll(`[data-set='ferramenta']`)).toHaveLength(1)
    })

    describe('filtrar pelo critério apenas nas tags', async () => {
      it('deve apresentar uma ferramenta', async () => {
        const criterio = await wrapper.find(`[data-input='criterio']`)
        criterio.element.value = 'b',
        criterio.trigger('keyup')
        await wrapper.find(`[data-input='tags']`).trigger('click')
        expect(await wrapper.findAll(`[data-set='ferramenta']`)).toHaveLength(1)
      })

      it('deve apresentar duas ferramentas', async () => {
        const criterio = await wrapper.find(`[data-input='criterio']`)
        criterio.element.value = 'c',
        criterio.trigger('keyup')
        await wrapper.find(`[data-input='tags']`).trigger('click')
        expect(await wrapper.findAll(`[data-set='ferramenta']`)).toHaveLength(2)
      })

      it('deve apresentar três ferramentas', async () => {
        const criterio = await wrapper.find(`[data-input='criterio']`)
        criterio.element.value = 'a',
        criterio.trigger('keyup')
        await wrapper.find(`[data-input='tags']`).trigger('click')
        expect(await wrapper.findAll(`[data-set='ferramenta']`)).toHaveLength(3)
      })
    })
  })
})
