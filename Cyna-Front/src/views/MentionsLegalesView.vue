<template>
  <div class="mentions-legales">
    <h1 class="title">Mentions Légales</h1>
    
    <section class="section">
      <h2>Éditeur du site</h2>
      <ul>
        <li><strong>Nom :</strong> Entreprise XYZ</li>
        <li><strong>Forme juridique :</strong> Société à responsabilité limitée (SARL)</li>
        <li><strong>Capital social :</strong> 50 000 €</li>
        <li><strong>Adresse :</strong> 123 Rue des Exemples, 75001 Paris, France</li>
        <li><strong>Téléphone :</strong> +33 1 23 45 67 89</li>
        <li><strong>Email :</strong> contact@entreprise-xyz.com</li>
        <li><strong>RCS :</strong> Paris B 123 456 789</li>
        <li><strong>Numéro TVA :</strong> FR12 345678901</li>
      </ul>
    </section>

    <section class="section">
      <h2>Hébergement</h2>
      <ul>
        <li><strong>Hébergeur :</strong> OVH</li>
        <li><strong>Adresse :</strong> 2 Rue Kellermann, 59100 Roubaix, France</li>
        <li><strong>Téléphone :</strong> +33 9 72 10 10 07</li>
        <li><strong>Site web :</strong> <a href="https://www.ovh.com" target="_blank">www.ovh.com</a></li>
      </ul>
    </section>

    <section class="section">
      <h2>Propriété intellectuelle</h2>
      <p>
        L’ensemble du contenu du site <strong>www.entreprise-xyz.com</strong>, incluant mais ne se limitant pas aux textes,
        images, graphismes, logos, vidéos, icônes et sons, est la propriété exclusive de la société Entreprise XYZ,
        sauf mention contraire. Toute reproduction, distribution, modification, adaptation, retransmission ou
        publication, même partielle, de ces différents éléments est strictement interdite sans l'accord écrit
        préalable de Entreprise XYZ.
      </p>
    </section>

    <section class="section">
      <h2>Protection des données personnelles</h2>
      <p>
        Conformément à la loi Informatique et Libertés du 6 janvier 1978 modifiée et au Règlement Général sur
        la Protection des Données (RGPD), l’utilisateur dispose d’un droit d’accès, de rectification, de suppression et
        d’opposition aux données personnelles le concernant. Ces droits peuvent être exercés en nous contactant
        par email à <strong>contact@entreprise-xyz.com</strong>.
      </p>
    </section>

    <section class="section">
      <h2>Responsabilité</h2>
      <p>
        La société Entreprise XYZ s’efforce de fournir des informations aussi précises que possible sur son site.
        Toutefois, elle ne pourra être tenue responsable des omissions, des inexactitudes et des carences dans la mise à jour,
        qu’elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.
      </p>
    </section>
  </div>
</template>

<style scoped>
.mentions-legales {
  max-width: 900px;
  margin: 40px auto;
  padding: 30px;
  font-family: 'Roboto', sans-serif;
  color: #2c3e50;
  background: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}
.title {
  text-align: center;
  font-size: 2.2em;
  margin-bottom: 25px;
  color: #34495e;
  font-weight: bold;
}
.section {
  margin-bottom: 25px;
  padding: 20px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}
.section:hover {
  transform: scale(1.02);
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
}
.section h2 {
  font-size: 1.8em;
  margin-bottom: 15px;
  color: #2980b9;
  border-bottom: 2px solid #2980b9;
  padding-bottom: 5px;
}
.section p, .section ul {
  font-size: 1.1em;
  line-height: 1.6;
}
.section ul {
  list-style-type: none;
  padding: 0;
}
.section ul li {
  padding: 5px 0;
}
.section a {
  color: #e74c3c;
  text-decoration: none;
  font-weight: bold;
}
.section a:hover {
  text-decoration: underline;
}
</style>
