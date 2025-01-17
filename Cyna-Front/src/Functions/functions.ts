import Serv_Url from "../main.ts";

export async function ping_server(){
    const response = await fetch(Serv_Url, {
        method: "POST",
        body: JSON.stringify({ username: "example" }),
        // headers: myHeaders,
        mode:"no-cors"
    });
    console.log(response);
}

