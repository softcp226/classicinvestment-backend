const Joi = require("joi");
const validate_admin_approve_withdrawal = (req) => {
  console.log("sent to approval validation");
  const schema = Joi.object({
    admin: Joi.string().required().max(1000),
    withdrawal_request: Joi.string().required().max(1000),
    withdrawal_hash: Joi.string().required().max(1000),
    // withdrawal_amount: Joi.number().required(),
  });
  const result = schema.validate({
    admin: req.admin,
    withdrawal_request: req.withdrawal_request,
    withdrawal_hash: req.withdrawal_hash,
    // withdrawal_amount: req.withdrawal_amount,
  });
  if (result.error) return result.error.message;
  return true;
};
module.exports = validate_admin_approve_withdrawal;
