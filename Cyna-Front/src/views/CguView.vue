<template>
  <div class="about-page">
    <h1>Conditions Générales d’Utilisation (CGU)</h1>
    
    <p><strong>1. Présentation de la société</strong><br>
    La société <em>CYNA</em>, SARL au capital de 20 000 €, immatriculée au RCS de Paris sous le numéro 123 456 789, dont le siège est situé au 42 rue des Octets, 75000 Paris, fournit des solutions informatiques personnalisées.</p>
    
    <p><strong>2. Objet</strong><br>
    Les présentes CGU définissent les conditions d’accès et d’utilisation du site www.cyna-solutions.fr et des services proposés par CYNA.</p>

    <p><strong>3. Acceptation des CGU</strong><br>
    Toute utilisation des services implique l’acceptation totale et sans réserve des présentes conditions.</p>

    <p><strong>4. Accès aux services</strong><br>
    Certains services nécessitent un compte utilisateur. L'utilisateur est responsable de la confidentialité de ses identifiants.</p>

    <p><strong>5. Services proposés</strong><br>
    Cyna propose : développement logiciel, cybersécurité, hébergement, support technique, vente de matériel et licences.</p>

    <p><strong>6. Engagements de l’utilisateur</strong><br>
    L’utilisateur s’engage à utiliser les services dans le respect des lois et des présentes CGU.</p>

    <p><strong>7. Propriété intellectuelle</strong><br>
    Tous les éléments du site sont la propriété exclusive de Cyna ou de ses partenaires. Toute reproduction est interdite.</p>

    <p><strong>8. Données personnelles</strong><br>
    Les données collectées sont traitées conformément au RGPD. Contact : dpo@cyna-solutions.fr.</p>

    <p><strong>9. Responsabilité</strong><br>
    Cyna ne saurait être tenue responsable de pannes temporaires, pertes de données ou dommages indirects.</p>

    <p><strong>10. Modification des CGU</strong><br>
    Cyna peut modifier à tout moment les présentes CGU. L'utilisateur sera informé via le site ou par email.</p>

    <p><strong>11. Droit applicable</strong><br>
    Ces CGU sont régies par le droit français. En cas de litige, compétence est donnée aux tribunaux de Paris.</p>

    <p class="highlight">
      Cyna – L’informatique autrement.
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
