import {
  getUpcomingProjects,
  getProjectDetails
} from "../models/projects.js";

import {
  getCategoriesByProject
} from "../models/categories.js";

const NUMBER_OF_UPCOMING_PROJECTS = 5;

const showProjectsPage = async (req, res) => {
  const projects =
    await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);

  res.render("projects", {
    title: "Upcoming Service Projects",
    projects
  });
};

const showProjectDetailsPage = async (req, res) => {
  const projectId = req.params.id;

  const project =
    await getProjectDetails(projectId);

  const categories =
    await getCategoriesByProject(projectId);

  res.render("project", {
    title: project.title,
    project,
    categories
  });
};

export {
  showProjectsPage,
  showProjectDetailsPage
};