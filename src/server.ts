import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import config from "./config.ts";

const app: Application = express();
const port = config.port;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use((req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Welcome to the application",
  });
});

app.listen(port, () => {
  console.log("Server is running on port: ", port);
});
