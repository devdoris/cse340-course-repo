import {
  getAllCategories,
  getCategoryDetails,
  getProjectsByCategory
} from "../models/categories.js";

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

export {
  showCategoriesPage,
  showCategoryDetailsPage
};