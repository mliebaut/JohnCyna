<template>
  <div>
    <h3>Ventes par catégorie</h3>
    <Pie :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { Pie } from 'vue-chartjs'

const chartData = {
  labels: ['EDR', 'XDR', 'SOC'],
  datasets: [{
    data: [300, 500, 200],
    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
  }]
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom'
    }
  }
}
</script>
