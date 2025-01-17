import Serv_Url from "../main.ts";

export async function ping_server(){
    const response = await fetch(Serv_Url);
    console.log(response);
}

