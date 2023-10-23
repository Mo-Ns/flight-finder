import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FormButton from '@/ui-components/button/button.vue';

describe('FormButton', () => {
  it('renders the button with the provided text', () => {
    const buttonText = 'Click Me';
    const wrapper = mount(FormButton, {
      slots: {
        default: buttonText,
      },
    });

    expect(wrapper.text()).toMatch(buttonText);
  });

  it('emits a click event when the button is clicked', async () => {
    const buttonText = 'Click Me';
    const wrapper = mount(FormButton, {
      slots: {
        default: buttonText,
      },
    });

    await wrapper.trigger('click');

    expect(wrapper.emitted().click).toBeTruthy();
    expect(wrapper.emitted().click.length).toBe(1);
  });
});
