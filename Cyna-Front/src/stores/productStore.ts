import { defineStore } from "pinia";
import { products } from "@/data/products";
import { Product } from "@/types/Product";

export const useProductStore = defineStore("productStore", {
  state: () => ({
    products: products as Product[],
    filters: {
      title: "",
      description: "",
      minPrice: 0,
      maxPrice: 500,
    },
  }),
  getters: {
    filteredProducts(state) {
      return state.products.filter((product) => {
        return (
          product.title.toLowerCase().includes(state.filters.title.toLowerCase()) &&
          product.description.toLowerCase().includes(state.filters.description.toLowerCase()) &&
          product.price >= state.filters.minPrice &&
          product.price <= state.filters.maxPrice
        );
      });
    },
  },
  actions: {
    setFilters(newFilters: Partial<typeof this.filters>) {
      this.filters = { ...this.filters, ...newFilters };
    },
  },
});
