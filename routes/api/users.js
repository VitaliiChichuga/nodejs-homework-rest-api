import { Router } from "express";
import guard from "../../midllewares/guard";
import { upload } from "../../midllewares/upload";
import userControllers from "./controllers/users";

const router = Router();

router.patch("/avatar", guard, upload.single('avatar'), userControllers.uploadAvatar);
router.get("/verify/:token", userControllers.verifyUser);
router.post("/verify", userControllers.repeatEmailForVerifyUser);

export default router;