
// import do modulo http e do app
const http = require('http');
// porta a ser utilizada pelo createServer
const port = 3000;
const app = require("./app")

// server criado
const server = http.createServer(app);

// inicia o servidor na porta 3000
server.listen(port);