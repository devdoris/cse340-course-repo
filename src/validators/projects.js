import { body } from "express-validator";

const projectValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Project title is required.")
    .isLength({ min: 3, max: 150 })
    .withMessage("Project title must be between 3 and 150 characters."),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required.")
    .isLength({ max: 1000 })
    .withMessage("Description must not exceed 1000 characters."),

  body("location")
    .trim()
    .notEmpty()
    .withMessage("Location is required.")
    .isLength({ max: 100 })
    .withMessage("Location must not exceed 100 characters."),

  body("projectDate")
    .notEmpty()
    .withMessage("Project date is required.")
    .isISO8601()
    .withMessage("Please enter a valid project date."),

  body("organizationId")
    .notEmpty()
    .withMessage("Organization is required.")
    .isInt()
    .withMessage("Please select a valid organization.")
];

export {
  projectValidation
};