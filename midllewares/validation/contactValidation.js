import Joi from "joi";

const createSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.bool().optional(),
});

const updateSchema = Joi.object({
  name: Joi.string().min(2).max(30),
  email: Joi.string().email(),
  phone: Joi.string(),
  favorite: Joi.bool().optional(),
}).or("name", "email", "phone");

const updateFavoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});

export const validateCreate = async (req, res, next) => {
  try {
    await createSchema.validateAsync(req.body);
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Field ${error.message.replace(/"/g, "")}` });
  }
  next();
};

export const validateUpdate = async (req, res, next) => {
  try {
   await updateSchema.validateAsync(req.body);
  } catch (error) {
    return res.status(400).json({message: error.message.replace(/"/g, "")});
  }
  next();
};

export const validateFavoriteUpdate = async (req, res, next) => {
  try {
   await updateFavoriteSchema.validateAsync(req.body);
  } catch (error) {
    const [{ type }] = error.details
      if(type === 'object.missing'){
      return res.status(400).json({message: 'missing field favorite'});
    }
    return res.status(400).json({message: error.message.replace(/"/g, "")});
  }
  next();
};
