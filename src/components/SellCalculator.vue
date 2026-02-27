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
    <div class="input-group">
      <label for="tax-rate">交易稅率</label>
      <select id="tax-rate" v-model="taxRate" class="select-input">
        <option value="0.003">正常稅率</option>
        <option value="0.001">ETF稅率</option>
        <option value="0">無交易稅</option>
      </select>
    </div>
    <div v-if="result" class="output-group">
      <div class="result-row">
        <span class="label">最高收益賣出數量</span>
        <span class="value">{{ result.shares }} 股</span>
      </div>
      <div class="result-row">
        <span class="label">賣出金額</span>
        <span class="value">{{ result.tradeAmount }}</span>
      </div>
      <div class="result-row">
        <span class="label">手續費金額</span>
        <span class="value">{{ result.fee }}</span>
      </div>
      <div class="result-row">
        <span class="label">交易稅金額</span>
        <span class="value">{{ result.tax }}({{ taxRatePercent }}%)</span>
      </div>
      <div class="result-row">
        <span class="label">實際所得金額</span>
        <span class="value">{{ result.proceeds }}</span>
      </div>
      <div class="result-row">
        <span class="label">平均收益</span>
        <span class="value">{{ formatAvg(result.avgProceeds) }} 元/股</span>
      </div>
    </div>
    <div v-else-if="price && price > 0" class="no-result">計算中…</div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { calcSell } from '../utils/calculator'
import { useFeeDiscount } from '../composables/useFeeDiscount'
import { usePrice } from '../composables/usePrice'
import { useTaxRate } from '../composables/useTaxRate'

const { price } = usePrice()
const { taxRate } = useTaxRate()
const result = ref(null)
const { effectiveRate } = useFeeDiscount()

const taxRatePercent = computed(() => {
  const r = parseFloat(taxRate.value) * 100
  return r === 0 ? '0' : r.toFixed(1)
})

function formatAvg(avg) {
  if (avg == null) return '-'
  return avg.toFixed(10).replace(/\.?0+$/, '')
}

watch([price, taxRate, effectiveRate], ([p, tr, rate]) => {
  result.value = calcSell(p, parseFloat(tr), rate)
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

.input-group select.select-input {
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background: #fff;
  cursor: pointer;
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
