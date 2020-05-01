import { storiesOf } from '@storybook/vue-next'

import { h, createSlots, createTextVNode, ref } from 'vue'

import Button from './button'

const stories = storiesOf('Button', module)

stories.add('attribute', () => () => {
  // @ts-ignore
  return <Button text="这是用 text 属性写入的22" onClick={() => console.log(1)}></Button>
})

stories.add('slots', () => () => {
  return (
    // @ts-ignore
    <Button
      onClick={() => {
        console.log('slots')
      }}
    >
      {createSlots(
        {
          default: () => [
            createTextVNode('这是主动调用 vnode 生成的'),
            // @ts-ignore
            '这是字符串编译后生成的',
          ],
        },
        []
      )}
    </Button>
  )
})

stories.add('jsx2', () => () => {
  const count = ref(0)
  return (
    <div>
      <Button onClick={() => count.value++}>
        {/* 没 flag 不支持响应式监听 */}
        {count.value}
      </Button>
      {/* 后面的代码不会渲染，还会出警告 */}
      <Button>1</Button>
    </div>
  )
})

stories.add('jsx', () => () => {
  const count = ref(0)
  return (
    // @ts-ignore
    <Button onClick={() => count.value++}>
      {/* 要这种 */}
      {createSlots({
        default: () => [
          createTextVNode('当前点击：'),
          createTextVNode(count.value.toString(), 1)
        ]
      }, [])}
    </Button>
  )
})


