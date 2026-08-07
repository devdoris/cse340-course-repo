import express from "express";

import {
  showOrganizationsPage,
  showOrganizationDetailsPage,
  showEditOrganizationForm,
  processEditOrganizationForm
} from "./controllers/organizations.js";

import {
  showProjectsPage,
  showProjectDetailsPage,
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
  "/edit-organization/:id",
  showEditOrganizationForm
);
router.post(
  "/edit-organization/:id",
  processEditOrganizationForm
);

// Projects
router.get("/projects", showProjectsPage);
router.get("/project/:id", showProjectDetailsPage);
router.get(
  "/edit-project/:id",
  showEditProjectForm
);

router.post(
  "/edit-project/:id",
  processEditProjectForm
);

// Categories
router.get("/categories", showCategoriesPage);
router.get("/category/:id", showCategoryDetailsPage);
// Assign categories to a project
router.get(
  "/assign-categories/:projectId",
  showAssignCategoriesForm
);

router.post(
  "/assign-categories/:projectId",
  processAssignCategoriesForm
);

router.get(
  "/new-category",
  showNewCategoryForm
);

router.post(
  "/new-category",
  processNewCategoryForm
);

router.get(
  "/edit-category/:id",
  showEditCategoryForm
);

router.post(
  "/edit-category/:id",
  processEditCategoryForm
);

export default router;