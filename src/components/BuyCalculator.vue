<template>
  <div class="buy-calculator">
    <div class="input-group">
      <label for="buy-price">買進目標價格</label>
      <input
        id="buy-price"
        v-model.number="price"
        type="number"
        step="0.01"
        min="0"
        placeholder="ex: 9.7"
      />
    </div>
    <div v-if="result" class="output-group">
      <div class="result-row">
        <span class="label">買進花費</span>
        <span class="value">{{ result.cost }}</span>
      </div>
      <div class="result-row">
        <span class="label">成本最低買進數量</span>
        <span class="value">{{ result.shares }} 股</span>
      </div>
      <div class="result-row">
        <span class="label">買進手續費金額</span>
        <span class="value">{{ result.fee }}</span>
      </div>
      <div class="result-row">
        <span class="label">此時平均成本</span>
        <span class="value">{{ formatAvgCost(result.avgCost) }} 元/股</span>
      </div>
    </div>
    <div v-else-if="price && price > 0" class="no-result">計算中…</div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { calcBuy } from '../utils/calculator'

const price = ref(9.7)
const result = ref(null)

function formatAvgCost(avg) {
  if (avg == null) return '-'
  return avg.toFixed(10).replace(/\.?0+$/, '')
}

watch(price, (val) => {
  result.value = calcBuy(val)
}, { immediate: true })
</script>

<style scoped>
.buy-calculator {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-group label {
  font-weight: 500;
  font-size: 0.875rem;
}

.input-group input {
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.output-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
}

.result-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.result-row .label {
  font-size: 0.875rem;
  color: #64748b;
}

.result-row .value {
  font-weight: 600;
  font-size: 1rem;
}
</style>
