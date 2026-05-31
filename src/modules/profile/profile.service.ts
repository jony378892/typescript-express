import { pool } from "../../db/index.ts";

const createProfileIntoDB = async (payload: any) => {
  //   console.log(payload);

  const { user_id, bio, address, phone, gender } = payload;

  const user = await pool.query(
    `
    select * from users where id=$1
    `,
    [user_id],
  );

  //   console.log(user.rows[0]);

  if (user.rows.length === 0) {
    throw new Error("User not exists!");
  }

  const result = await pool.query(
    `
    insert into profiles( user_id, bio, address, phone, gender)
    values($1, $2, $3, $4, $5)
    returning *
    `,
    [user_id, bio, address, phone, gender],
  );

  return result;
};

export { createProfileIntoDB };
