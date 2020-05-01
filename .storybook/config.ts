import { configure } from '@storybook/vue-next'

const loader = require.context(`../packages`, true, /\.stories\.[tj]sx?$/)

function loadStories() {
  loader.keys().forEach((filename) => {
    loader(filename)
  })
}

configure(loadStories, module)
