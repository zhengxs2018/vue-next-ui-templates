// @ts-ignore
import { start } from '@storybook/core/client'
import { ComponentOptions, FunctionalComponent, h } from 'vue'

import './globals'

import render, { VALUES } from './render'
import { extractProps } from './util'

const WRAPS = 'STORYBOOK_WRAPS'

function prepare(rawStory: any, innerStory?: ComponentOptions | null): ComponentOptions | FunctionalComponent | null {
  let story: ComponentOptions

  if (typeof rawStory === 'string') {
    story = { template: rawStory }
  } else if (rawStory != null) {
    story = rawStory
  } else {
    return null
  }

  if (story[WRAPS]) return story

  if (story._isVNode) {
    return function VNodeWrappedComponent() {
      return story
    }
  }

  // @ts-ignore
  story[WRAPS] = story
  // @ts-ignore
  story[VALUES] = { ...(innerStory ? innerStory[VALUES] : {}), ...extractProps(story) }

  return function StoryWrappedComponent(props) {
    return h(story, props)
  }
}

const defaultContext = {
  id: 'unspecified',
  name: 'unspecified',
  kind: 'unspecified',
  parameters: {},
}
function decorateStory(storyFn: any, decorators: any): any {
  return decorators.reduce(
    (decorated: any, decorator: any) => (context: any = defaultContext) => {
      let story: ComponentOptions | null

      // @ts-ignore
      const decoratedStory = decorator((p) => {
        story = decorated(
          p
            ? {
                ...context,
                ...p,
                parameters: {
                  ...context.parameters,
                  ...p.parameters,
                },
              }
            : context
        )

        return story
      }, context)

      // @ts-ignore
      if (!story) {
        story = decorated(context)
      }

      if (decoratedStory === story) {
        return story
      }

      return prepare(decoratedStory, story)
    },
    (context: any) => prepare(storyFn(context))
  )
}

const framework = 'vue'

const api = start(render, { decorateStory })

export const storiesOf: any = (kind: any, m: any) => {
  return (api.clientApi.storiesOf(kind, m) as any).addParameters({
    framework,
  })
}

export const configure: any = (...args: any[]) => api.configure(...args, framework)
export const addDecorator: any = api.clientApi.addDecorator
export const addParameters: any = api.clientApi.addParameters
export const clearDecorators: any = api.clientApi.clearDecorators
export const setAddon: any = api.clientApi.setAddon
export const forceReRender: any = api.forceReRender
export const getStorybook: any = api.clientApi.getStorybook
export const raw: any = api.clientApi.raw
