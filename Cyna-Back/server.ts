import app from "./app"

console.log("Server");

function server_start() {
    try {
        // DATABASE ----------------------------------
        // await db.connect();
      
        // APPLICATIONS ----------------------------------
        console.log("Starting app..");
      
        const appHostname = process.env.APP_HOSTNAME || "127.0.0.1";
        const appPort= Number(process.env.APP_API_PORT) || 3001;
      
        const server = app.listen(appPort, appHostname);
        console.log(`Listening to http://${appHostname}:${appPort}`);
        console.log('Ready.');
        return server;
      } catch (exception) {
        console.log("Stopping.");
        console.error(exception);
      }
}


server_start()

app.use(ctx => {
  ctx.body = 'Hello Koa';
});


