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

// -------------------------------------------------------------------------------------

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

