<template>
  <div class="sell-calculator">
    <div class="input-group">
      <label for="sell-price">賣出目標價格</label>
      <input
        id="sell-price"
        v-model.number="price"
        type="number"
        step="0.01"
        min="0"
        placeholder="ex: 9.7"
      />
    </div>
    <div class="input-group checkbox-group">
      <label>
        <input v-model="noTax" type="checkbox" />
        無交易稅
      </label>
    </div>
    <div v-if="result" class="output-group">
      <div class="result-row">
        <span class="label">賣出所得</span>
        <span class="value">{{ result.proceeds }}</span>
      </div>
      <div class="result-row">
        <span class="label">最高收益賣出數量</span>
        <span class="value">{{ result.shares }} 股</span>
      </div>
      <div class="result-row">
        <span class="label">賣出手續費金額</span>
        <span class="value">{{ result.fee }}</span>
      </div>
      <div class="result-row">
        <span class="label">交易稅金額</span>
        <span class="value">{{ result.tax }}</span>
      </div>
      <div class="result-row">
        <span class="label">此時平均收益</span>
        <span class="value">{{ formatAvg(result.avgProceeds) }} 元/股</span>
      </div>
    </div>
    <div v-else-if="price && price > 0" class="no-result">計算中…</div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { calcSell } from '../utils/calculator'
import { useFeeDiscount } from '../composables/useFeeDiscount'

const price = ref('')
const noTax = ref(false)
const result = ref(null)
const { effectiveRate } = useFeeDiscount()

function formatAvg(avg) {
  if (avg == null) return '-'
  return avg.toFixed(10).replace(/\.?0+$/, '')
}

watch([price, noTax, effectiveRate], ([p, n, rate]) => {
  result.value = calcSell(p, n, rate)
}, { immediate: true })
</script>

<style scoped>
.sell-calculator {
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

.input-group input[type="number"] {
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.checkbox-group label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.checkbox-group input[type="checkbox"] {
  width: 1.125rem;
  height: 1.125rem;
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
