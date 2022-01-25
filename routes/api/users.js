import { Router } from "express";
import guard from "../../midllewares/guard";
import { upload } from "../../midllewares/upload";
import { uploadAvatar } from "./controllers/users";

const router = Router();

router.patch("/avatar", guard, upload.single('avatar'), uploadAvatar);

export default router;