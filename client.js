const net = require("net");
let PORT = process.argv[3];
let HOST = process.argv[2];

const client = net.createConnection(PORT, HOST, () => {
  const date = new Date();
  client.write(
    `GET / HTTP/1.1\nDate: ${date}\nHost: ${HOST}\nConnection: keep-alive\nUser-Agent: zomgMyServar\nAccept: */*\n\n`
  );
  client.on("data", data => {
    console.log(data.toString());
  });
});
