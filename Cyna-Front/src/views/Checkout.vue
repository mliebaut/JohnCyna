<script setup>
import { ref } from "vue";
import { loadStripe } from "@stripe/stripe-js";

const selectedPayment = ref("stripe"); // Stripe est sélectionné par défaut
const STRIPE_PUBLIC_KEY = "pk_test_51Qrbj1RpPV5B6AP6PJBvF1mNbile2IZsuOrBmyoBEFfmoGOyqfqUGTtZ6GwB3VG8QVEfABIB7AOlBV84Sa3QzS2200Ky16YOr8";
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

const handleCheckout = async () => {
    console.log("🛠️ handleCheckout() a été appelé avec", selectedPayment.value);

    if (selectedPayment.value === "stripe") {
        console.log("🔵 Paiement avec Stripe...");

        const stripe = await stripePromise;
        if (!stripe) {
            console.error("❌ Erreur: Stripe n'est pas chargé.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3001/create-checkout-session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                throw new Error("❌ Erreur lors de la création de la session Stripe");
            }

            const session = await response.json();
            console.log("✅ Session Stripe créée :", session.url);
            window.location.href = session.url;
        } catch (error) {
            console.error("❌ Erreur lors du paiement :", error);
        }
    } else if (selectedPayment.value === "paypal") {
        console.log("🟡 Paiement avec PayPal... (à implémenter)");
        alert("Redirection vers PayPal... (fonctionnalité en cours de développement)");
    }
};

</script>

<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-4 order-md-2 mb-4">
                <h4 class="d-flex justify-content-between align-items-center mb-3">
                    <span class="text-muted">Votre panier</span>
                    <span class="badge badge-secondary badge-pill">3</span>
                </h4>
                <ul class="list-group mb-3 sticky-top">
                    <li class="list-group-item d-flex justify-content-between lh-condensed">
                        <div>
                            <h6 class="my-0">Nom du produit</h6>
                            <small class="text-muted">Description</small>
                        </div>
                        <span class="text-muted">$12</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between lh-condensed">
                        <div>
                            <h6 class="my-0">Deuxième produit</h6>
                            <small class="text-muted">Description</small>
                        </div>
                        <span class="text-muted">$8</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between lh-condensed">
                        <div>
                            <h6 class="my-0">Troisème produit</h6>
                            <small class="text-muted">Description</small>
                        </div>
                        <span class="text-muted">$5</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between">
                        <span>Total (USD)</span>
                        <strong>$20</strong>
                    </li>
                </ul>
            </div>

            <div class="col-md-8 order-md-1">
                <h4 class="mb-3">Adresse de facturation</h4>
                <form class="needs-validation" novalidate="">
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="firstName">Prénom</label>
                            <input type="text" class="form-control" id="firstName" required>
                            <div class="invalid-feedback"> Prénom valide requis. </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="lastName">Nom</label>
                            <input type="text" class="form-control" id="lastName" required>
                            <div class="invalid-feedback"> Nom valide requis. </div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="email">Email</label>
                        <input type="email" class="form-control" id="email" placeholder="you@example.com">
                        <div class="invalid-feedback"> Veuillez saisir une adresse email valide. </div>
                    </div>
                    <div class="mb-3">
                        <label for="address">Adresse</label>
                        <input type="text" class="form-control" id="address" placeholder="3 rue de Paris" required>
                        <div class="invalid-feedback"> Veuillez saisir votre adresse de facturation. </div>
                    </div>
                    <div class="mb-3">
                        <label for="address2">Adresse 2 <span class="text-muted">(Optionnel)</span></label>
                        <input type="text" class="form-control" id="address2" placeholder="">
                    </div>
                    <div class="row">
                        <div class="col-md-5 mb-3">
                            <label for="country">Pays</label>
                            <select class="form-select d-block w-100" id="country" required>
                                <option value="">Choisissez</option>
                                <option>France</option>
                                <option>Allemagne</option>
                                <option>Luxembourg</option>
                            </select>
                            <div class="invalid-feedback"> Veuillez sélectionner un pays valide. </div>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label for="state">Département</label>
                            <select class="form-select d-block w-100" id="state" required>
                                <option value="">Choisissez</option>
                                <option>Lorraine</option>
                            </select>
                            <div class="invalid-feedback"> Veuillez sélectionner un département valide. </div>
                        </div>
                        <div class="col-md-3 mb-3">
                            <label for="zip">Code postal</label>
                            <input type="text" class="form-control" id="zip" required>
                            <div class="invalid-feedback"> Code postal requis. </div>
                        </div>
                    </div>

                    <hr class="mb-4">
                    <h4 class="mb-3">Paiement</h4>
                    <div class="my-3 radio-btn">
                        <div class="form-check">
                            <input id="stripe" name="paymentMethod" type="radio" class="form-check-input" v-model="selectedPayment" value="stripe">
                            <label class="form-check-label" for="stripe">Stripe</label>
                        </div>
                        <div class="form-check">
                            <input id="paypal" name="paymentMethod" type="radio" class="form-check-input" v-model="selectedPayment" value="paypal">
                            <label class="form-check-label" for="paypal">PayPal</label>
                        </div>
                    </div>
                    <button type="button" v-if="selectedPayment === 'stripe'" class="mt-2 btn btn-primary btn-lg btn-block" @click="handleCheckout">
                        Payer avec Stripe
                    </button>

                    <button type="button" v-if="selectedPayment === 'paypal'" class="mt-2 btn btn-warning btn-lg btn-block" @click="handleCheckout">
                        Payer avec PayPal
                    </button>


                    <p>Valeur actuelle de selectedPayment: {{ selectedPayment }}</p>

                </form>
            </div>
        </div>
    </div>
</template>

<style>
    .radio-btn {
        text-align: left;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>