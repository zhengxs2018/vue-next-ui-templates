<template>
  <div>
    This is home page.

    <router-link to="/about">go about</router-link>

    <div>text: {{ count }}</div>

    <ui-button @click="count++">
      add
    </ui-button>

    <ui-button text="按钮33"></ui-button>
  </div>
</template>

<script>
import { ref } from 'vue'
import Button from '@vue-next-ui/button'

export default {
  name: 'Home',
  setup() {
    return {
      count: ref(0),
    }
  },
  components: {
    'ui-button': Button,
  },
}
</script>
