import type { Request, Response } from "express";
import {
  createUserFromDB,
  deleteUserFromDB,
  getUserFromDB,
  getUsersFromDB,
  updateUserFromDB,
} from "./user.service.ts";

const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await getUsersFromDB();

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
};

const createUser = async (req: Request, res: Response) => {
  const { name, email, password, age } = req.body;

  try {
    const result = await createUserFromDB(req.body);

    res.status(201).json({
      success: true,
      message: "User created successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await getUserFromDB(id as string);

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
};

const updateUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await updateUserFromDB(req.body, id as string);
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
};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await deleteUserFromDB(id as string);

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
};

export { getUsers, createUser, getUserById, updateUserById, deleteUser };
