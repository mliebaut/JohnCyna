<script setup lang="ts">
import { ref } from "vue";
import { PDFDocument, rgb } from "pdf-lib";

// Définition du type Order, a redef car dans la db on a que la ref de la commande
interface Order {
  id: number;
  date: string;
  total: string;
  status: string;
}

// Liste random de commandes
const orders = ref<Order[]>([
  { id: 1, date: "2024-03-01", total: "39.99€", status: "Payé" },
  { id: 2, date: "2024-03-05", total: "59.99€", status: "En attente" },
  { id: 3, date: "2024-03-10", total: "89.99€", status: "Expédié" },
]);

// Fonction pour générer un PDF de la facture
const generateInvoicePDF = async (order: Order): Promise<void> => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([500, 700]);
  const { width, height } = page.getSize();

  // Ajouter du texte à la facture
  page.drawText(`Facture #${order.id}`, { x: 50, y: height - 50, size: 20, color: rgb(0, 0, 0) });
  page.drawText(`Date : ${order.date}`, { x: 50, y: height - 80, size: 15 });
  page.drawText(`Montant total : ${order.total}`, { x: 50, y: height - 110, size: 15 });
  page.drawText(`Statut : ${order.status}`, { x: 50, y: height - 140, size: 15 });

  // Télécharger le PDF
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `Facture_${order.id}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
</script>

<template>
  <div class="container mt-4">
    <h1 class="text-center mb-4">Historique des Commandes</h1>
    <table class="table table-striped table-bordered text-center">
      <thead class="table-dark">
        <tr>
          <th>#</th>
          <th>Date</th>
          <th>Total</th>
          <th>Statut</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.date }}</td>
          <td>{{ order.total }}</td>
          <td>
            <span
              :class="{
                'badge bg-success': order.status === 'Payé',
                'badge bg-warning text-dark': order.status === 'En attente',
                'badge bg-primary': order.status === 'Expédié' // Ou autre je ne sais pas encore quel statut rajouter
              }"
            >
              {{ order.status }}
            </span>
          </td>
          <td>
            <button class="btn btn-primary btn-sm d-flex align-items-center gap-2" @click="generateInvoicePDF(order)">
                <i class="bi bi-file-earmark-pdf"></i> Télécharger Facture
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
</style>
