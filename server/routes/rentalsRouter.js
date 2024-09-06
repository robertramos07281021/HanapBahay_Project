import { Router } from "express";
import API from "../controllers/rentalsController.js";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";
import {
  validateRental,
  validateUpdateRental,
  validateNewMessage,
} from "../middlewares/modelValidation.js";

const router = Router();

router.get("/", API.getRentals);
router.get("/rents", auth, API.getUserRentals);
router.post(
  "/create",
  auth,
  upload.array("images", 4),
  validateRental,
  API.createNewRental
);
router.patch(
  "/update/:id",
  auth,
  upload.array("images", 4),
  validateUpdateRental,
  API.updateRental
);
router.delete("/delete/:id", auth, API.deleteRental);
router.patch("/inquiry/:id", API.addInquiry);
router.patch("/rented/:id", auth, API.updateIfRented);
router.post("/message", validateNewMessage, API.sendMessage);

export { router as rentalRouter };
