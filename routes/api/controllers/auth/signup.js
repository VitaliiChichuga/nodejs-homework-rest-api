import { EmailService, EmailSender } from "../../../../service/email";
import authService from "../../../../service/auth";
import { HttpCode } from "../../../../lib/constants";

export const signup = async (req, res, next) => {
  const { email } = req.body;
  const isUserExist = await authService.isUserExist(email);
  if (isUserExist) {
    return res.status(HttpCode.CONFLICT).json({
      status: "error",
      code: HttpCode.CONFLICT,
      message: "Email is already exist",
    });
  }
  const userData = await authService.create(req.body);
  const emailService = new EmailService(
    process.env.NODE_ENV,
    new EmailSender()
  );
  
  const isSend = await emailService.sendVerifyEmail(
    email,
    userData.verifyToken
  );
   res.status(HttpCode.CREATE).json({
    status: "success",
    code: HttpCode.CREATE,
    data: { ...userData, isSendVerifyToken: !!isSend },
  });
  delete userData.verifyToken;
};
