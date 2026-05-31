import type { Request, Response } from "express";

const defaultRoute = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the application",
  });
};

export default defaultRoute;
