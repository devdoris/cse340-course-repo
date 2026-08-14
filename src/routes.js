import express from "express";

import {
  organizationValidation,
  editOrganizationValidation
} from "./validators/organizations.js";

import { projectValidation } from "./validators/projects.js";

import { categoryValidation } from "./validators/categories.js";

import {
    showUserRegistrationForm,
    processUserRegistrationForm,
    showLoginForm,
    processLoginForm,
    processLogout,
    requireLogin,
    requireRole,
    showDashboard,
    showUsersPage
} from "./controllers/users.js";

import {
  showOrganizationsPage,
  showOrganizationDetailsPage,
  showNewOrganizationForm,
  processNewOrganizationForm,
  showEditOrganizationForm,
  processEditOrganizationForm
} from "./controllers/organizations.js";

import {
  showProjectsPage,
  showProjectDetailsPage,
  showNewProjectForm,
  processNewProjectForm,
  showEditProjectForm,
  processEditProjectForm
} from "./controllers/projects.js";

import {
  showCategoriesPage,
  showCategoryDetailsPage,
  showAssignCategoriesForm,
  processAssignCategoriesForm,
  showNewCategoryForm,
  processNewCategoryForm,
  showEditCategoryForm,
  processEditCategoryForm
} from "./controllers/categories.js";

const router = express.Router();

// Home
router.get("/", (req, res) => {
  res.render("home", {
    title: "Home"
  });
});

// Organizations
router.get("/organizations", showOrganizationsPage);

router.get("/organization/:id", showOrganizationDetailsPage);

router.get(
    "/new-organization",
    requireRole("admin", "create a new organization"),
    showNewOrganizationForm
);

router.post(
    "/new-organization",
    requireRole("admin", "create a new organization"),
    organizationValidation,
    processNewOrganizationForm
);

router.get(
    "/edit-organization/:id",
    requireRole("admin", "edit an organization"),
    showEditOrganizationForm
);

router.post(
    "/edit-organization/:id",
    requireRole("admin", "edit an organization"),
    editOrganizationValidation,
    processEditOrganizationForm
);

// Projects
router.get("/projects", showProjectsPage);

router.get(
  "/project/:id",
  showProjectDetailsPage
);

router.get(
    "/new-project",
    requireRole("admin", "create a new project"),
    showNewProjectForm
);

router.post(
    "/new-project",
    requireRole("admin", "create a new project"),
    projectValidation,
    processNewProjectForm
);

router.get(
    "/edit-project/:id",
    requireRole("admin", "edit a project"),
    showEditProjectForm
);

router.post(
    "/edit-project/:id",
    requireRole("admin", "edit a project"),
    projectValidation,
    processEditProjectForm
);

// Categories
router.get("/categories", showCategoriesPage);
router.get("/category/:id", showCategoryDetailsPage);

// Assign categories to a project
router.get(
    "/assign-categories/:projectId",
    requireRole("admin", "manage project categories"),
    showAssignCategoriesForm
);

router.post(
    "/assign-categories/:projectId",
    requireRole("admin", "manage project categories"),
    processAssignCategoriesForm
);

router.get(
    "/new-category",
    requireRole("admin", "create a new category"),
    showNewCategoryForm
);

router.post(
    "/new-category",
    requireRole("admin", "create a new category"),
    categoryValidation,
    processNewCategoryForm
);

router.get(
    "/edit-category/:id",
    requireRole("admin", "edit a category"),
    showEditCategoryForm
);

router.post(
    "/edit-category/:id",
    requireRole("admin", "edit a category"),
    categoryValidation,
    processEditCategoryForm
);

// User registration
router.get("/register", showUserRegistrationForm);
router.post("/register", processUserRegistrationForm);

router.get("/login", showLoginForm);

router.post("/login", processLoginForm);

router.get("/logout", processLogout);

// Protected dashboard route
router.get("/dashboard", requireLogin, showDashboard);

// Admin-only users page
router.get(
    "/users",
    requireRole("admin", "access the users page", "/dashboard"),
    showUsersPage
);

export default router;