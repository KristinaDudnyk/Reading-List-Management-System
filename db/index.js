import knex from "knex";
import { fileURLToPath } from "url";

const uri = new URL("./db.sqlite", import.meta.url);

const db = knex({
  client: "sqlite3",
  useNullAsDefault: true,
  connection: { filename: fileURLToPath(uri) },
});

export default db;
