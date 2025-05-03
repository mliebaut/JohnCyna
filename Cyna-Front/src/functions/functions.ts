import Serv_Url from "../main.ts";

export async function ping_server(){
    const response = await fetch(Serv_Url + "/ping", {
        method: "POST",
    });
    if(!response) {
        console.log("No response from server")
        return "No response from server"
    }
    console.log(response);
    return response;
}

export async function find_user_by_id(user_id : number){
    try {
        if(user_id == null){console.log("No User Info Given."); return;}
        const response = await fetch(Serv_Url + "/user/searchById", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ userId: user_id }),
        }).then(res => res.json())
        return response;
    } catch (e) {
        console.log(e);
    }
}

export async function find_user_by_email(email : string){
    try {
        const response = await fetch(Serv_Url + "/user/searchById", {
            method: "POST",
            body: JSON.stringify({ email: email }),
            mode:"no-cors"
        });
        console.log(response);
        return response;
    } catch (e) {
        console.log(e);
    }
}

export async function getAllUsers(){
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

export async function getAllRoles(){
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

export async function createUser(createdUser : any){
    try {
        const response = await fetch(Serv_Url + "/user/create", {
            headers: {'Content-Type': 'application/json'},
            method: "POST",
            body: JSON.stringify({ createdUser}),
        })
        console.log(response);
        return response;
    } catch (e) {
        console.log(e);
    }
}

export async function updateUser(updatedUser: any){
    try {
        const response = await fetch(Serv_Url + "/user/update", {
            headers: {'Content-Type': 'application/json'},
            method: "POST",
            body: JSON.stringify({ updatedUser}),
        })
            // .then(res => res.json())
        console.log(response);
        return response;
    } catch (e) {
        console.log(e);
    }
}

export async function deleteUser(deletedUserId: any){
    try {
        const response = await fetch(Serv_Url + "/user/delete", {
            headers: {'Content-Type': 'application/json'},
            method: "POST",
            body: JSON.stringify({ userId: deletedUserId }),
        })
        // .then(res => res.json())
        console.log(response);
        return response;
    } catch (e) {
        console.log(e);
    }
}

export async function getAllProducts(){
    try {
        const response = await fetch(Serv_Url + "/product/", {
            method: "POST"
        })
            .then(res => res.json())
        // console.log(response);
        return response;
    } catch (e) {
        console.log(e);
    }
}

export async function getAllAddresses(){
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


export async function getAllEntreprise(){
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

