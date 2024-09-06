import Joi from "joi";

const UserSchemaValidation = Joi.object({
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: true } }),
  password: Joi.string()
    .required()
    .regex(/^[A-Za-z0-9]{8,16}$/),
  passwordConfirm: Joi.ref("password"),
});

const RentalSchemaValidation = Joi.object({
  address1: Joi.string().required(),
  address2: Joi.string().required(),
  region: Joi.string().required(),
  city: Joi.string().required(),
  classes: Joi.string().valid("room", "house", "apartment").required(),
  price: Joi.number().required().min(1),
  description: Joi.string(),
  bedrooms: Joi.when("classes", {
    switch: [
      { is: "house", then: Joi.number().min(1).required() },
      { is: "appartment", then: Joi.number().min(1).required() },
    ],
    otherwise: Joi.number().min(0),
  }),
  bathrooms: Joi.when("classes", {
    switch: [
      { is: "house", then: Joi.number().required().min(1) },
      { is: "appartment", then: Joi.number().required().min(1) },
    ],
    otherwise: Joi.number().min(0),
  }),
});

const NewMessageSchemaValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: true } })
    .required(),
  message: Joi.string().required(),
});

export {
  UserSchemaValidation,
  RentalSchemaValidation,
  NewMessageSchemaValidation,
};
