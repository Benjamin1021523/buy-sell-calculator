# 買賣計算機

單頁網頁工具，用於計算股票交易最有利的買進/賣出數量。

## 功能

- **買進計算機**：輸入目標股價，計算成本最低的買進股數與平均成本
- **賣出計算機**：輸入目標股價與是否課稅，計算收益最高的賣出股數與平均收益

## 技術

- Vue 3 + Vite
- Vue Router
- 純前端，無外部 API

## 本地開發

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev
```

瀏覽 `http://localhost:5173`

## 建置

```bash
npm run build
```

輸出至 `dist/`

## 預覽建置結果

```bash
npm run preview
```

---

# GitHub Pages 部署設置

## 1. 倉庫設定

1. 前往 GitHub 倉庫 → **Settings** → **Pages**
2. 在 **Build and deployment** 區塊：
   - **Source** 選 **GitHub Actions**

## 2. 觸發部署

推送至 `main` 或 `master` 分支時，會自動執行建置並部署到 GitHub Pages。

## 3. base 路徑

- **專案站點**（如 `https://username.github.io/買賣計算機/`）：workflow 已設定 `VITE_BASE: /${{ github.event.repository.name }}/`
- **根站點**（如 `https://username.github.io/`）：請在 `.github/workflows/deploy.yml` 中將 `VITE_BASE` 改為 `/`

## 4. 網址說明

部署完成後：

- 專案站點：`https://<username>.github.io/<repo-name>/`
- 買進計算機：`/buy/` 或 `/buy`
- 賣出計算機：`/sell/` 或 `/sell`
- 配色切換：點擊頁面左上角「配色切換」旁 A、B、C 按鈕

## 5. 常見問題

**頁面 404**：確認 Pages 的 Source 已選 **GitHub Actions**，且 base 路徑與實際網址一致。

**樣式或路由異常**：若部署在子路徑（如 `/買賣計算機/`），需確保 `vite.config.js` 的 `base` 與該路徑一致。
