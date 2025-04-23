<template>
  <div class="about-page">
    <h1>À propos</h1>
    <p>
      Post quorum necem nihilo lenius ferociens Gallus. Et est admodum mirum videre plebem innumeram.
    </p>
    <p>
      Nihil est enim virtute amabilius, nihil quod magis. Auxerunt haec vulgi sordidioris audaciam, quod cum accedat huc suavitas quaedam oportet sermonum.
    </p>
    <p>
      Iis igitur est difficilius satis facere, qui se. Et licet quocumque oculos flexeris feminas adfatim.
    </p>
    <p>
      Alii nullo quaerente vultus severitate adsimulata. Mox dicta finierat, multitudo omnis ad, quae.
    </p>
    <p>
      Dein Syria per speciosam interpatet diffusa. Post hoc impie perpetratum quod in aliis quoque.
    </p>
    <p>
      Ibi victu recreati et quiete, postquam abierat. Sed saepe enim redeo ad Scipionem, cuius omnis.
    </p>
    <p>
      Et quoniam mirari posse quosdam peregrinos.
    </p>
    <p class="highlight">
      J'aime les chats.
    </p>
  </div>
</template>

<script setup lang="ts">
// Rien à déclarer pour l’instant
</script>

<style scoped>
.about-page {
  max-width: 850px;
  margin: 50px auto;
  padding: 40px;
  background-color: #f4f4f9;
  color: #34495e;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.75;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.about-page h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 40px;
  letter-spacing: 1px;
}

.about-page p {
  font-size: 1.1rem;
  color: #5f6368;
  margin-bottom: 20px;
  text-align: justify;
  padding-left: 15px;
  padding-right: 15px;
}

.about-page p:last-of-type {
  margin-bottom: 40px;
}

.highlight {
  font-weight: bold;
  color: #e74c3c;
  font-size: 1.3rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-top: 20px;
}

.about-page p:hover {
  color: #2c3e50;
  transition: color 0.3s ease-in-out;
}

.about-page h1:hover {
  color: #e74c3c;
  text-decoration: underline;
  cursor: pointer;
}

@media (max-width: 768px) {
  .about-page {
    padding: 20px;
    margin: 30px;
  }

  .about-page h1 {
    font-size: 2rem;
  }

  .about-page p {
    font-size: 1rem;
  }
}
</style>
