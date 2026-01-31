import app from "./app.js"

app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`
    ------------------------\n
    PORTA: ${process.env.PORT}\n
    ------------------------\n
    Conexão com o app: ok\n
    ------------------------\n
    `);
});
