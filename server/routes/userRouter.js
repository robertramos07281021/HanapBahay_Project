import { Router } from "express";
import UserAPI from "../controllers/userController.js";
import { validateUser } from "../middlewares/modelValidation.js";

const router = Router();

router.post("/register", validateUser, UserAPI.registerUser);
router.patch("/logout", UserAPI.updateLogout);
router.post("/login", UserAPI.loginUser);

export { router as userRoutes };
