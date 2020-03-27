// 商品一覧
export const items = state => state.items
// IDに対応する商品
export const item = state => id => state.items.reduce((ret, cur) => cur.id === id ? cur : ret, {})
// 色の一覧
export const colors = () => ['白', '赤', '緑', '青', '黒']
