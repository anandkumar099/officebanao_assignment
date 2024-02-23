const Joi = require("joi");

const STATUS_ENUM = ["pending", "in_progress", "completed"];

const todoSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  deadline: Joi.string(),
  status: Joi.string().valid(...STATUS_ENUM),
  image: Joi.string().uri(),
});
const todoSchemaUpdate = Joi.object({
  id: Joi.number().required(),
  title: Joi.string(),
  description: Joi.string(),
  deadline: Joi.string(),
  status: Joi.string().valid(...STATUS_ENUM),
  image: Joi.string().uri(),
});

exports.validateTodo = (req, res, next) => {
  const { error } = todoSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
exports.validateTodoBulk = (req, res, next) => {
  let bulk = req.body;
  var isError = false;
  bulk.forEach((todo) => {
    const { error } = todoSchema.validate(todo);
    if (error) {
      isError = true;
      return res.status(400).json({ error: error.details[0].message });
    } else {
    }
  });
  if (!isError) {
    next();
  }
};
exports.validateTodoUpdate = (req, res, next) => {
  const { error } = todoSchemaUpdate.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
