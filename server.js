const net = require("net");
const PORT = 8080;

const server = net.createServer(client => {
  console.log("client connected");

  client.on("data", data => {
    const dataStr = data.toString();
    console.log(dataStr.split("\n"));
    client.write(`HTTP/1.1 200 OK 
    \n
    \n
    <h1>Hello World!</h1>`);
  });
});

server.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
