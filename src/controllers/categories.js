import {
  getAllCategories,
  getCategoryDetails,
  getProjectsByCategory,
  getCategoriesByProject,
  updateCategoryAssignments,
  createCategory,
  updateCategory
} from "../models/categories.js";

import {
  getProjectDetails
} from "../models/projects.js";

import { validationResult } from "express-validator";

const showCategoriesPage = async (req, res) => {
  const categories =
    await getAllCategories();

  res.render("categories", {
    title: "Service Project Categories",
    categories
  });
};

const showCategoryDetailsPage = async (req, res) => {
  const categoryId = req.params.id;

  const category =
    await getCategoryDetails(categoryId);

  const projects =
    await getProjectsByCategory(categoryId);

  res.render("category", {
    title: category.name,
    category,
    projects
  });
};

// Display the assign categories form
const showAssignCategoriesForm = async (req, res) => {
  const projectId = req.params.projectId;

  const project =
    await getProjectDetails(projectId);

  const categories =
    await getAllCategories();

  const assignedCategories =
    await getCategoriesByProject(projectId);

  res.render("assign-categories", {
    title: "Assign Categories to Project",
    project,
    projectId,
    categories,
    assignedCategories
  });
};

// Process the assign categories form
const processAssignCategoriesForm = async (req, res) => {
  const projectId = req.params.projectId;

  const selectedCategoryIds =
    req.body.categoryIds || [];

  const categoryIds = Array.isArray(selectedCategoryIds)
    ? selectedCategoryIds
    : [selectedCategoryIds];

  await updateCategoryAssignments(
    projectId,
    categoryIds
  );

  req.session.message =
  "Categories updated successfully.";

  res.redirect(`/project/${projectId}`);
};

// Display the new category form
const showNewCategoryForm = (req, res) => {
  res.render("new-category", {
    title: "New Category"
  });
};

// Process the new category form
const processNewCategoryForm = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("new-category", {
      title: "New Category",
      error: errors.array()[0].msg,
      name: req.body.name
    });
  }

  const name = req.body.name.trim();

  await createCategory(name);

  req.session.message =
  "Category created successfully.";

  res.redirect("/categories");
};

// Display the edit category form
const showEditCategoryForm = async (req, res) => {
  const categoryId = req.params.id;

  const category =
    await getCategoryDetails(categoryId);

  res.render("edit-category", {
    title: "Edit Category",
    category
  });
};

// Process the edit category form
const processEditCategoryForm = async (req, res) => {
  const categoryId = req.params.id;
  const { name } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const category =
      await getCategoryDetails(categoryId);

    category.name = req.body.name;

    return res.status(400).render("edit-category", {
      title: "Edit Category",
      category,
      error: errors.array()[0].msg
    });
  }

  const trimmedName = req.body.name.trim();

  await updateCategory(
    categoryId,
    trimmedName
  );

  req.session.message =
  "Category updated successfully.";

  res.redirect(`/category/${categoryId}`);
};

export {
  showCategoriesPage,
  showCategoryDetailsPage,
  showAssignCategoriesForm,
  processAssignCategoriesForm,
  showNewCategoryForm,
  processNewCategoryForm,
  showEditCategoryForm,
  processEditCategoryForm
};