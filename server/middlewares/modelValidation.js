import {
  UserSchemaValidation,
  RentalSchemaValidation,
  NewMessageSchemaValidation,
} from "../middlewares/joi.js";

const validateUser = (req, res, next) => {
  const { error } = UserSchemaValidation.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    return res.status(400).json(msg);
  } else {
    next();
  }
};

const validateRental = (req, res, next) => {
  const { error } = RentalSchemaValidation.validate(req.body);

  if (error || req.files.length !== 4) {
    if (req.files.length !== 4) {
      return res.status(400).json("Please add images that equal to 4!");
    }
    const msg = error.details.map((el) => el.message).join(",");
    return res.status(400).json(msg);
  } else {
    next();
  }
};

const validateUpdateRental = (req, res, next) => {
  const { error } = RentalSchemaValidation.validate(req.body);

  if (error || (req.files.length !== 4 && req.files.length !== 0)) {
    if (req.files.length !== 4 && req.files.length !== 0) {
      return res
        .status(400)
        .json(
          "Please add images that equal to 4 or do not add to save the old images."
        );
    }
    const msg = error.details.map((el) => el.message).join(",");
    return res.status(400).json(msg);
  } else {
    next();
  }
};

const validateNewMessage = (req, res, next) => {
  const { error } = NewMessageSchemaValidation.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    return res.status(400).json(msg);
  } else {
    next();
  }
};

export {
  validateUser,
  validateRental,
  validateUpdateRental,
  validateNewMessage,
};
