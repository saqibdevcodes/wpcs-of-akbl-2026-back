import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../../generated/prisma/client.js";

const host = process.env.DATABASE_HOST || "localhost";
const port = Number(process.env.DATABASE_PORT) || 3306;
const password = process.env.DATABASE_PASSWORD || "";
const user = process.env.DATABASE_USER || "root";
const name = process.env.DATABASE_NAME || "test";

const adapter = new PrismaMariaDb({
  host: host,
  port: port,
  user: user,
  password: password,
  database: name,
  connectionLimit: 10,
});
const prisma = new PrismaClient({ adapter });

export { prisma };
