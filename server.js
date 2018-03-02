const net = require("net");
const PORT = 8080;
const files = {
  ["/"]: require("./assets/index.js"),
  ["/index.html"]: require("./assets/index.js"),
  ["/css/styles.css"]: require("./assets/styles.js"),
  ["/hydrogen.html"]: require("./assets/hydrogen.js"),
  ["/helium.html"]: require("./assets/helium.js"),
  ["/404.html"]: require("./assets/404.js")
};

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
  const serverName = "jbeld/1.0.0";
  const date = new Date();
  const OK = "HTTP/1.1 200 OK";
  const NOT_FOUND = "HTTP/1.1 404 NOT FOUND";
  let status;

  const checkURI = key => {
    if (files[key]) {
      status = OK;
      return files[key];
    } else {
      status = NOT_FOUND;
      return files["/404.html"];
    }
  };

  const bodyMsg = uri => {
    const body = checkURI(uri);
    const message = `${status}\n Server: ${serverName}\n Date: ${date}\n\n${body}`;
    client.write(message);
  };

  if (reqMethod === "GET") {
    bodyMsg(reqURI);
    client.end();
  } else {
    bodyMsg(reqURI);
    client.end();
  }
};

server.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
