<template>
  <div class="app">
    <div class="style-switcher">
      <span class="label">配色切換</span>
      <button
        v-for="s in ['a', 'b', 'c']"
        :key="s"
        type="button"
        class="style-btn"
        :class="[`style-btn--${s}`, { active: style === s }]"
        @click="setStyle(s)"
      >
        {{ s.toUpperCase() }}
      </button>
    </div>
    <div class="fee-discount">
      <label for="fee-discount-input" class="label">手續費折扣</label>
      <div class="input-wrap">
        <input
          id="fee-discount-input"
          v-model="discountInput"
          type="text"
          placeholder="10"
          maxlength="4"
        />
        <span class="suffix">折</span>
      </div>
    </div>
    <header class="header">
      <h1>買賣計算機</h1>
      <p class="subtitle">計算最有利的買賣數量</p>
    </header>
    <RouterView />
    <footer class="params-footer">
      <p>本頁面以手續費比率 0.1425%（買賣皆收取，小數點捨去，最低 1 元）、交易稅比率 0.3%（僅賣出時收取，小數點捨去，最低 0 元）、最大成交金額 10,000 元為計算參數。手續費可於右上角輸入折扣。</p>
    </footer>
  </div>
</template>

<script setup>
import { useStyle } from './composables/useStyle'
import { useFeeDiscount } from './composables/useFeeDiscount'

const { style, setStyle } = useStyle()
const { discountInput } = useFeeDiscount()
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: 'Noto Sans TC', -apple-system, BlinkMacSystemFont, sans-serif;
  background: #f8fafc;
}

.app {
  min-height: 100vh;
  padding: 1rem 0 5.5rem;
  position: relative;
}

.style-switcher {
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.style-switcher .label {
  font-size: 0.875rem;
  color: #64748b;
}

.fee-discount {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.fee-discount .label {
  font-size: 0.875rem;
  color: #64748b;
}

.fee-discount .input-wrap {
  display: flex;
  align-items: center;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  overflow: hidden;
}

.fee-discount .input-wrap input {
  width: 3rem;
  padding: 0.35rem 0.5rem;
  font-size: 0.875rem;
  border: none;
  text-align: right;
}

.fee-discount .input-wrap .suffix {
  padding-right: 0.5rem;
  font-size: 0.875rem;
  color: #64748b;
}

.style-btn {
  padding: 0.35rem 0.65rem;
  font-size: 0.8rem;
  font-weight: 500;
  border: 2px solid transparent;
  border-radius: 6px;
  background: #fff;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s;
}

/* 未選擇時 hover：顯示該樣式配色 */
.style-btn--a:hover:not(.active) {
  background: #f1f5f9;
  color: #0f172a;
}
.style-btn--b:hover:not(.active) {
  background: #fef3c7;
  color: #92400e;
}
.style-btn--c:hover:not(.active) {
  background: #ecfdf5;
  color: #047857;
}

/* 被選擇的樣式：厚邊框 + 該樣式底色與文字色 */
.style-btn--a.active {
  background: #f1f5f9;
  color: #0f172a;
  border: 3px solid #0f172a;
}
.style-btn--b.active {
  background: #fef3c7;
  color: #92400e;
  border: 3px solid #d97706;
}
.style-btn--c.active {
  background: #ecfdf5;
  color: #047857;
  border: 3px solid #059669;
}

.header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.header h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
}

.header .subtitle {
  margin: 0.25rem 0 0;
  font-size: 0.875rem;
  color: #64748b;
}

.params-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 480px;
  margin: 0 auto;
  padding: 1rem 1.5rem 1.25rem;
  background: #f8fafc;
}

.params-footer p {
  margin: 0;
  font-size: 0.75rem;
  line-height: 1.6;
  color: #94a3b8;
}

/* 風格 A - 灰藍中性 */
.style-a .output-group {
  background: #f8fafc !important;
  border: 1px solid #e2e8f0 !important;
}
.style-a .result-row .value {
  color: #0f172a !important;
}

/* 風格 B - 暖色琥珀 */
.style-b .output-group {
  background: #fffbeb !important;
  border: 1px solid #fcd34d !important;
}
.style-b .result-row .value {
  color: #b45309 !important;
}

/* 風格 C - 綠色 */
.style-c .output-group {
  background: #f0fdf4 !important;
  border: 1px solid #86efac !important;
}
.style-c .result-row .value {
  color: #047857 !important;
}
</style>
