
declare module '*.vue' {
  import { Plugin, Component } from 'vue'

  const VueComponent: Component & Partial<Plugin>

  export default VueComponent
}
