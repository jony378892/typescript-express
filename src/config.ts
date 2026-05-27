import { configDotenv } from "dotenv";
import path from "path";

configDotenv({
  path: path.join(process.cwd(), ".env"),
});

const config = {
  connection_string: process.env.CONNECTION_STRING,
  port: process.env.PORT,
};

export default config;
