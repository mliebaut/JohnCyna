<template>
  <div class="dashboard-container">
    <h1>Tableau de bord</h1>

    <!-- Statistiques simples -->
    <div class="stats">
      <div class="stat-box">
        <h3>Revenus</h3>
        <p>$1,345</p>
      </div>
      <div class="stat-box">
        <h3>Commandes en cours</h3>
        <p>23</p>
      </div>
      <div class="stat-box">
        <h3>Inscriptions</h3>
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

<style>
.dashboard-container {
  padding: 2rem;
  font-family: sans-serif;
}

h1 {
  margin-bottom: 1.5rem;
}

/* Stats Section */
.stats {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-box {
  flex: 1;
  background-color: #f0f0f0;
  padding: 1rem;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Charts Section */
.charts {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.chart {
  flex: 1;
  background-color: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

</style>
