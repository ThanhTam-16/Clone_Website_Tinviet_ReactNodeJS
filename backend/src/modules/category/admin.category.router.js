import express from "express";
import { authGuard, adminGuard } from "../auth/auth.middleware.js";
import * as categoryController from "./category.controller.js";

const router = express.Router();
router.use(authGuard, adminGuard);

router.get("/", categoryController.adminListCategories);
router.post("/", categoryController.adminCreateCategory);
router.put("/:id", categoryController.adminUpdateCategory);
router.delete("/:id", categoryController.adminDeleteCategory);

export default router;
