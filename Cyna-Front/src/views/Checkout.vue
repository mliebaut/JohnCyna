<script setup>
import { loadStripe } from "@stripe/stripe-js";

const STRIPE_PUBLIC_KEY = "pk_test_51Qrbj1RpPV5B6AP6PJBvF1mNbile2IZsuOrBmyoBEFfmoGOyqfqUGTtZ6GwB3VG8QVEfABIB7AOlBV84Sa3QzS2200Ky16YOr8"; //
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

const handleCheckout = async () => {
    const stripe = await stripePromise;

    try {
        const response = await fetch("http://localhost:3001/create-checkout-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Erreur lors de la création de la session Stripe");
        }

        const session = await response.json();
        window.location.href = session.url;
    } catch (error) {
        console.error("Erreur lors du paiement :", error);
    }
};
</script>

<template>
    <button class="mt-5" @click="handleCheckout">Payer 20€</button>
</template>
