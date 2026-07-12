# 旅行手帳 Travel Planner Ultimate v1.0

這是重新建立 GitHub Repository 用的「乾淨穩定版」。

## 為什麼這版比較不容易部署失敗

本專案採用扁平式結構，沒有 `netlify/functions`、`css/`、`js/` 等必要資料夾。
iPhone 上傳時比較不容易把資料夾誤傳成檔案。

Repository 首頁應直接看到：

- `index.html`
- `styles.css`
- `app.js`
- `manifest.webmanifest`
- `service-worker.js`
- `netlify.toml`
- `icon-192.png`
- `icon-512.png`
- `README.md`

## 已包含的核心功能

- 初始設定精靈
- 目的地、日期與語言／幣別偵測
- 每日行程及橫向日期選單
- 景點、餐廳、甜點、住宿、交通
- 準備清單
- 天氣與地圖
- 行程距離及移動時間估算
- 分帳與匯率
- 翻譯、常用句、慢速發音
- 親友唯讀分享
- PWA 安裝及基本離線快取
- 療癒系手帳風：深色粗框＋乾淨固態陰影

## 目前刻意沒有啟用

Google Places、Papago 官方 API、Naver 官方 API、全航班即時 API。
這些功能需要金鑰與後端代理，之後可在穩定版成功部署後再逐項加入。

## 建立新 GitHub Repository

請看 `SETUP_STEPS.txt`。
