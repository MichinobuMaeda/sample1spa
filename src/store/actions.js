import axios from 'axios'

// 商品一覧を取得する。
export const listItems = async ({ commit, state }) => {
  const resp = await axios.get(state.apiUrl + '/items')
  commit('setItems', resp.data.data)
}
// 商品を新規登録して、商品一覧を更新する。
export const createItem = async ({ commit, state }, item) => {
  const resp = await axios.post(state.apiUrl + '/items', item)
  if (resp) {
    await listItems({ commit, state })
  }
}
// 商品を更新して、商品一覧を更新する。
export const updateItem = async ({ commit, state }, item) => {
  const resp = await axios.put(state.apiUrl + '/items/' + item.id, item)
  if (resp) {
    await listItems({ commit, state })
  }
}
// 商品を削除して、商品一覧を更新する。
export const deleteItem = async ({ commit, state }, item) => {
  const resp = await axios.delete(state.apiUrl + '/items/' + item.id)
  if (resp) {
    await listItems({ commit, state })
  }
}
