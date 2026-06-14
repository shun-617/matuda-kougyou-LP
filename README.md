# 株式会社 松田工業 採用LP

Instagram投稿の「詳しくはこちら」から遷移させるための静的LPです。

## ファイル構成

- `index.html`: LP本体
- `styles.css`: デザインとレスポンシブ対応
- `script.js`: 問い合わせ文の自動作成
- `assets/matsuda-recruit.png`: 元画像素材

## 公開前に差し替える内容

- `index.html` の電話リンク
  - 現在: `tel:09097919481`
- `index.html` のメールリンク
  - 現在: `mailto:matsuda.20190121@gmail.com`
- 必要に応じて、給与・勤務時間・勤務地・雇用形態を追記

## InstagramからLPへ飛ばす流れ

1. このフォルダの中身を GitHub Pages、レンタルサーバー、STUDIO、Wix などに公開する。
2. 公開後に発行されたURLをコピーする。
3. Instagramの投稿、ストーリーズ、プロフィールリンク、広告の「詳しくはこちら」にそのURLを設定する。
4. スマホで投稿からLPへ移動し、表示と問い合わせ導線を確認する。

## ローカル確認

同梱Pythonがある環境では、以下で確認できます。

```powershell
C:\Users\user\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe -m http.server 4173 --bind 127.0.0.1
```

ブラウザで `http://127.0.0.1:4173/` を開きます。
