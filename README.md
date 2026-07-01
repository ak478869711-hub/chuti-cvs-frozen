# 初啼 7-11 冷凍交貨便門市資料

`frozen-stores.json` — 全台 7-ELEVEN「冷凍交貨便」門市清單，供初啼官網結帳選店用。

- 來源：統一超商官方 uniopen 門市清單，過濾 `services` 含 `"66"`（冷凍交貨便）。
- 欄位：`i`=店號 `n`=店名 `a`=地址 `c`=縣市 `lat`/`lng`=座標。
- 每週由 GitHub Action 自動重抓更新（`build-frozen.mjs`）。
- 官網透過 jsDelivr 跨網域讀取。
