import { Pool } from "pg";
import config from "../config/index.ts";

export const pool = new Pool({
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

export default initDB;
