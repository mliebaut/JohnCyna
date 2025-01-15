<template>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Détail Produit</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f8f9fa;
        }
        .container {
            max-width: 1200px;
            margin: 20px auto;
            padding: 20px;
            background: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        .product-header {
            display: flex;
            align-items: center;
            gap: 20px;
        }
        .product-image {
            flex: 1;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        .product-image img {
            width: 100%;
            height: auto;
            display: block;
        }
        .product-info {
            flex: 2;
        }
        .product-info h1 {
            margin: 0;
            font-size: 2rem;
            color: #333333;
        }
        .price {
            font-size: 1.5rem;
            color: #28a745;
            margin: 10px 0;
        }
        .options {
            margin-top: 20px;
        }
        .options label {
            font-weight: bold;
            margin-right: 10px;
        }
        .quantity,
        .purchase-type {
            margin-bottom: 15px;
        }
        .total-price {
            font-size: 1.2rem;
            color: #ff5722;
            font-weight: bold;
            margin-top: 20px;
        }
        button {
            padding: 10px 20px;
            background-color: #007bff;
            border: none;
            color: white;
            font-size: 1rem;
            border-radius: 5px;
            cursor: pointer;
        }
        button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>

<div class="container">
    <div class="product-header">
        <div class="product-image">
            <img src="https://via.placeholder.com/600" alt="Produit">
        </div>
        <div class="product-info">
            <h1>Produit Magnifique</h1>
            <p>Découvrez ce produit exceptionnel qui répondra à tous vos besoins.</p>
            <div class="price" id="base-price">Prix unitaire : 100 €</div>
        </div>
    </div>
    
    <div class="options">
        <div class="quantity">
            <label for="quantity">Quantité :</label>
            <input type="number" id="quantity" value="1" min="1" style="width: 60px;">
        </div>
        <div class="purchase-type">
            <label for="type">Type d'achat :</label>
            <select id="type">
                <option value="achat">Acheter</option>
                <option value="location">Louer</option>
            </select>
        </div>
        <div class="total-price" id="total-price">Prix total : 100 €</div>
        <button id="add-to-cart">Ajouter au panier</button>
    </div>
</div>

<script>
    const quantityInput = document.getElementById('quantity');
    const typeSelect = document.getElementById('type');
    const totalPriceElement = document.getElementById('total-price');
    const basePriceElement = document.getElementById('base-price');

    const basePrice = 100; // Prix unitaire pour l'achat
    const locationPriceMultiplier = 0.5; // 50% du prix unitaire pour la location

    function updatePrice() {
        const quantity = parseInt(quantityInput.value, 10);
        const type = typeSelect.value;

        let pricePerUnit = basePrice;
        if (type === 'location') {
            pricePerUnit *= locationPriceMultiplier;
        }

        const totalPrice = pricePerUnit * quantity;
        totalPriceElement.textContent = `Prix total : ${totalPrice.toFixed(2)} €`;
    }

    quantityInput.addEventListener('input', updatePrice);
    typeSelect.addEventListener('change', updatePrice);
</script>

</body>
</template>
