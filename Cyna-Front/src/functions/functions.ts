import Serv_Url from "../main.ts";

export async function ping_server() {
    const response = await fetch(Serv_Url + "/ping", {
        method: "POST",
    });
    if (!response) {
        console.log("No response from server")
        return "No response from server"
    }
    return await response.text();
}

export async function faker_generate() {
    const response = await fetch(Serv_Url + "/faker", {
        method: "POST",
    });
    console.log(response);
    return await response.text();
}

export async function find_user_by_id(user_id: number) {
    try {
        if (user_id == null) {
            console.log("No User Info Given.");
            return;
        }
        const response = await fetch(Serv_Url + "/user/searchById", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({userId: user_id}),
        }).then(res => res.json())
        return response;
    } catch (e) {
        console.log(e);
    }
}

export async function find_user_by_email(email: string) {
    try {
        const response = await fetch(Serv_Url + "/user/searchById", {
            method: "POST",
            body: JSON.stringify({email: email}),
            mode: "no-cors"
        });
        console.log(response);
        return response;
    } catch (e) {
        console.log(e);
    }
}

export async function getAllUsers() {
    try {
        const response = await fetch(Serv_Url + "/user/searchAll", {
            method: "POST"
        })
            .then(res => res.json())
        // console.log(response);
        return response;
    } catch (e) {
        console.log(e);
    }
}

export async function getAllRoles() {
    try {
        const response = await fetch(Serv_Url + "/user/getAllRoles", {
            method: "POST"
        })
            .then(res => res.json())
        // console.log(response);
        return response;
    } catch (e) {
        console.log(e);
    }
}


export async function updateUser(updatedUser: any) {
    try {
        const response = await fetch(Serv_Url + "/user/update", {
            headers: {'Content-Type': 'application/json'},
            method: "POST",
            body: JSON.stringify({updatedUser}),
        })
        // .then(res => res.json())
        console.log(response);
        return response;
    } catch (e) {
        console.log(e);
    }
}


export async function getAllAddresses() {
    try {
        const response = await fetch(Serv_Url + "/address/searchAll", {
            method: "POST"
        })
            .then(res => res.json())
        //  console.log(response);
        return response;
    } catch (e) {
        console.log(e);
    }
}


export async function getAllEntreprise() {
    try {
        const response = await fetch(Serv_Url + "/company/searchAll", {
            method: "POST"
        })
            .then(res => res.json())
        console.log(response);
        return response;
    } catch (e) {
        console.log(e);
    }
}

/*PRODUCT*/
// -------------------------------------------------------------------------------------
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


/*CATEGORIES*/
// -------------------------------------------------------------------------------------

export async function getAllCategories(includeRelatedRecords: number) {
    try {
        const response = await fetch(Serv_Url + "/category/searchAll", {
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

