const express = require("express");
const server = express();

let clientes = [
    { nome: "caio", idade: 20 },
    { nome: "moises", idade: 18 },
    { nome: "otavio", idade: 25 }
];

let cachorro = "╥━━━━━━━━╭━━╮━━┳\n" +
               "╢╭╮╭━━━━━┫┃▋▋━▅┣\n" +
               "╢┃╰┫┈┈┈┈┈┃┃┈┈╰┫┣\n" +
               "╢╰━┫┈┈┈┈┈╰╯╰┳━╯┣\n" +
               "╢┊┊┃┏┳┳━━┓┏┳┫┊┊┣\n" +
               "j╨━━┗┛┗┛━━┗┛┗┛━━┻\n";

server.get("/", (req, res) => {
    return res.json(clientes);
});

server.get("/seila", (req, res) => {
    return res.send(`<pre>${cachorro}</pre>`); // Usar <pre> para manter formatação
});

server.listen(3030, () => {
    console.log("server on");
});
