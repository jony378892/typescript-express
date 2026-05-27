import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import config from "./config.ts";
import { Pool } from "pg";
import tsupConfig from "./tsup.config.ts";

const app: Application = express();
const port = config.port;

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

const pool = new Pool({
  connectionString: config.connection_string,
});

const initDB = async () => {
  try {
    await pool.query(`
      create table if not exists users(
      id serial primary key,
      name varchar(30) not null,
      email varchar(30) unique not null,
      password varchar(250) not null,
      is_active boolean default true,
      age int not null,

      created_at timestamp default current_timestamp,
      updated_at timestamp default current_timestamp
      )
      `);
    console.log("Database connected successfully!");
  } catch (error) {
    console.log("Error connecting database! ", error);
  }
};

initDB();

app.get("/api/users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      select * from users
      `);

    res.status(200).json({
      success: true,
      message: "User retrieved successfully!",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});

app.post("/api/users", async (req: Request, res: Response) => {
  const { name, email, password, age } = req.body;

  try {
    const result = await pool.query(
      `
      insert into users(name, email, password, age) 
      values($1, $2, $3, $4)
      returning *
      `,
      [name, email, password, age],
    );

    res.status(201).json({
      success: true,
      message: "User created successfully!",
      data: {
        name,
        email,
        age,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});

app.get("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `
      select * from users
      where id=$1
      `,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No user found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "User retrieved successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});

app.put("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, password, age, email, is_active } = req.body;

  try {
    const result = await pool.query(
      `
      update users 
      set name=coalesce($1, name), email=coalesce($2, email), password=coalesce($3, password), age=coalesce($4, age), is_active=coalesce($5, is_active)
      where id= $6 
      returning *
      `,
      [name, email, password, age, is_active, id],
    );
    console.log(result);

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "No user found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});

app.delete("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `
      delete from users where id=$1
      `,
      [id],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "No user found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});

app.use("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the application",
  });
});

app.listen(port, () => {
  console.log("Server is running on port: ", port);
});
