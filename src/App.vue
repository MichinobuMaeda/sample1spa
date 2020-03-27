<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'App',
  async mounted () {
    // 初期データを取得する。
    await this.listItems()
  },
  methods: {
    ...mapActions([
      'listItems'
    ])
  }
}
</script>
