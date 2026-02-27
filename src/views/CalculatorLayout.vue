<template>
  <div :class="['calculator-layout', `style-${style}`]">
    <nav class="tabs">
      <router-link to="/buy" class="tab" active-class="active">買進計算機</router-link>
      <router-link to="/sell" class="tab" active-class="active">賣出計算機</router-link>
    </nav>
    <main class="content">
      <BuyCalculator v-if="$route.path === '/buy'" />
      <SellCalculator v-else />
    </main>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useStyle } from '../composables/useStyle'
import BuyCalculator from '../components/BuyCalculator.vue'
import SellCalculator from '../components/SellCalculator.vue'

const route = useRoute()
const { style } = useStyle()
</script>

<style scoped>
.calculator-layout {
  max-width: 480px;
  margin: 0 auto;
  padding: 1.5rem;
}

.tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tab {
  flex: 1;
  padding: 0.75rem 1rem;
  text-align: center;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s;
}

.style-a .tab {
  background: #f1f5f9;
  color: #475569;
}
.style-a .tab.active {
  background: #0f172a;
  color: white;
}

.style-b .tab {
  background: #fef3c7;
  color: #92400e;
}
.style-b .tab.active {
  background: #d97706;
  color: white;
}

.style-c .tab {
  background: #ecfdf5;
  color: #047857;
}
.style-c .tab.active {
  background: #059669;
  color: white;
}

.content {
  min-height: 200px;
}
</style>
