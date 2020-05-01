import dedent from 'ts-dedent'

import { createApp, reactive, markRaw, h } from 'vue'

export const COMPONENT = 'STORYBOOK_COMPONENT'
export const VALUES = 'STORYBOOK_VALUES'

const store = reactive({
  [COMPONENT]: null,
  [VALUES]: {},
})

const root = createApp({
  render() {
    const component = store[COMPONENT]
    return component ? h(component) : null
  },
})

export default function render({
  storyFn,
  selectedKind,
  selectedStory,
  showMain,
  showError,
  showException,
  forceRender,
}: any): any {
  root.config.errorHandler = showException

  const element = storyFn()

  if (!element) {
    showError({
      title: `Expecting a Vue component from the story: "${selectedStory}" of "${selectedKind}".`,
      description: dedent`
        Did you forget to return the Vue component from the story?
        Use "() => ({ template: '<my-comp></my-comp>' })" or "() => ({ components: MyComp, template: '<my-comp></my-comp>' })" when defining the story.
      `,
    })
    return
  }

  showMain()

  // at component creation || refresh by HMR
  if (!store[COMPONENT] || !forceRender) {
    store[COMPONENT] = markRaw(element)
  }

  // @ts-ignore https://github.com/storybookjs/storybook/pull/7578#discussion_r307986139
  store[VALUES] = element[VALUES]

  if (!root._container) {
    root.mount('#root')
  }
}
