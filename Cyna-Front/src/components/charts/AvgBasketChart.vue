<template>
  <div>
    <h3>Paniers moyens par catégorie</h3>
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { Bar } from 'vue-chartjs'

const chartData = {
  labels: ['Jour 1', 'Jour 2', 'Jour 3', 'Jour 4', 'Jour 5', 'Jour 6', 'Jour 7'],
  datasets: [
    {
      label: 'EDR',
      data: [120, 150, 180, 140, 200, 160, 130],
      backgroundColor: '#2196F3'
    },
    {
      label: 'XDR',
      data: [90, 100, 110, 105, 120, 130, 100],
      backgroundColor: '#FF9800'
    },
    {
      label: 'SOC',
      data: [60, 70, 90, 80, 100, 95, 85],
      backgroundColor: '#9C27B0'
    }
  ]
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'top' }
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
}
</script>
