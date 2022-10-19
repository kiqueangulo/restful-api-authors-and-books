import { Router } from "express";

import controller from "../controllers/user.controller";
// @ts-ignore
import Validate, { Schemas } from "../middleware/validateSchema";

const router = Router();

router.post("/", Validate(Schemas.user.create), controller.createUserHandler);

router.get("/", controller.getAllUsersHandler);

router.get("/:userId", controller.getUserHandler);

router.put("/:userId", Validate(Schemas.user.update), controller.updateUserHandler);

router.put("/:userId/:bookId", controller.addBookHandler);

router.delete("/:userId", controller.deleteUserHandler);

export default router;
