import app from "./app.ts";
import config from "./config/index.ts";
import initDB from "./db/index.ts";

const main = () => {
  initDB();

  app.listen(config.port, () => {
    console.log("Server is running on port: ", config.port);
  });
};

main();
