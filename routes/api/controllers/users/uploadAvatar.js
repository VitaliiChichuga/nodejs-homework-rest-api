import { HttpCode } from "../../../../lib/constants";
import {
  UploadFileService,
  LocalFileStorage,
  // eslint-disable-next-line no-unused-vars
  CloudFileStorage,
} from "../../../../service/file-storage";


// const uploadAvatar = async (res, req, next) => {
//   const uploadService = new UploadFileService(
//     LocalFileStorage,
//     req.file,
//     req.user
//   );
//   console.log(req.user);

//   const avatarUrl = await uploadService.updateAvatar()
//   return res
//     .status(HttpCode.OK)
//     .json({
//     status: "success",
//     code: HttpCode.OK,
//     data: {avatarUrl},
//   });
// };
const uploadAvatar = async (req, res, next) => {
  const uploadService = new UploadFileService(
    LocalFileStorage,
    req.file,
    req.user,
  )

  const avatarUrl = await uploadService.updateAvatar()

  res
    .status(HttpCode.OK)
    .json({ status: 'success', code: HttpCode.OK, data: { avatarUrl } })
}

export { uploadAvatar };
