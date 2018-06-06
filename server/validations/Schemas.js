import Joi from 'joi';

// User SignUp Joi Schema
const userSignUpSchema = Joi.object().keys({
  username: Joi.string()
    .min(2)
    .regex(/^[a-zA-Z0-9- ]*$/)
    .required(),
  password: Joi.string().min(5).required(),
  email: Joi.string()
    .email()
    .regex(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    .required(),
  department: Joi.string()
    .regex(/^[a-zA-Z0-9- ]*$/)
    .min(2)
    .required(),
});

// User Login Schema
const userLoginSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .regex(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    .required(),
  password: Joi.string().min(5).required(),
});


// User Request Schema
const userRequestSchema = Joi.object().keys({
  title: Joi.string()
    .min(6)
    .regex(/^[a-zA-Z0-9- ]*$/)
    .required(),
  description: Joi.string()
    .min(10)
    .required(),
  priority: Joi.string()
    .required(),
});
export { userSignUpSchema, userLoginSchema, userRequestSchema };
