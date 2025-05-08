import Serv_Url from "../main.ts";

type Product = {
    name: string;
    description: string;
    price: number;
    images: any[];
  };




export async function find_product_by_id(id : any){
    try {
        console.log(id);
        const response = await fetch(Serv_Url + "/product/searchById", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });
    
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
    
        const product: Product = await response.json();
        console.log(product);
        return product;
      } catch (e) {
        console.error(e);
        return null;
      }
}

export async function createProduct(createdProduct: any) {
    try {
        const response = await fetch(Serv_Url + "/product/create", {
            headers: {'Content-Type': 'application/json'},
            method: "POST",
            body: JSON.stringify({createdProduct}),
        })
        console.log(response);
        return response;
    } catch (e) {
        console.log(e);
    }
}

export async function getAllProducts(includeRelatedRecords: number) {
    try {
        const response = await fetch(Serv_Url + "/product/searchAll", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({relatedRecords : includeRelatedRecords}),
        })
            .then(res => res.json())
        // console.log(response);
        console.log(response);
        return response;
    } catch (e) {
        console.log(e);
    }
}

export async function findProductById(productId: number, relatedRecords: number) {
    try {
        if (productId == null) {
            console.log("No Product ID");
            return;
        }
        const response = await fetch(Serv_Url + "/product/searchById", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({productId: productId, relatedRecords: relatedRecords}),
        }).then(res => res.json())
        return response;
    } catch (e) {
        console.log(e);
    }
}

export async function updateProduct(updatedProduct: any) {
    try {
        const response = await fetch(Serv_Url + "/product/update", {
            headers: {'Content-Type': 'application/json'},
            method: "POST",
            body: JSON.stringify({updatedProduct}),
        })
        console.log(response);
        return response;
    } catch (e) {
        console.log(e);
    }
}

export async function deleteProduct(deletedUserId: any) {
    try {
        const response = await fetch(Serv_Url + "/product/delete", {
            headers: {'Content-Type': 'application/json'},
            method: "POST",
            body: JSON.stringify({id: deletedUserId}),
        })
        // .then(res => res.json())
        // console.log(response);
        return response;
    } catch (e) {
        console.log(e);
    }
}

