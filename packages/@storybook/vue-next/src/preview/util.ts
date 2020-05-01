function getType(fn: any) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/)
  return match ? match[1] : ''
} // https://github.com/vuejs/vue/blob/dev/src/core/util/props.js#L92

function resolveDefault(_ref: any) {
  var type = _ref.type,
    def = _ref['default']

  if (typeof def === 'function' && getType(type) !== 'Function') {
    // known limitation: we don't have the component instance to pass
    return def.call()
  }

  return def
}

export function extractProps(component: any) {
  // @ts-ignore this options business seems not good according to the types
  return Object.entries(component?.props || {})
    .map(([name, prop]) => ({ [name]: resolveDefault(prop) }))
    .reduce((wrap, prop) => ({ ...wrap, ...prop }), {})
}
