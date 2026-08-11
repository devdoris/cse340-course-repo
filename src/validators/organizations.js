import { body } from "express-validator";

const organizationValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Organization name is required.")
    .isLength({ min: 3, max: 150 })
    .withMessage("Organization name must be between 3 and 150 characters."),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required."),

  body("contactEmail")
    .trim()
    .notEmpty()
    .withMessage("Contact email is required.")
    .isEmail()
    .withMessage("Please enter a valid email address.")
    .isLength({ max: 255 })
    .withMessage("Contact email must not exceed 255 characters.")
];

const editOrganizationValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Organization name is required.")
    .isLength({ min: 3, max: 150 })
    .withMessage("Organization name must not exceed 150 characters."),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required."),

  body("contactEmail")
    .trim()
    .notEmpty()
    .withMessage("Contact email is required.")
    .isEmail()
    .withMessage("Please enter a valid email address.")
    .isLength({ max: 255 })
    .withMessage("Contact email must not exceed 255 characters.")
];

export {
  organizationValidation,
  editOrganizationValidation
};