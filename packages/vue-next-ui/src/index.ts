import type { App, Component, Plugin } from 'vue'

import Button from '@vue-next-ui/button'

export {
  Button
}

const Components: Component[] = [
  Button as  Component
]

function install(app: App<any>) {
  Components.forEach(Component => {
    app.component(Component.name as string, Component)
  })
}

export default {
  version: process.env.VERSION || 'dev',
  install: install
} as { version: string } & Plugin
