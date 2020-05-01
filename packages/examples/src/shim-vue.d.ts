import { Plugin, Component } from 'vue'

declare module '*.vue' {
  const VueComponent: Component & Partial<Plugin>

  export default VueComponent
}
