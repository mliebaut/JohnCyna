// stores/counter.js
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cartStore', {
    state: () => {
        return {
            count: 0,
            products:[]
        }

    },
    actions: {
        addProduct(productToAdd){
            console.log("Store Add Product")
            // console.log(productToAdd)
            // console.log(productToAdd.id)
            // console.log(this.products)
            if(this.products.length <= 0){
                productToAdd["amountInCart"] = 1;
                console.log("New product")
                this.products.push(productToAdd)
                return;
            }
            // console.log(this.products);
            if(this.products.find(product => product.id == productToAdd.id)){
                console.log("duplicate product")
                // let currentAmountOfProduct = this.products.find(product => product.id === productToAdd.id).amountInCart;
                let indexToReplace = this.products.findIndex(product => product.id === productToAdd.id);
                this.products[indexToReplace].amountInCart++;

                // console.log("currentAmountOfProduct", currentAmountOfProduct);
                // productToAdd.amountInCart = currentAmountOfProduct

                // this.products.push(productToAdd)
            }
            console.log(this.products)
        },
        removeFromCart(productId){
            console.log("Store RemoveFromCart")
            this.products = this.products.filter(product => product.id !== productId);
        },
        clearCart(){
            this.products = []
        }
    },
})