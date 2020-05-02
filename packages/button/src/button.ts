import { h, FunctionalComponent, renderSlot } from 'vue'

export interface ButtonProps {
  // todo: string 是为了兼容。。。
  /** 按钮类型 */
  type?: string | 'primary' | 'info' | 'success' | 'warning' | 'danger'
  /** 按钮文本 */
  text?: string
}

/**
 * Button 按钮
 *
 * @example:
 *
 * <ui-button type="primary" text="button"></ui-button>
 */
const Button: FunctionalComponent<ButtonProps> = (props, ctx) => {
  const classList = [
    'ui-button',
    {
      [`ui-button--${props.type}`]: true,
    },
  ]
  return h(
    'button',
    { class: classList },
    renderSlot(ctx.slots, 'default', {}, () => [props.text])
  )
}

Button.props = {
  type: {
    type: String,
    default: 'default',
  },
  text: String,
}

export default Button
