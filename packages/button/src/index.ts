import { App, Plugin } from 'vue'

import Button from './button'

/* istanbul ignore next */
;(<typeof Button & Plugin>Button).install = function install(app: App<any>) {
  app.component(Button.name as string, Button)
}

export default Button
