const http = require("http");
const app = require("./src/app");
const { port } = require("./src/config/keys");

// create server
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server listen port ${port}`);
});
