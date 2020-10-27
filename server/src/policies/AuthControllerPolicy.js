const Joi = require("joi");

module.exports = {
  register(req, res, next) {
    const schema = Joi.object({
      firstName: Joi.string().min(2).max(20),
      lastName: Joi.string().min(2).max(20),
      email: Joi.string().email().min(6).max(32),
      password: Joi.string().regex(
        new RegExp(
          /*"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9_#@%*-](?=.{8,32})$"*/
          "^[a-zA-Z0-9]{8,32}$"
        )
      ),
    });
    // Joi schema to validate user data
    //This line of code can be picked from joi.dev.
    const { error, value } = schema.validate(req.body);

    /*If the input is valid, then the error will be undefined. If the input is invalid, error is assigned a ValidationError object providing more information.
    If error is not undefined the switch will dig in the error object to understand what key generated a coflict*/
    if (error) {
      /*Switch statement checks what error occurred and send back a message to the user about the error.
      When there is a list of possible options a switch statement is preferred to a chain of if else because it's computed faster.*/
      switch (error.details[0].context.key) {
        case "firstName":
          res.status(400).send({
            error: "You must provided a valid name.",
          });
          break;
        case "lastName":
          res.status(400).send({
            error: "You must provided a valid last name.",
          });
          break;
        case "email":
          res.status(400).send({
            error: "You must provided a valid email address.",
          });
          break;
        case "password":
          res.status(400).send({
            error: `The password failed to match the requirements:
                  1. It must contain ONLY the following characters: lowercase, uppercase, numbers.
                  2. Must be between 8 and 32 characters.`,
          });
          break;
        default:
          res.status(400).send({
            error: "Invalid registration information.",
          });
      }
    } else {
      next();
    }
  },
};
