<template>
  <q-page class="row justify-center">
    <div class="col col-md-8 col-xl-6 q-pa-sm">
      <div class="text-h6 q-my-sm" v-if="!trg.id">該当する商品がありません。
        <div class="text-right">
          <q-btn class="q-ml-sm" label="戻る" :to="{ name: 'top' }" />
        </div>
      </div>
      <div v-else>
        <div class="text-h5 q-my-sm" v-if="trg.id === 'new'">商品の新規登録</div>
        <div class="text-h5 q-my-sm" v-else>商品ID: {{ trg.id }}</div>
        <q-form ref="main">
          <q-input v-model="trg.name" label="商品名" :rules="[
              v => !!v || '入力必須です。'
            ]"
          />
          <div class="row">
            <div class="col col-6 q-pr-md">
              <q-select v-model="trg.color" :options="colors" label="色" :rules="[
                  v => !!v || '入力必須です。'
                ]"
              />
            </div>
            <div class="col col-6 q-pl-md">
              <q-input v-model="trg.length" label="サイズ" type="number" :rules="[
                  v => !!v || '入力必須です。',
                  v => v > 0 || '1cm 以上の値を入力してください。',
                  v => v <= 100 || '100cm 以下の値を入力してください。',
                ]"
                suffix="cm"
              />
            </div>
          </div>
          <div class="text-right">
            <q-btn class="q-mr-sm" color="primary" label="保存" @click="onSaveItem" :disable="buttonClicked" />
            <q-btn class="q-ml-sm" label="取り消し" :to="{ name: 'top' }" :disable="buttonClicked" />
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<style scoped>
code {
  font-family: monospace;
}
</style>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'PageItem',
  data () {
    return {
      // 編集データ
      trg: {},
      // ボタン無効ステータス
      buttonClicked: false
    }
  },
  mounted () {
    // "items/new" の場合は新規登録、それ以外の場合は更新。
    const id = this.$route.params.itemId
    this.trg = id === 'new' ? { id: 'new' } : { ...this.item(Number(id)) }
    // 初期状態でボタンは有効。
    this.buttonClicked = false
  },
  methods: {
    // ボタン「保存」クリック時の処理
    async onSaveItem () {
      // ボタンを無効にする。
      this.buttonClicked = true
      // 入力エラーが無い場合、
      const valid = await this.$refs.main.validate()
      if (valid) {
        // 入力値を新規登録または更新する。
        if (this.$route.params.itemId === 'new') {
          await this.createItem(this.trg)
        } else {
          await this.updateItem(this.trg)
        }
        this.$router.push({ name: 'top' })
      }
      // ボタンを有効にする。
      this.buttonClicked = false
    },
    ...mapActions([
      'createItem',
      'updateItem'
    ])
  },
  computed: {
    ...mapGetters([
      'item',
      'colors'
    ])
  }
}
</script>
