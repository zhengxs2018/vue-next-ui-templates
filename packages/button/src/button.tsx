import { h, FunctionalComponent, renderSlot } from 'vue'

export interface UxButtonProps {
  text?: string
}

const Button: FunctionalComponent<UxButtonProps> = (props, ctx) => {
  return h(
    'button',
    {},
    renderSlot(ctx.slots, 'default', {}, () => [props.text])
  )
}

Button.props = {
  text: String,
}

export default Button
