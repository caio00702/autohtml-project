import jsonServer from "json-server";
import cors from "cors";
import { readFileSync } from "fs";

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(middlewares);
server.use(router);

const port = process.env.PORT || 3001;

server.listen(port, () => {
  console.log(`JSON Server está rodando na porta ${port}`);
});
