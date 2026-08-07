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
  const { name } = req.body;

  const trimmedName = name.trim();

  if (
  trimmedName.length < 3 ||
  trimmedName.length > 100
) {
  return res.status(400).render("new-category", {
    title: "New Category",
    error:
      "Category name must be between 3 and 100 characters.",
    name: trimmedName
  });
}

  await createCategory(name);

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

  const trimmedName = name.trim();

  if (
  trimmedName.length < 3 ||
  trimmedName.length > 100
) {
  const category =
    await getCategoryDetails(categoryId);

  category.name = trimmedName;

  return res.status(400).render("edit-category", {
    title: "Edit Category",
    category,
    error:
      "Category name must be between 3 and 100 characters."
  });
}

  await updateCategory(
  categoryId,
  trimmedName
);

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