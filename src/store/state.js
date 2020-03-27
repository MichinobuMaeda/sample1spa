export default function () {
  return {
    // 商品一覧
    items: [],
    // HTTP API の URL のベース ( テスト用は localhost で quasar.conf.js に設定したプロキシを利用する )
    apiUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:8080/api' : 'https://example.com'
  }
}
