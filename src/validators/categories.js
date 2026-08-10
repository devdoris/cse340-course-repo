import { body } from "express-validator";

const categoryValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required.")
    .bail()
    .isLength({ max: 100 })
    .withMessage("Category name must not exceed 100 characters.")
];

export {
  categoryValidation
};