import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { userRoute } from "./modules/user/user.route.ts";

const app: Application = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use("/api/users", userRoute);

app.use("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the application",
  });
});

export default app;
