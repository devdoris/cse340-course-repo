import {
  getUpcomingProjects,
  getProjectDetails,
  updateProject
} from "../models/projects.js";

import {
  getCategoriesByProject
} from "../models/categories.js";

import {
  getAllOrganizations
} from "../models/organizations.js";

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

// Display the edit project form
const showEditProjectForm = async (req, res) => {
  const projectId = req.params.id;

  const project =
    await getProjectDetails(projectId);

  const organizations =
    await getAllOrganizations();

  res.render("edit-project", {
    title: "Edit Project",
    project,
    organizations
  });
};

// Process the edit project form
const processEditProjectForm = async (req, res) => {
  const projectId = req.params.id;

  const {
    organizationId,
    title,
    description,
    location,
    projectDate
  } = req.body;

  await updateProject(
    projectId,
    organizationId,
    title,
    description,
    location,
    projectDate
  );

  res.redirect(`/project/${projectId}`);
};

export {
  showProjectsPage,
  showProjectDetailsPage,
  showEditProjectForm,
  processEditProjectForm
};