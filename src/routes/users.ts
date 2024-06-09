import { Router } from "express";
import { createUser, userLogin } from "../controllers/users-controller";

const router = Router();

// /api/users/register
router.post('/register', createUser);

// /api/users/login
router.post('/login', userLogin);

export default router;