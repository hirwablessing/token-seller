import app from "./utils/app";

const server = app();

server.listen(8080, () => {
  console.log("Server running on port 8001");
});
