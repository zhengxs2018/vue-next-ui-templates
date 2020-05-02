<template>
  <div>
    This is home page.

    <router-link to="/about">go about</router-link>

    <br />

    <p>count: {{ count }}</p>

    <ui-button type="primary" style="margin-right: 5px" @click="count ++">
      +
    </ui-button>

    <ui-button type="primary" @click="count--">
      -
    </ui-button>

  </div>
</template>

<script>
import { ref } from 'vue'

import { Button } from "vue-next-ui";

export default {
  name: 'Home',
  setup() {
    return {
      count: ref(0),
    }
  },
  components: {
    'ui-button': Button
  }
}
</script>
