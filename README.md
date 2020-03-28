Sample 1 SPA
=====

[Quasar Framework](https://quasar.dev//) による SPA ( Single Page Application ) のサンプル。

* 商品のリストの追加・参照・変更・削除を SPA で実装する。
* HTTP API として [Sample 1 API](https://github.com/MichinobuMaeda/sample1api) を利用する。
* このサンプルの処理では性能・負荷を考慮していない。データを更新するたびに全データを取得し直す処理としている。
* このサンプルではデータ無し、通信エラーなどのエラー処理は省略している。
* このサンプルには [Jest](https://jestjs.io/) 、[Vue Test Utils](https://vue-test-utils.vuejs.org/) 等によるテストを含まない。

## Git と GitHub の利用に必要な設定

Sample 1 API の [README.md]((https://github.com/MichinobuMaeda/sample1api) を参照のこと。


## Node.js

Node.js 8.x 以上、 NPM 5.x 以上が必要。
[Yarn](https://yarnpkg.com/) と
[Quasar CLI](https://quasar.dev/quasar-cli/installation) も利用する。

```
$ node --version
v10.19.0
$ npm install -g npm
$ npm --version
6.14.4
$ npm install -g yarn
$ yarn --version
1.22.4
$ yarn global add @quasar/cli
```


## プロジェクトの利用

HTTP API については Sample 1 API の
[README.md]((https://github.com/MichinobuMaeda/sample1api) を参照のこと。

```
$ git clone git@github.com:MichinobuMaeda/sample1spa.git
$ cd sample1spa
$ yarn
```

``quasar dev`` でデフォルトのブラウザが起動して http://localhost:8080/#/ を表示する。

``quasar build`` コマンドで本番用のコードを ``dist/spa`` に出力する。


## 参考：プロジェクトの作成

このプロジェクトは以下の手順で作成した。

Quasar のプロジェクトを作成する。

```
$ quasar create sample1spa
```

``? Check the features needed for your project: `` で

* ESLint
* Vuex
* IE11 support

を選択する。それ以外は全てデフォルトとする。

```
$ cd sample1spa
$ quasar dev
```

プロジェクトを GitHub に登録する。

https://github.com/new でリポジトリ ``sample1spa`` を作成して、以下のコマンドを実行する。

```
$ git init
$ git add .
$ git commit -m "first commit"
$ git remote add origin git@github.com:MichinobuMaeda/sample1spa.git
$ git push -u origin master
```

``.gitignore`` に一般的な設定を追加する。

参照: https://github.com/github/gitignore/tree/master/Global


## Vuex

サンプルで作成されている store のモジュールは使用しない。

``src/store/module-example/index.js`` は ``namespaced`` 以外の内容を
``src/store/index.js`` に移動して削除する。
それ以外のファイルは ``src/store`` の直下に移動する。
SSR 用の設定は不要。

```
$ git rm src/store/module-example/index.js 
$ git mv src/store/module-example/* src/store/
```

## CORS 回避

テスト環境の Cross-Origin Resource Sharing (CORS) 問題を回避するために以下のようにする。

* HTTP API の URL のベースは SPA を配置したサーバの ./api とする。
* ``quasar.conf.js`` の ``devServer`` にプロキシの設定を追加して、
  ``/api`` へのリクエストを HTTP API のテスト用サーバに転送する。
