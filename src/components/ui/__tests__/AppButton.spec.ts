import { mount } from '@vue/test-utils'
import AppButton from '../AppButton.vue'

describe('AppButton', () => {
  it('renderiza o conteúdo do slot', () => {
    const wrapper = mount(AppButton, {
      slots: {
        default: 'Clique aqui',
      },
    })

    expect(wrapper.text()).toContain('Clique aqui')
  })

  it('emite evento de click quando habilitado', async () => {
    const wrapper = mount(AppButton, {
      slots: { default: 'Ok' },
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })
})

