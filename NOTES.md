# 結帳頁「冷凍門市選店」Insert Code（B 案）— 開發筆記

`checkout-insert-code.html` = 要貼進 EasyStore Insert Code「初啼冷凍取貨」的 </body> 內容（目前線上就是這份，但已關閉）。

## 狀態（2026-07-01 暫停）
- 已上線試用 → **發現 bug、已把 Insert Code 開關關閉（OFF）**，店面乾淨。
- 藏「自取/委託」兩行（hideSelfCollect）**正常**；只有 ❄️ 按鈕沒顯示。

## Bug 根因
結帳頁有 **兩個「取貨資料」<h3>**：
- idx0 = 隱藏的模板副本（offsetParent=null、rect 0×0）
- idx1 = 真正顯示的那個（rect 560×26）
`addBtn()` 用 `.find()` 抓到 idx0（隱藏那份），❄️ 按鈕插進去 → 0 尺寸、顧客看不到。

## 修法（待驗證）
`addBtn()` 找「取貨資料」h3 時改挑「可見」那顆：
```
var qu=[].slice.call(document.querySelectorAll('h2,h3,h4'))
  .filter(function(e){ return e.children.length===0 && (e.textContent||'').trim()==='取貨資料'; })
  .find(function(e){ return e.offsetParent && e.getBoundingClientRect().width>0; });
```
⚠️ 改完務必用**整頁截圖(fullPage)**確認 ❄️ 按鈕真的看得到（別只信 getElementById，會抓到隱藏那份）。

## 資源
- 資料：本 repo `frozen-stores.json` → jsDelivr `@master`（每週 Action 自動更新，6892 冷凍門市）
- 試用頁：https://ak478869711-hub.github.io/chuti-cvs-frozen/
- 完整脈絡：Claude 記憶 `project-chuti-frozen-pickup-map`
