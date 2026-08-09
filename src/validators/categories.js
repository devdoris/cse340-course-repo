import { body } from "express-validator";

const categoryValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required.")
    .bail()
    .isLength({ min: 3, max: 100 })
    .withMessage("Category name must be between 3 and 100 characters.")
];

export {
  categoryValidation
};