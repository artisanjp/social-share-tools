# social-share-tools
サイト組み込み用のシェアボタンスクリプトです。

## 実装方法

1. ページに `dist/index.js` をロードします。

2. 対象となるHTML要素に下記の属性を追加します。

- Twitterシェア
```
data-artisan-share="twitter"
```

- リンクコピー
```
data-artisan-share="copy-link"
```

- Facebookシェア
```
data-artisan-share="facebook"
```

- Redditシェア
```
data-artisan-share="reddit"
```

2. `dist/app.css` 記載のスタイルを適用します。 \
※ bodyは適用する必要がありません。プレビュー用のスタイルです。

## サンプル
`dist/index.html` に実装例があります。

## ビルド

```
yarn build
```


