import { Router } from "express";
import { createProfile } from "./profile.controller.ts";

const router = Router();

router.post("/", createProfile);

export const ProfileRoute = router;
