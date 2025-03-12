import Serv_Url from "../main.ts";

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

export async function find_user_by_id(user_id : number){
    try {
        const response = await fetch(Serv_Url + "/user/searchById", {
            method: "POST",
            body: JSON.stringify({ user_id: user_id }),
            mode:"no-cors"
        });
        console.log(response);
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
    } catch (e) {
        console.log(e);
    }
}

