const createdSuccessfully = (res, msg) => {
  res.writeHead(201, { "Content-type": "text/json" });
  res.write(JSON.stringify({ message: msg }));
  res.end();
  return;
};

const succesfullResponse = (res, msg) => {
  res.writeHead(200, { "Content-type": "text/json" });
  res.write(JSON.stringify({ message: msg }));
  res.end();
  return;
};

const notFound = (res, msg) => {
  res.writeHead(404, { "Content-type": "text/json" });
  res.write(JSON.stringify({ message: msg }));
  res.end();
  return;
};

const unauthorized = (res, msg) => {
  res.writeHead(401, { "Content-type": "text/json" });
  res.write(JSON.stringify({ message: msg }));
  res.end();
  return;
};

const methodNotAllowed = (res) => {
  res.writeHead(405, { "Content-type": "text/json" });
  res.write(JSON.stringify({ message: "This method is not allowed" }));
  res.end();
  return;
};
const returnAllPost = (res, posts) => {
  res.writeHead(200, { "Content-type": "text/json" });
  res.write(JSON.stringify(posts));
  res.end();
  return;
};

module.exports = {
  createdSuccessfully,
  succesfullResponse,
  notFound,
  unauthorized,
  methodNotAllowed,
  returnAllPost,
};
