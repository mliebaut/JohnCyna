import Serv_Url from "../main.ts";

type Product = {
    name: string;
    description: string;
    price: number;
    image: string;
  };

export async function ping_server(){
    const response = await fetch(Serv_Url + "/ping", {
        method: "POST",
        // body: JSON.stringify({ username: "example" }),
        // headers: myHeaders,
        mode:"no-cors"
    });
    if(!response) {
        console.log("No response from server")
        return "No response from server"
    }
    console.log(response);
    return response;
}

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
        return product;
      } catch (e) {
        console.error(e);
        return null;
      }
}

