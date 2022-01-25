
import { HttpCode } from "../../../../lib/constants";
import userRepository from "../../../../repository/users";
import { EmailSender, EmailService } from "../../../../service/email";

export const repeatEmailForVerifyUser = async (req, res, next) => {
  const { email } = req.body
  const user = await userRepository.findByEmail(email)
  if (user) {
    const { email,verifyTokenEmail } = user
    const emailService = new EmailService(
      process.env.NODE_ENV,
      new EmailSender(),
    )

    const isSend = await emailService.sendVerifyEmail(
      email,
      verifyTokenEmail,
    )
    if (isSend) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: { message: 'Success' },
      })
    }
    return res.status(HttpCode.UNPROCESSABLE_ENTITY).json({
      status: 'error',
      code: HttpCode.UNPROCESSABLE_ENTITY,
      data: { message: 'Unprocessable Entity' },
    })
  }

  res.status(HttpCode.NOT_FOUND).json({
    status: 'error',
    code: HttpCode.NOT_FOUND,
    data: { message: 'User with email not found' },
  })
}