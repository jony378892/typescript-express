import type { Request, Response } from "express";
import { createProfileIntoDB } from "./profile.service.ts";

const createProfile = async (req: Request, res: Response) => {
  try {
    const result = await createProfileIntoDB(req.body);

    res.status(201).json({
      success: true,
      message: "profile created successfully!",
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

export { createProfile };
