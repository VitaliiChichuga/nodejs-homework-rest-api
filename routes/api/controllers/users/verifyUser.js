import { HttpCode } from "../../../../lib/constants";
import userRepository from "../../../../repository/users";


export const verifyUser = async (req, res, next) => {
  const verifyToken = req.params.token
  const userFromToken = await  userRepository.findByVerifyToken(verifyToken)
  console.log(
     userFromToken,
  )

  if (userFromToken) {
    await userRepository.updateVerify(userFromToken.id, true)
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { message: 'Success' },
    })
  }
  return res.status(HttpCode.BAD_REQUEST).json({
    status: 'success',
    code: HttpCode.BAD_REQUEST,
    data: { message: 'Invalid token' },
  })
}



