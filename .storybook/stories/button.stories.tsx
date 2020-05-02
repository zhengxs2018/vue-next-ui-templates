import { storiesOf } from '@storybook/vue-next'

import { h, createSlots, createTextVNode, ref } from 'vue'

import '@vue-next-ui/theme-default/lib/index.css'
import { Button } from 'vue-next-ui'

const stories = storiesOf('Button', module)

stories.add('ux-button[text=button]', () => () => {
  // @ts-ignore
  return <Button type="primary" text="button" onClick={() => console.log(1)}></Button>
})

stories.add('ux-button(slots={ default: vNodes[] })', () => () => {
  const count = ref(0)
  const slots = {
    default: () => [createTextVNode('当前点击：'), createTextVNode(count.value.toString(), 1)],
  }
  return (
    // @ts-ignore
    <Button type="primary" onClick={() => count.value++}>
      {createSlots(slots, [])}
    </Button>
  )
})
