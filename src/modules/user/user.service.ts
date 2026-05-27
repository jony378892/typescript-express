import { pool } from "../../db/index.ts";
import type { User } from "./user.interface.ts";

const getUsersFromDB = async () => {
  const result = await pool.query(`
      select * from users
      `);

  return result;
};

const createUserFromDB = async (payload: User) => {
  const { name, email, password, age } = payload;

  const result = await pool.query(
    `
      insert into users(name, email, password, age) 
      values($1, $2, $3, $4)
      returning *
      `,
    [name, email, password, age],
  );
  return result;
};

const getUserFromDB = async (id: string) => {
  const result = await pool.query(
    `
      select * from users
      where id=$1
      `,
    [id],
  );
  return result;
};

const updateUserFromDB = async (payload: User, id: string) => {
  const { name, email, password, age, is_active } = payload;

  const result = await pool.query(
    `
      update users 
      set name=coalesce($1, name), email=coalesce($2, email), password=coalesce($3, password), age=coalesce($4, age), is_active=coalesce($5, is_active)
      where id= $6 
      returning *
      `,
    [name, email, password, age, is_active, id],
  );

  return result;
};

const deleteUserFromDB = async (id: string) => {
  const result = await pool.query(
    `
      delete from users where id=$1
      `,
    [id],
  );
  return result;
};

export {
  getUsersFromDB,
  createUserFromDB,
  getUserFromDB,
  updateUserFromDB,
  deleteUserFromDB,
};
