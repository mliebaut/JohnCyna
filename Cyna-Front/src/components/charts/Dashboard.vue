<template>
  <div class="dashboard-container">
    <h1>Tableau de bord</h1>

    <!-- Statistiques simples -->
    <div class="stats">
      <div class="stat-box">
        <h3>Revenue</h3>
        <p>$1,345</p>
      </div>
      <div class="stat-box">
        <h3>Erreurs</h3>
        <p>23</p>
      </div>
      <div class="stat-box">
        <h3>Followers</h3>
        <p>+45</p>
      </div>
    </div>

    <!-- Graphiques -->
    <div class="charts">
      <div class="chart">
        <h3>Ventes par jour</h3>
        <SalesPerDayChart />
      </div>
      <div class="chart">
        <h3>Paniers moyens</h3>
        <AvgBasketChart />
      </div>
      <div class="chart">
        <h3>Répartition par catégorie</h3>
        <SalesByCategoryChart />
      </div>
    </div>
  </div>
</template>

<script setup>
import SalesPerDayChart from './SalesPerDayChart.vue'
import AvgBasketChart from './AvgBasketChart.vue'
import SalesByCategoryChart from './SalesByCategoryChart.vue'
</script>
