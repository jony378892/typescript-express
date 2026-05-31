import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { userRoute } from "./modules/user/user.route.ts";
import defaultRoute from "./middleware/default.ts";
import { ProfileRoute } from "./modules/profile/profile.route.ts";

const app: Application = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use("/api/users", userRoute);
app.use("/api/profiles", ProfileRoute);

app.use("/", defaultRoute);

export default app;
