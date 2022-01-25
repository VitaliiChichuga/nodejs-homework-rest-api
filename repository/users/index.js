import User from "../../model/user";

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const findById = async (id) => {
  return await User.findById(id);
};

const findByVerifyToken = async (verifyToken) => {
  return await User.findOne({ verifyToken });
};
const updateVerify = async (id, status) => {
  return await User.updateOne(
    { _id: id },
    { isVerify: status, verifyToken: null }
  );
};
const createNewUser = async (body) => {
  const user = await new User(body);
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

const updateAvatar = async (id, avatar) => {
  return await User.updateOne({ _id: id }, { avatar });
};

export default {
  findById,
  findByEmail,
  createNewUser,
  updateToken,
  updateAvatar,
  findByVerifyToken,
  updateVerify,
};
