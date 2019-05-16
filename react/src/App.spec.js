jest.mock('@/services/api', () => {
  return {
    removeTool: jest.fn(),
    createTool: jest.fn(),
    getTools: jest.fn()
  }
})

import React from 'react'
import ReactDOM from 'react-dom'

import App from '@/App'
import api from '@/services/api'

import { mount } from 'enzyme'
import flushPromises from 'flush-promises'

describe(`<App />`, () => {
  describe(`lista`, () => {
    it('não deve apresentar a lista', async () => {
      api.getTools.mockImplementationOnce(() => {
        const result = []
        return Promise.resolve(result)
      })
      const wrapper = await mount(<App/>)
      await wrapper.update()
      expect(wrapper.find(`[data-set='ferramenta']`)).toHaveLength(0)
    })

    it('deve apresentar uma lista de tamanho 1', async () => {
      api.getTools.mockImplementationOnce(() => {
        const result = [
          {
            title: 'Título',
            link: 'http://fer.ra/me',
            description: 'Descrição',
            tags: ['t1', 't2']
          }
        ]
        return Promise.resolve(result)
      })

      const wrapper = await mount(<App/>)
      await wrapper.update()
      const ferramentas = wrapper.find(`[data-set='ferramenta']`)
      expect(ferramentas).toHaveLength(1)
      const ferramenta = ferramentas.at(0)
      expect(ferramenta.find(`[data-set='title']`).text()).toBe('Título')
      expect(ferramenta.find(`[data-set='link']`).prop('href'))
        .toBe('http://fer.ra/me')
      expect(ferramenta.find(`[data-set='description']`).text())
        .toBe('Descrição')
      const tags = ferramenta.find(`[data-set='tags']`)
      expect(tags.text()).toContain('t1')
      expect(tags.text()).toContain('t2')
    })

    it('deve apresentar uma lista de tamanho 2', async () => {
      api.getTools.mockImplementationOnce(() => {
        const result = [
          {
            title: 'Título',
            link: 'http://fer.ra/me',
            description: 'Descrição',
            tags: ['t1', 't2']
          },
          {
            title: 'Título',
            link: 'http://fer.ra/me',
            description: 'Descrição',
            tags: ['t1', 't2']
          }
        ]
        return Promise.resolve(result)
      })
      const wrapper = await mount(<App/>)
      await wrapper.update()
      expect(wrapper.find(`[data-set='ferramenta']`)).toHaveLength(2)
    })
  })
})
