const net = require("net");
const files = {
  ["/"]: require("./assets/index.js"),
  ["/index.html"]: require("./assets/index.js"),
  ["/css/styles.css"]: require("./assets/styles.js"),
  ["/hydrogen.html"]: require("./assets/hydrogen.js"),
  ["/helium.html"]: require("./assets/helium.js"),
  ["/404.html"]: require("./assets/404.js")
};

const PORT = 8080;

const server = net.createServer(client => {
  console.log("client connected");
  client.setEncoding("utf8");
  client.on("data", data => {
    request(data, client);
  });
});

const request = (data, client) => {
  const reqLine = data.split("\n")[0].split(" ");
  const reqMethod = reqLine[0];
  const reqURI = reqLine[1];
  const reqHTTPVersion = reqLine[2];
  const resHTTPVersion = "HTTP/1.1 200 OK";

  const checkURI = key => {
    if (files[key]) {
      return files[key];
    } else {
      return files["/404.html"];
    }
  };

  if (reqMethod === "GET") {
    const body = checkURI(reqURI);
    const message = `${resHTTPVersion}\n\n${body}`;
    client.write(message);
    client.end();
  } else {
    const body = files["/404.html"];
    const message = `${resHTTPVersion}\n\n${body}`;
    client.write(message);
    client.end();
  }
};

server.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
